import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const { tags, categories, ...postData } = createPostDto;

    // Generate slug from title
    const slug = this.generateSlug(postData.title);

    return this.prisma.post.create({
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
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
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
                avatarUrl: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
        likes: true,
        bookmarks: true,
      },
    });
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
            avatarUrl: true,
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
                avatarUrl: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                  },
                },
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
            avatarUrl: true,
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

  async createComment(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId: userId,
        postId,
        isApproved: true, // Set to false if moderation is needed
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
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
                avatarUrl: true,
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
}
