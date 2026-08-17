import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import type { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ErrorResponseDto,
  MessageResponseDto,
  RefreshTokenDto,
  TokensResponseDto,
  UserResponseDto,
  VerifyTokenDto,
  VerifyTokenResponseDto,
} from './auth.dto.js';
import { isError } from '../../utils/error.utils.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  @ApiOperation({
    summary: 'Login with Discord',
    description: 'Redirect to Discord OAuth2 login page',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to Discord login page',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async discordLogin() {}

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  @ApiOperation({
    summary: 'Discord OAuth2 callback',
    description:
      'Handle Discord OAuth2 callback and redirect to frontend with token',
  })
  @ApiQuery({
    name: 'code',
    description: 'Authorization code from Discord',
    required: true,
    example: 'abc123def456',
  })
  @ApiQuery({
    name: 'state',
    description: 'State parameter from Discord',
    required: false,
    example: 'random_state_string',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to frontend with JWT tokens',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async discordCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const frontendUrl = this.configService.get('FRONTEND_URL');
    const tokens = await this.authService.generateToken(user);
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      `${frontendUrl}/auth/callback?token=${tokens.accessToken}`,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Get user profile using JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    type: ErrorResponseDto,
  })
  async getCurrentUser(@Req() req: Request): Promise<UserResponseDto> {
    const user = req.user as any;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      discordAvatar: user.discordAvatar,
      discordId: user.discordId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get new access token using refresh token',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'New access token generated',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing refresh token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid refresh token',
    type: ErrorResponseDto,
  })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const tokens = await this.authService.refreshTokens(refreshToken);

      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh',
      });
      return { accessToken: tokens.accessToken };
    } catch (error) {
      res.clearCookie('refresh_token', {
        path: '/api/auth/refresh',
      });
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify JWT token',
    description: 'Check if a JWT token is valid',
  })
  @ApiBody({
    type: VerifyTokenDto,
    description: 'Token to verify',
  })
  @ApiResponse({
    status: 200,
    description: 'Token verification result',
    type: VerifyTokenResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing token',
    type: ErrorResponseDto,
  })
  async verifyToken(
    @Body() body: VerifyTokenDto,
  ): Promise<VerifyTokenResponseDto | undefined> {
    if (!body.token) {
      throw new BadRequestException('Token is required');
    }

    try {
      const payload = await this.authService.verifyToken(body.token);
      return {
        valid: true,
        payload,
      };
    } catch (error) {
      if (isError(error)) {
        return {
          valid: false,
          message: error.message || 'Invalid token',
        };
      }
    }
  }

  // ==================== LOGOUT ====================

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout',
    description: 'Logout user and invalidate token',
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    type: ErrorResponseDto,
  })
  async logout(@Req() req: Request): Promise<MessageResponseDto> {
    const user = req.user as any;

    if (user && user.id) {
      await this.authService.logout(user.id);
    }

    return {
      message: 'Logged out successfully',
    };
  }

  // ==================== HEALTH CHECK ====================

  @Get('health')
  @ApiOperation({
    summary: 'Auth service health check',
    description: 'Check if auth service is running',
  })
  @ApiResponse({
    status: 200,
    description: 'Auth service is healthy',
    type: MessageResponseDto,
  })
  async healthCheck(): Promise<MessageResponseDto> {
    return {
      message: 'Auth service is healthy',
    };
  }
}
