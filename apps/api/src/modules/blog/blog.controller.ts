import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { isError } from '../../utils/error.utils.js';
import {
  CreatePostDto,
  UpdatePostDto,
  CreateCommentDto,
  CreateTagDto,
  PostResponseDto,
  TagResponseDto,
  CommentResponseDto,
  CategoryResponseDto,
  PaginatedCommentsResponseDto,
  GetCommentQueryDto,
} from './dto/index';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { AuthUser } from 'src/shared/interfaces/auth-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/common/interfaces/request.interface';

@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('posts')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new post',
    description:
      'Create a new blog post with the provided data. The user must be authenticated',
  })
  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: PostResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated',
  })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: AuthUser,
  ): Promise<PostResponseDto> {
    return this.blogService.createPost(user.id, createPostDto);
  }

  //TODO: improve code
  @Get('posts')
  @ApiOperation({ summary: 'Get all posts with pagination and filtering' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'published',
    required: false,
    type: Boolean,
    description: 'Filter by published status',
  })
  @ApiQuery({
    name: 'tag',
    required: false,
    type: String,
    description: 'Filter by tag slug',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Filter by category slug',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search in title and content',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    enum: ['newest', 'oldest', 'popular'],
    description: 'Sort order',
  })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  async findAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('published') published?: string,
    @Query('tag') tag?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'newest' | 'oldest' | 'popular',
  ) {
    return this.blogService.findAllPosts({
      page,
      limit,
      published:
        published === 'true' ? true : published === 'false' ? false : true,
      tag,
      category,
      search,
      orderBy: orderBy || 'newest',
    });
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Get a single post by slug' })
  @ApiParam({ name: 'slug', description: 'Post slug' })
  @ApiResponse({
    status: 200,
    description: 'Post retrieved successfully',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOnePost(@Param('slug') slug: string) {
    return this.blogService.findOnePost(slug);
  }

  @Put('posts/:id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  // @UseGuards(AuthGuard('jwt'))
  async updatePost(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.updatePost(id, userId, updatePostDto);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  async deletePost(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.deletePost(id, userId);
  }

  // ============================================
  // COMMENTS
  // ============================================

  @Get('posts/:postId/comments')
  @ApiOperation({
    summary: 'Get paginated comments for a post',
    description: `
      Returns top-level comments with cursor-based pagination.
      Supports multiple sort options and user-specific like status.
    `,
  })
  @ApiParam({
    name: 'postId',
    description: 'ID of the post',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    enum: ['newest', 'mostVoted'],
    default: 'newest',
    description: 'Sort order for comments',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    default: 20,
    minimum: 1,
    maximum: 50,
    description: 'Number of comments to fetch (max 50)',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    type: String,
    required: false,
    description:
      'Cursor for pagination (base64 encoded from previous response)',
    example:
      'eyJjcmVhdGVkX2F0IjoiMjAyNi0wOC0xNVQxMDozMDowMC4wMDBaIiwiaWQiOiJjb21tZW50LTEyMyJ9',
  })
  @ApiOkResponse({
    description: 'Comments retrieved successfully',
    type: PaginatedCommentsResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Post not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  async getComments(
    @Param('postId') postId: string,
    @Query() query: GetCommentQueryDto,
    @CurrentUser() user: AuthUser,
  ): Promise<PaginatedCommentsResponseDto> {
    return this.blogService.getComments(user?.id, postId, query);
  }

  @Post('posts/:postId/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: CommentResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async createComment(
    @CurrentUser() user: AuthUser,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.blogService.createComment(user.id, postId, createCommentDto);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.deleteComment(id, userId);
  }

  // ============================================
  // TAGS
  // ============================================

  @Post('tags')
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    type: TagResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Tag already exists' })
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createTag(@Body() createTagDto: CreateTagDto) {
    try {
      return await this.blogService.createTag(createTagDto);
    } catch (error) {
      if (isError(error)) {
        // if (error.code === 'P2002') {
        //   throw new ConflictException('Tag already exists');
        // }
        throw error;
      }
    }
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'Tags retrieved successfully',
    type: [TagResponseDto],
  })
  async findAllTags() {
    return this.blogService.findAllTags();
  }

  @Get('tags/popular')
  @ApiOperation({ summary: 'Get popular tags' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of tags to return (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Popular tags retrieved successfully',
  })
  async getPopularTags(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.blogService.getPopularTags(limit);
  }

  @Delete('tags/:id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tag deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteTag(@Param('id') id: string) {
    return this.blogService.deleteTag(id);
  }

  // ============================================
  // CATEGORIES
  // ============================================

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
    type: [CategoryResponseDto],
  })
  async findAllCategories() {
    return this.blogService.findAllCategories();
  }

  // ============================================
  // LIKES
  // ============================================

  @Post('posts/:postId/like')
  @ApiOperation({ summary: 'Toggle like on a post' })
  @ApiBearerAuth()
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Like toggled successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  // @UseGuards(AuthGuard('jwt'))
  async toggleLike(@Req() req: any, @Param('postId') postId: string) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.toggleLike(userId, postId);
  }

  // ============================================
  // BOOKMARKS
  // ============================================

  @Post('posts/:postId/bookmark')
  @ApiOperation({ summary: 'Toggle bookmark on a post' })
  @ApiBearerAuth()
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Bookmark toggled successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  // @UseGuards(AuthGuard('jwt'))
  async toggleBookmark(@Req() req: any, @Param('postId') postId: string) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.toggleBookmark(userId, postId);
  }

  @Get('bookmarks')
  @ApiOperation({ summary: 'Get user bookmarks' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Bookmarks retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @UseGuards(AuthGuard('jwt'))
  async getUserBookmarks(@Req() req: any) {
    const userId = req.user?.id || 'test-user-id';
    return this.blogService.getUserBookmarks(userId);
  }
}
