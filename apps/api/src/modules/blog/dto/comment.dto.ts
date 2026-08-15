import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserResponseDto } from 'src/modules/auth/auth.dto';

export class GetCommentQueryDto {
  @ApiProperty({
    enum: ['newest', 'mostVoted'],
    default: 'newest',
    description: 'How to sort the comments',
  })
  @IsEnum(['newest', 'mostVoted'])
  @IsOptional()
  sortBy?: string = 'newest';

  @IsString()
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'This is a great article',
    minLength: 2,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty({ message: 'Không được rỗng' })
  @MinLength(1, { message: 'Không được rỗng' })
  @MaxLength(2000, { message: 'Comment không được quá 2000 từ' })
  content!: string;
}

export class CommentResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiProperty()
  isApproved!: boolean;

  @Expose()
  @ApiProperty()
  vote!: number;

  @Expose()
  @ApiProperty()
  postId!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;

  @Expose()
  @ApiProperty()
  isLiked?: boolean;

  @Expose()
  author?: any;
}

export class PaginatedCommentsResponseDto {
  @ApiProperty({
    description: 'List of comments',
    type: [CommentResponseDto],
  })
  @Expose()
  data: CommentResponseDto[];

  @ApiProperty({
    description: 'Cursor for the next page (null if no more data)',
    required: false,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Expose()
  nextCursor: string | null;

  @ApiProperty({
    description: 'Whether there are more comments to fetch',
    example: true,
  })
  @Expose()
  hasMore: boolean;

  @ApiProperty({
    description: 'Total number of top-level comments (optional)',
    required: false,
    example: 150,
  })
  @Expose()
  totalCount?: number;
}
