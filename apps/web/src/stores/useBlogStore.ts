import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { blogService, GetCommentsParams } from "@/services/blogService";
import {
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

interface BlogState {
  // State
  posts: Post[];
  currentPost: Post | null;
  tags: Tag[];
  categories: Category[];
  comments: Comment[];
  filters: {
    page: number;
    limit: number;
    search: string;
    tag: string;
    category: string;
    orderBy: "newest" | "oldest" | "popular";
  };
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;

  // Actions - Posts
  fetchPosts: () => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<void>;
  createPost: (data: CreatePostDto) => Promise<Post>;
  updatePost: (id: string, data: UpdatePostDto) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;

  // Actions - Comments
  fetchComments: (postId: string, params: GetCommentsParams) => Promise<void>;
  createComment: (postId: string, data: CreateCommentDto) => Promise<Comment>;
  deleteComment: (id: string) => Promise<void>;

  // Actions - Tags
  fetchTags: () => Promise<void>;
  fetchPopularTags: (limit?: number) => Promise<void>;
  createTag: (data: CreateTagDto) => Promise<Tag>;
  deleteTag: (id: string) => Promise<void>;

  // Actions - Categories
  fetchCategories: () => Promise<void>;

  // Actions - Likes
  toggleLike: (postId: string) => Promise<LikeResponse>;

  // Actions - Bookmarks
  toggleBookmark: (postId: string) => Promise<BookmarkResponse>;
  fetchUserBookmarks: () => Promise<void>;

  // Actions - Filters & Utils
  setFilters: (filters: Partial<BlogState["filters"]>) => void;
  resetFilters: () => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  posts: [],
  currentPost: null,
  tags: [],
  categories: [],
  comments: [],
  filters: {
    page: 1,
    limit: 9,
    search: "",
    tag: "",
    category: "",
    orderBy: "newest" as const,
  },
  meta: {
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
  isSubmitting: false,
};

export const useBlogStore = create<BlogState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchPosts: async () => {
        set({ isLoading: true, error: null }, false, "blog/fetchPosts");
        try {
          const { filters } = get();
          const response = await blogService.getPosts({
            page: filters.page,
            limit: filters.limit,
            search: filters.search || undefined,
            tag: filters.tag || undefined,
            category: filters.category || undefined,
            orderBy: filters.orderBy,
          });

          set(
            {
              posts: response.data,
              meta: response.meta,
              isLoading: false,
            },
            false,
            "blog/fetchPosts/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to fetch posts",
              isLoading: false,
            },
            false,
            "blog/fetchPosts/error",
          );
        }
      },

      fetchPostBySlug: async (slug: string) => {
        set({ isLoading: true, error: null }, false, "blog/fetchPostBySlug");
        try {
          const post = await blogService.getPostBySlug(slug);
          set(
            {
              currentPost: post,
              isLoading: false,
            },
            false,
            "blog/fetchPostBySlug/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to fetch post",
              isLoading: false,
            },
            false,
            "blog/fetchPostBySlug/error",
          );
        }
      },

      createPost: async (data: CreatePostDto) => {
        set({ isSubmitting: true, error: null }, false, "blog/createPost");
        try {
          const post = await blogService.createPost(data);
          set(
            (state) => ({
              posts: [post, ...state.posts],
              isSubmitting: false,
            }),
            false,
            "blog/createPost/success",
          );
          return post;
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to create post",
              isSubmitting: false,
            },
            false,
            "blog/createPost/error",
          );
          throw error;
        }
      },

      updatePost: async (id: string, data: UpdatePostDto) => {
        set({ isSubmitting: true, error: null }, false, "blog/updatePost");
        try {
          const post = await blogService.updatePost(id, data);
          set(
            (state) => ({
              posts: state.posts.map((p) => (p.id === id ? post : p)),
              currentPost:
                state.currentPost?.id === id ? post : state.currentPost,
              isSubmitting: false,
            }),
            false,
            "blog/updatePost/success",
          );
          return post;
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to update post",
              isSubmitting: false,
            },
            false,
            "blog/updatePost/error",
          );
          throw error;
        }
      },

      deletePost: async (id: string) => {
        set({ isSubmitting: true, error: null }, false, "blog/deletePost");
        try {
          await blogService.deletePost(id);
          set(
            (state) => ({
              posts: state.posts.filter((p) => p.id !== id),
              currentPost:
                state.currentPost?.id === id ? null : state.currentPost,
              isSubmitting: false,
            }),
            false,
            "blog/deletePost/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to delete post",
              isSubmitting: false,
            },
            false,
            "blog/deletePost/error",
          );
          throw error;
        }
      },

      // ============================================
      // COMMENTS
      // ============================================

      fetchComments: async (postId: string, params: GetCommentsParams) => {
        set({ isLoading: true }, false, "blog/fetchComments");
        try {
          const post = await blogService.getComments(postId, params);
          set(
            {
              comments: post.data || [],
              isLoading: false,
            },
            false,
            "blog/fetchComments/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to fetch comments",
              isLoading: false,
            },
            false,
            "blog/fetchComments/error",
          );
        }
      },

      createComment: async (postId: string, data: CreateCommentDto) => {
        set({ isSubmitting: true }, false, "blog/createComment");
        try {
          const comment = await blogService.createComment(postId, data);
          set(
            (state) => ({
              comments: [...state.comments, comment],
              isSubmitting: false,
            }),
            false,
            "blog/createComment/success",
          );
          return comment;
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to create comment",
              isSubmitting: false,
            },
            false,
            "blog/createComment/error",
          );
          throw error;
        }
      },

      deleteComment: async (id: string) => {
        set({ isSubmitting: true }, false, "blog/deleteComment");
        try {
          await blogService.deleteComment(id);
          set(
            (state) => ({
              comments: state.comments.filter((c) => c.id !== id),
              isSubmitting: false,
            }),
            false,
            "blog/deleteComment/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to delete comment",
              isSubmitting: false,
            },
            false,
            "blog/deleteComment/error",
          );
          throw error;
        }
      },

      // ============================================
      // TAGS
      // ============================================

      fetchTags: async () => {
        try {
          const tags = await blogService.getTags();
          set({ tags }, false, "blog/fetchTags/success");
        } catch (error: any) {
          console.error("Failed to fetch tags:", error);
        }
      },

      fetchPopularTags: async (limit: number = 10) => {
        try {
          const tags = await blogService.getPopularTags(limit);
          set({ tags }, false, "blog/fetchPopularTags/success");
        } catch (error: any) {
          console.error("Failed to fetch popular tags:", error);
        }
      },

      createTag: async (data: CreateTagDto) => {
        set({ isSubmitting: true }, false, "blog/createTag");
        try {
          const tag = await blogService.createTag(data);
          set(
            (state) => ({
              tags: [...state.tags, tag],
              isSubmitting: false,
            }),
            false,
            "blog/createTag/success",
          );
          return tag;
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to create tag",
              isSubmitting: false,
            },
            false,
            "blog/createTag/error",
          );
          throw error;
        }
      },

      deleteTag: async (id: string) => {
        set({ isSubmitting: true }, false, "blog/deleteTag");
        try {
          await blogService.deleteTag(id);
          set(
            (state) => ({
              tags: state.tags.filter((t) => t.id !== id),
              isSubmitting: false,
            }),
            false,
            "blog/deleteTag/success",
          );
        } catch (error: any) {
          set(
            {
              error: error.message || "Failed to delete tag",
              isSubmitting: false,
            },
            false,
            "blog/deleteTag/error",
          );
          throw error;
        }
      },

      // ============================================
      // CATEGORIES
      // ============================================

      fetchCategories: async () => {
        try {
          const categories = await blogService.getCategories();
          set({ categories }, false, "blog/fetchCategories/success");
        } catch (error: any) {
          console.error("Failed to fetch categories:", error);
        }
      },

      // ============================================
      // LIKES
      // ============================================

      toggleLike: async (postId: string) => {
        try {
          const response = await blogService.toggleLike(postId);
          // Update posts list
          set(
            (state) => ({
              posts: state.posts.map((p) => {
                if (p.id === postId) {
                  const likes = p.likes || [];
                  return {
                    ...p,
                    likes: response.liked
                      ? [
                          ...likes,
                          {
                            id: "temp",
                            userId: "current",
                            postId,
                            createdAt: new Date().toISOString(),
                          },
                        ]
                      : likes.filter((l) => l.userId !== "current"),
                  };
                }
                return p;
              }),
            }),
            false,
            "blog/toggleLike/success",
          );
          return response;
        } catch (error: any) {
          console.error("Failed to toggle like:", error);
          throw error;
        }
      },

      // ============================================
      // BOOKMARKS
      // ============================================

      toggleBookmark: async (postId: string) => {
        try {
          const response = await blogService.toggleBookmark(postId);
          // Update posts list
          set(
            (state) => ({
              posts: state.posts.map((p) => {
                if (p.id === postId) {
                  const bookmarks = p.bookmarks || [];
                  return {
                    ...p,
                    bookmarks: response.bookmarked
                      ? [
                          ...bookmarks,
                          {
                            id: "temp",
                            userId: "current",
                            postId,
                            createdAt: new Date().toISOString(),
                          },
                        ]
                      : bookmarks.filter((b) => b.userId !== "current"),
                  };
                }
                return p;
              }),
            }),
            false,
            "blog/toggleBookmark/success",
          );
          return response;
        } catch (error: any) {
          console.error("Failed to toggle bookmark:", error);
          throw error;
        }
      },

      fetchUserBookmarks: async () => {
        try {
          const bookmarks = await blogService.getUserBookmarks();
          // Có thể lưu bookmarks vào state riêng nếu cần
          set({}, false, "blog/fetchUserBookmarks/success");
        } catch (error: any) {
          console.error("Failed to fetch bookmarks:", error);
        }
      },

      // ============================================
      // FILTERS & UTILS
      // ============================================

      setFilters: (newFilters) => {
        set(
          (state) => ({
            filters: {
              ...state.filters,
              ...newFilters,
            },
          }),
          false,
          "blog/setFilters",
        );
      },

      resetFilters: () => {
        set(
          {
            filters: initialState.filters,
            posts: [],
            meta: initialState.meta,
          },
          false,
          "blog/resetFilters",
        );
      },

      clearError: () => {
        set({ error: null }, false, "blog/clearError");
      },

      reset: () => {
        set(initialState, false, "blog/reset");
      },
    }),
    {
      name: "blog-store",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
