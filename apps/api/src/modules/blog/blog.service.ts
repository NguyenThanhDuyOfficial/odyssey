import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreatePostDto,
  UpdatePostDto,
  CreateCommentDto,
  CreateTagDto,
  PostResponseDto,
  PaginatedCommentsResponseDto,
  CommentResponseDto,
  GetCommentQueryDto,
} from './dto/index';
import { Prisma } from '../../generated/prisma/client.js';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const { tags, categories, ...postData } = createPostDto;

    const slug = this.generateSlug(postData.title);

    const post = await this.prisma.$transaction(async (tx) => {
      return tx.post.create({
        data: {
          ...postData,
          slug,
          authorId: userId,
          publishedAt: postData.published ? new Date() : null,
          tags: tags?.length
            ? {
                create: tags.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
          postCategories: categories?.length
            ? {
                create: categories.map((categoryId) => ({
                  category: { connect: { id: categoryId } },
                })),
              }
            : undefined,
        },
        include: this.getPostIncludeOptions(),
      });
    });
    const responseDto = this.transformToResponseDto(post);
    return responseDto;
  }

  async findAllPosts(params: {
    page?: number;
    limit?: number;
    published?: boolean;
    tag?: string;
    category?: string;
    search?: string;
    orderBy?: 'newest' | 'oldest' | 'popular';
  }) {
    const {
      page = 1,
      limit = 10,
      published = true,
      tag,
      category,
      search,
      orderBy = 'newest',
    } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.PostWhereInput = {
      published,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(tag && {
        tags: {
          some: {
            tag: {
              slug: tag,
            },
          },
        },
      }),
      ...(category && {
        postCategories: {
          some: {
            category: {
              slug: category,
            },
          },
        },
      }),
    };

    const orderByMap = {
      newest: { publishedAt: 'desc' as const },
      oldest: { publishedAt: 'asc' as const },
      popular: { viewCount: 'desc' as const },
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: orderByMap[orderBy],
        include: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,
              discordAvatar: true,
              discordId: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          postCategories: {
            include: {
              category: true,
            },
          },
          comments: {
            where: { isApproved: true },
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  discordAvatar: true,
                  discordId: true,
                },
              },
            },
          },
          likes: true,
          bookmarks: true,
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOnePost(slug: string, incrementView = true) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        postCategories: {
          include: {
            category: true,
          },
        },
        comments: {
          where: { isApproved: true },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
          },
        },
        likes: true,
        bookmarks: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }

    // Increment view count
    if (incrementView) {
      await this.prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return post;
  }

  async updatePost(id: string, userId: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    const { tags, categories, ...postData } = updatePostDto;

    // Update tags and categories
    const updateData: Prisma.PostUpdateInput = {
      ...postData,
      ...(postData.published !== undefined && {
        publishedAt: postData.published ? new Date() : null,
      }),
    };

    if (tags) {
      // Remove existing tags and add new ones
      updateData.tags = {
        deleteMany: {},
        create: tags.map((tagId) => ({
          tag: { connect: { id: tagId } },
        })),
      };
    }

    if (categories) {
      updateData.postCategories = {
        deleteMany: {},
        create: categories.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      };
    }

    return this.prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async deletePost(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    // Delete related records first (cascade handles this but explicit for safety)
    await this.prisma.$transaction([
      this.prisma.tagsOnPosts.deleteMany({ where: { postId: id } }),
      this.prisma.postCategory.deleteMany({ where: { postId: id } }),
      this.prisma.comment.deleteMany({ where: { postId: id } }),
      this.prisma.like.deleteMany({ where: { postId: id } }),
      this.prisma.bookmark.deleteMany({ where: { postId: id } }),
      this.prisma.post.delete({ where: { id } }),
    ]);

    return { message: 'Post deleted successfully' };
  }

  // ============================================
  // COMMENTS
  // ============================================
  async getComments(
    userId: string,
    postId: string,
    query: GetCommentQueryDto,
  ): Promise<PaginatedCommentsResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const { cursor, limit = 20, sortBy = 'newest' } = query;

    let orderBy: any;
    if (sortBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (sortBy === 'mostVoted') {
      orderBy = [{ vote: 'desc' }, { createdAt: 'desc' }, { id: 'asc' }];
    } else {
      orderBy = { createdAt: 'desc' };
    }

    let where: any = {
      postId: postId,
    };

    if (cursor) {
      let cursorData: any = { id: cursor };
      if (sortBy === 'newest') {
        where.OR = [
          { createdAt: { lt: new Date(cursorData.createdAt) } },
          {
            AND: [
              { createdAt: { equals: new Date(cursorData.createdAt) } },
              { id: { gt: cursorData.id } },
            ],
          },
        ];
      } else if (sortBy === 'mostVoted') {
        where.OR = [
          { vote: { lt: cursorData.vote } },
          {
            AND: [
              { vote: { equals: cursorData.vote } },
              { createdAt: { lt: new Date(cursorData.createdAt) } },
            ],
          },
          {
            AND: [
              { vote: { equals: cursorData.vote } },
              { createdAt: { equals: new Date(cursorData.createdAt) } },
              { id: { gt: cursorData.id } },
            ],
          },
        ];
      } else {
        where.id = { gt: cursorData.id };
      }
    }

    const comments = await this.prisma.comment.findMany({
      where,
      take: limit + 1,
      orderBy,
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            discordAvatar: true,
          },
        },
      },
    });
    let likedCommentIds = new Set<string>();

    if (userId && comments.length > 0) {
      const commentIds = comments.map((c) => c.id);

      const likes = await this.prisma.commentLike.findMany({
        where: {
          commentId: { in: commentIds },
          userId: userId,
        },
        select: { commentId: true },
      });

      likedCommentIds = new Set(likes.map((like) => like.commentId));
    }
    const hasMore = comments.length > limit;
    const data = hasMore ? comments.slice(0, -1) : comments;

    let nextCursor: string | null = null;

    if (hasMore && data.length > 0) {
      const lastItem = data[data.length - 1];

      let cursorData: any = { id: lastItem.id };

      if (sortBy === 'newest' || sortBy === 'oldest') {
        cursorData.createdAt = lastItem.createdAt;
      } else if (sortBy === 'mostVoted') {
        cursorData.vote_count = lastItem.vote;
        cursorData.createdAt = lastItem.createdAt;
      }

      nextCursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
    }
    const responseData: CommentResponseDto[] = data.map((comment) => ({
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      isApproved: comment.isApproved,
      author: {
        id: comment.author.id,
        displayName: comment.author.displayName,
        discordAvatar: comment.author.discordAvatar,
      },
      vote: comment.vote || 0,
      isLiked: userId ? likedCommentIds.has(comment.id) : false,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    // ============================================
    // 9. RETURN RESPONSE
    // ============================================
    return {
      data: responseData,
      nextCursor: nextCursor,
      hasMore: hasMore,
    };
  }
  async createComment(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId: userId,
        postId,
        isApproved: true,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    });
    const response: CommentResponseDto = {
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      isApproved: comment.isApproved,
      vote: 0,
      isLiked: false,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
    return response;
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.prisma.comment.delete({ where: { id } });
    return { message: 'Comment deleted successfully' };
  }

  // ============================================
  // TAGS
  // ============================================

  async createTag(createTagDto: CreateTagDto) {
    const slug = this.generateSlug(createTagDto.name);
    return this.prisma.tag.create({
      data: {
        ...createTagDto,
        slug,
      },
    });
  }

  async findAllTags() {
    return this.prisma.tag.findMany({
      include: {
        posts: true,
      },
    });
  }

  async getPopularTags(limit: number = 10) {
    return this.prisma.tag.findMany({
      take: limit,
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
      include: {
        posts: true,
      },
    });
  }

  async deleteTag(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }

  // ============================================
  // CATEGORIES
  // ============================================

  async createCategory(name: string, slug: string, description?: string) {
    return this.prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });
  }

  async findAllCategories() {
    return this.prisma.category.findMany({
      include: {
        posts: {
          include: {
            post: true,
          },
        },
        children: true,
      },
    });
  }

  // ============================================
  // LIKES
  // ============================================

  async toggleLike(userId: string, postId: string) {
    const existing = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      await this.prisma.like.delete({ where: { id: existing.id } });
      return { liked: false, message: 'Like removed' };
    }

    await this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return { liked: true, message: 'Liked successfully' };
  }

  // ============================================
  // BOOKMARKS
  // ============================================

  async toggleBookmark(userId: string, postId: string) {
    const existing = await this.prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      await this.prisma.bookmark.delete({ where: { id: existing.id } });
      return { bookmarked: false, message: 'Bookmark removed' };
    }

    await this.prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    return { bookmarked: true, message: 'Bookmarked successfully' };
  }

  async getUserBookmarks(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
            tags: {
              include: {
                tag: true,
              },
            },
            postCategories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  }

  // ============================================
  // HELPERS
  // ============================================

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  private getPostIncludeOptions() {
    return {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
      tags: {
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      postCategories: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: {
            where: { isApproved: true },
          },
          likes: true,
          bookmarks: true,
        },
      },
    };
  }
  private transformToResponseDto(post: any): PostResponseDto {
    const { _count, ...postData } = post;

    const transformed = {
      ...postData,
      commentCount: _count?.comments || 0,
      likeCount: _count?.likes || 0,
      bookmarkCount: _count?.bookmarks || 0,
      tags: postData.tags?.map((tagRelation: any) => tagRelation.tag) || [],
      categories:
        postData.postCategories?.map(
          (categoryRelation: any) => categoryRelation.category,
        ) || [],
    };

    return plainToInstance(PostResponseDto, transformed, {
      excludeExtraneousValues: true,
    });
  }
}
