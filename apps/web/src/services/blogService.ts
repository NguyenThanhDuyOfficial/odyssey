// services/blog.service.ts
import HttpClient from "@/lib/httpClient";
import {
  GetPostsParams,
  PaginatedResponse,
  Post,
  Comment,
  Tag,
  Category,
  CreatePostDto,
  UpdatePostDto,
  CreateCommentDto,
  CreateTagDto,
  LikeResponse,
  BookmarkResponse,
} from "@/types/post.interface";
export interface GetCommentsParams {
  sortBy?: "newest" | "mostVoted";
  cursor?: string;
  limit?: number;
}

export const blogService = {
  async getComments(
    postId: string,
    params: GetCommentsParams = {},
  ): Promise<any> {
    const { sortBy = "newest", cursor, limit = 20 } = params;

    const queryParams = new URLSearchParams({
      sortBy,
      cursor: String(cursor),
      limit: String(limit),
    });

    const response = await HttpClient.get(
      `/blog/posts/${postId}/comments?${queryParams.toString()}`,
    );
    console.log("blogServce", response);
    return response.data;
  },

  // ============================================
  // POSTS
  // ============================================

  /**
   * Get all posts with pagination and filtering
   * GET /api/blog/posts
   */
  async getPosts(
    params: GetPostsParams = {},
  ): Promise<PaginatedResponse<Post>> {
    const {
      page = 1,
      limit = 10,
      published = true,
      tag,
      category,
      search,
      orderBy = "newest",
    } = params;

    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      published: String(published),
      orderBy,
    });

    if (tag) queryParams.append("tag", tag);
    if (category) queryParams.append("category", category);
    if (search) queryParams.append("search", search);

    const response = await HttpClient.get<PaginatedResponse<Post>>(
      `/blog/posts?${queryParams.toString()}`,
    );
    return response.data;
  },

  /**
   * Get a single post by slug
   * GET /api/blog/posts/{slug}
   */
  async getPostBySlug(slug: string): Promise<Post> {
    const response = await HttpClient.get<Post>(`/blog/posts/${slug}`);
    return response.data;
  },

  /**
   * Create a new post
   * POST /api/blog/posts
   */
  async createPost(data: CreatePostDto): Promise<Post> {
    const response = await HttpClient.post<Post>("/blog/posts", data);
    return response.data;
  },

  /**
   * Update a post
   * PUT /api/blog/posts/{id}
   */
  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const response = await HttpClient.put<Post>(`/blog/posts/${id}`, data);
    return response.data;
  },

  /**
   * Delete a post
   * DELETE /api/blog/posts/{id}
   */
  async deletePost(id: string): Promise<{ message: string }> {
    const response = await HttpClient.delete<{ message: string }>(
      `/blog/posts/${id}`,
    );
    return response.data;
  },

  // ============================================
  // COMMENTS
  // ============================================

  /**
   * Add a comment to a post
   * POST /api/blog/posts/{postId}/comments
   */
  async createComment(
    postId: string,
    data: CreateCommentDto,
  ): Promise<Comment> {
    const response = await HttpClient.post<Comment>(
      `/blog/posts/${postId}/comments`,
      data,
    );
    return response.data;
  },

  /**
   * Delete a comment
   * DELETE /api/blog/comments/{id}
   */
  async deleteComment(id: string): Promise<{ message: string }> {
    const response = await HttpClient.delete<{ message: string }>(
      `/blog/comments/${id}`,
    );
    return response.data;
  },

  // ============================================
  // TAGS
  // ============================================

  /**
   * Create a new tag
   * POST /api/blog/tags
   */
  async createTag(data: CreateTagDto): Promise<Tag> {
    const response = await HttpClient.post<Tag>("/blog/tags", data);
    return response.data;
  },

  /**
   * Get all tags
   * GET /api/blog/tags
   */
  async getTags(): Promise<Tag[]> {
    const response = await HttpClient.get<Tag[]>("/blog/tags");
    return response.data;
  },

  /**
   * Get popular tags
   * GET /api/blog/tags/popular
   */
  async getPopularTags(limit: number = 10): Promise<Tag[]> {
    const response = await HttpClient.get<Tag[]>(
      `/blog/tags/popular?limit=${limit}`,
    );
    return response.data;
  },

  /**
   * Delete a tag
   * DELETE /api/blog/tags/{id}
   */
  async deleteTag(id: string): Promise<{ message: string }> {
    const response = await HttpClient.delete<{ message: string }>(
      `/blog/tags/${id}`,
    );
    return response.data;
  },

  // ============================================
  // CATEGORIES
  // ============================================

  /**
   * Get all categories
   * GET /api/blog/categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await HttpClient.get<Category[]>("/blog/categories");
    return response.data;
  },

  // ============================================
  // LIKES
  // ============================================

  /**
   * Toggle like on a post
   * POST /api/blog/posts/{postId}/like
   */
  async toggleLike(postId: string): Promise<LikeResponse> {
    const response = await HttpClient.post<LikeResponse>(
      `/blog/posts/${postId}/like`,
    );
    return response.data;
  },

  // ============================================
  // BOOKMARKS
  // ============================================

  /**
   * Toggle bookmark on a post
   * POST /api/blog/posts/{postId}/bookmark
   */
  async toggleBookmark(postId: string): Promise<BookmarkResponse> {
    const response = await HttpClient.post<BookmarkResponse>(
      `/blog/posts/${postId}/bookmark`,
    );
    return response.data;
  },

  /**
   * Get user bookmarks
   * GET /api/blog/bookmarks
   */
  async getUserBookmarks(): Promise<BookmarkResponse[]> {
    const response =
      await HttpClient.get<BookmarkResponse[]>("/blog/bookmarks");
    return response.data;
  },
};
