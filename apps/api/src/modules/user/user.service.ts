import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '../../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error: any) {
      // Handle unique constraint violation (e.g., duplicate email)
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  // Get all users
  async getAllUsers(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Get a single user by ID
  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Update a user
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      // Check if user exists first
      await this.getUserById(id);

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  // Delete a user
  async deleteUser(id: string): Promise<User> {
    // Check if user exists first
    await this.getUserById(id);

    return await this.prisma.user.delete({
      where: { id },
    });
  }

  // Count users
  async countUsers(where?: Prisma.UserWhereInput): Promise<number> {
    return await this.prisma.user.count({
      where,
    });
  }

  // Check if user exists
  async userExists(where: Prisma.UserWhereInput): Promise<boolean> {
    const count = await this.prisma.user.count({
      where,
      take: 1, // Limit to 1 for performance
    });
    return count > 0;
  }
}
