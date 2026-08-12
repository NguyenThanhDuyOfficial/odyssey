import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller.js';
import { BlogService } from './blog.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
