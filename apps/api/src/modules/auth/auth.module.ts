import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DiscordStrategy } from './strategies/discord.strategy.js';
import { AuthService } from './auth.service.js';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    DiscordStrategy,
    JwtService,
    JwtStrategy,
  ],
})
export class AuthModule {}
