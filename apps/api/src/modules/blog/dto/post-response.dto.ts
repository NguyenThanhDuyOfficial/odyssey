import { UserResponseDto } from '../../auth/auth.dto.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TagResponseDto } from './tag-response.dto.js';

export class PostResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  featuredImage?: string;

  @ApiProperty()
  published: boolean;

  @ApiPropertyOptional()
  publishedAt?: Date;

  @ApiProperty()
  isFeatured: boolean;

  @ApiProperty()
  viewCount: number;

  @ApiPropertyOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  metaDescription?: string;

  @ApiPropertyOptional()
  metaKeywords?: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // For relationships, you might need nested DTOs
  @ApiPropertyOptional({ type: () => UserResponseDto })
  author?: UserResponseDto;

  @ApiPropertyOptional({ type: () => [TagResponseDto] })
  tags?: TagResponseDto[];
}
