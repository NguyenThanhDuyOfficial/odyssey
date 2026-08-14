import { UserResponseDto } from '../../auth/auth.dto.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TagResponseDto } from './tag-response.dto.js';
import { Expose } from 'class-transformer';

export class PostResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  slug!: string;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiPropertyOptional()
  excerpt: string | null;

  @Expose()
  @ApiPropertyOptional()
  featuredImage: string | null;

  @Expose()
  @ApiProperty()
  published!: boolean;

  @Expose()
  @ApiPropertyOptional()
  publishedAt: Date | null;

  @Expose()
  @ApiProperty()
  isFeatured!: boolean;

  @Expose()
  @ApiProperty()
  viewCount!: number;

  @Expose()
  @ApiPropertyOptional()
  metaTitle: string | null;

  @Expose()
  @ApiPropertyOptional()
  metaDescription: string | null;

  @Expose()
  @ApiPropertyOptional()
  metaKeywords: string | null;

  @Expose()
  @ApiProperty()
  authorId!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;

  // For relationships, you might need nested DTOs
  @Expose()
  @ApiPropertyOptional({ type: () => UserResponseDto })
  author?: UserResponseDto;

  @Expose()
  @ApiPropertyOptional({ type: () => [TagResponseDto] })
  tags?: TagResponseDto[];
}
