import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDiscordUserDto } from './dto/create-user.dto.js';
import { User } from 'src/generated/prisma/client.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(userId: string) {
    return this.userService.findOne({ id: userId });
  }
  async validateDiscordUser(discordUser: CreateDiscordUserDto): Promise<User> {
    let user = await this.userService.findOne({
      discordId: discordUser.discordId,
    });
    if (!user) {
      user = await this.userService.createUser({
        ...discordUser,
      });
    } else {
      user.accessToken = discordUser.accessToken;
      user.refreshToken = discordUser.refreshToken;
      user.username = discordUser.username;
      user.discordAvatar = discordUser.discordAvatar;
      await this.userService.updateUser(user.id, user);
    }
    return user;
  }

  async generateToken(
    user: any,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const payload = {
      sub: user.id,
      discordId: user.discordId,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    } as any);

    // Optional: Generate refresh token
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    } as any);

    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error: any) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const newAccessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          discordId: payload.discordId,
          username: payload.username,
          email: payload.email,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_EXPIRES_IN'),
        },
      );
      const newRefreshToken = this.jwtService.sign(
        {
          sub: payload.sub,
          discordId: payload.discordId,
          username: payload.username,
          email: payload.email,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        },
      );
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async logout(userId: string) {
    await this.userService.updateUser(userId, { refreshToken: null });
  }
}
