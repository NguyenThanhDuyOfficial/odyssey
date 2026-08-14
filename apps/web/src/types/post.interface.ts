export interface GetPostsParams {
  page?: number;
  limit?: number;
  published?: boolean;
  tag?: string;
  category?: string;
  search?: string;
  orderBy?: "newest" | "oldest" | "popular";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  published: boolean;
  publishedAt?: string;
  isFeatured: boolean;
  viewCount: number;
  author: {
    id: string;
    username: string;
    displayName: string;
    discordId: string;
    discordAvatar: string | null;
  };
  tags: Array<{ tag: { id: string; name: string; slug: string } }>;
  postCategories: Array<{
    category: { id: string; name: string; slug: string };
  }>;
  comments?: Comment[];
  likes?: Like[];
  bookmarks?: Bookmark[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  isApproved: boolean;
  authorId: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  postId: string;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface LikeResponse {
  liked: boolean;
  message: string;
}

export interface BookmarkResponse {
  bookmarked: boolean;
  message: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  published?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  tags?: string[];
  categories?: string[];
}

export interface UpdatePostDto extends Partial<CreatePostDto> {}

export interface CreateCommentDto {
  content: string;
  parentId?: string;
}

export interface CreateTagDto {
  name: string;
  description?: string;
}
