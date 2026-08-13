import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// Request DTOs
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token để lấy access token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class VerifyTokenDto {
  @ApiProperty({
    description: 'JWT token cần xác thực',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

// Response DTOs
export class TokensResponseDto {
  @ApiProperty({
    description: 'Access token dùng để xác thực API',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token dùng để lấy access token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}

export class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: 'cm3x8q2m40000c8k4h7y8x9z0' })
  id: string;

  @ApiProperty({ description: 'Username', example: 'john_doe' })
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'john@example.com',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    description: 'Display name',
    example: 'John Doe',
    nullable: true,
  })
  displayName: string | null;

  @ApiProperty({
    description: 'Discord Avatar',
    example: '123812u49812y591278',
    nullable: true,
  })
  discordAvatar: string | null;

  @ApiProperty({
    description: 'Discord ID',
    example: '123456789012345678',
    nullable: true,
  })
  discordId: string | null;

  @ApiProperty({
    description: 'Created at',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class VerifyTokenResponseDto {
  @ApiProperty({ description: 'Token có hợp lệ không', example: true })
  valid: boolean;

  @ApiProperty({ description: 'Payload của token', required: false })
  payload?: any;

  @ApiProperty({
    description: 'Message lỗi nếu token không hợp lệ',
    required: false,
  })
  message?: string;
}

export class MessageResponseDto {
  @ApiProperty({ description: 'Message', example: 'Logged out successfully' })
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({ description: 'Status code', example: 401 })
  statusCode: number;

  @ApiProperty({ description: 'Error message', example: 'Unauthorized' })
  message: string;

  @ApiProperty({ description: 'Error name', example: 'UnauthorizedException' })
  error: string;
}
