import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service.js';
import { UserService } from './modules/user/user.service.js';
import { AuthService } from './modules/auth/auth.service.js';
import path from 'node:path';
import { JwtService } from '@nestjs/jwt';
import { BlogModule } from './modules/blog/blog.module.js';
import { UserModule } from './modules/user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '../../.env'),
    }),
    AuthModule,
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, AuthService, JwtService],
})
export class AppModule {}
