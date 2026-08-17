"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  HeartOff,
  Reply,
  MoreVertical,
  Trash2,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// ============================================
// TYPES
// ============================================
interface CommentAuthor {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface CommentType {
  id: string;
  content: string;
  author: CommentAuthor;
  vote: number;
  isLiked: boolean;
  repliesCount: number;
  createdAt: string;
  replies?: CommentType[];
}

// ============================================
// MAIN COMPONENT
// ============================================
export function Comments() {
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: "1",
      content:
        "This is an amazing article! Really helped me understand the concept. 🚀",
      author: {
        id: "user1",
        name: "John Doe",
        username: "johndoe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      vote: 42,
      isLiked: true,
      repliesCount: 3,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      replies: [
        {
          id: "2",
          content: "I agree! This really simplified the topic for me.",
          author: {
            id: "user2",
            name: "Jane Smith",
            username: "janesmith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          },
          vote: 5,
          isLiked: false,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        },
        {
          id: "3",
          content: "Could you share more resources on this topic?",
          author: {
            id: "user3",
            name: "Bob Wilson",
            username: "bobwilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
          },
          vote: 2,
          isLiked: false,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: "4",
          content: "Great point! I learned something new today.",
          author: {
            id: "user4",
            name: "Emily Chen",
            username: "emilychen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
          },
          vote: 1,
          isLiked: true,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        },
      ],
    },
    {
      id: "5",
      content:
        "Great post! I particularly liked the section about best practices.",
      author: {
        id: "user5",
        name: "Alice Johnson",
        username: "alicejohnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
      },
      vote: 28,
      isLiked: false,
      repliesCount: 2,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      replies: [
        {
          id: "6",
          content:
            "I completely agree! The best practices section was my favorite.",
          author: {
            id: "user6",
            name: "Grace Lee",
            username: "gracelee",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
          },
          vote: 3,
          isLiked: false,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: "7",
          content: "I would add one more best practice about error handling.",
          author: {
            id: "user7",
            name: "Henry Ford",
            username: "henryford",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
          },
          vote: 0,
          isLiked: false,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
      ],
    },
    {
      id: "8",
      content:
        "I have a question about the implementation details. Could you elaborate more?",
      author: {
        id: "user8",
        name: "Charlie Brown",
        username: "charliebrown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
      },
      vote: 15,
      isLiked: false,
      repliesCount: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      replies: [
        {
          id: "9",
          content: "I had the same question! Looking forward to the answer.",
          author: {
            id: "user9",
            name: "Isabel Martin",
            username: "isabelmartin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=isabel",
          },
          vote: 7,
          isLiked: true,
          repliesCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        },
      ],
    },
    {
      id: "10",
      content: "Thanks for sharing this! Very informative and well-written. 🙌",
      author: {
        id: "user10",
        name: "David Kim",
        username: "davidkim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      vote: 8,
      isLiked: false,
      repliesCount: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
  ]);

  // State
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "mostLiked">(
    "newest",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current user (mock)
  const currentUser = {
    id: "current-user",
    name: "You",
    username: "you",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
  };

  // ============================================
  // HANDLERS
  // ============================================
  const handleLike = (commentId: string) => {
    setComments((prev) =>
      updateComment(prev, commentId, (c) => ({
        ...c,
        isLiked: !c.isLiked,
        vote: c.isLiked ? c.vote - 1 : c.vote + 1,
      })),
    );
  };

  const handleDelete = (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setComments((prev) => deleteComment(prev, commentId));
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newCommentObj: CommentType = {
      id: `new-${Date.now()}`,
      content: newComment,
      author: currentUser,
      vote: 0,
      isLiked: false,
      repliesCount: 0,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newCommentObj, ...prev]);
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleAddReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newReply: CommentType = {
      id: `reply-${Date.now()}`,
      content: replyContent,
      author: currentUser,
      vote: 0,
      isLiked: false,
      repliesCount: 0,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => addReply(prev, parentId, newReply));
    setReplyContent("");
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const handleSort = (sort: "newest" | "oldest" | "mostLiked") => {
    setSortBy(sort);
    const sorted = [...comments];
    switch (sort) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "mostLiked":
        sorted.sort((a, b) => b.vote - a.vote);
        break;
    }
    setComments(sorted);
  };

  // ============================================
  // HELPERS
  // ============================================
  const updateComment = (
    comments: CommentType[],
    id: string,
    fn: (c: CommentType) => CommentType,
  ): CommentType[] => {
    return comments.map((c) => {
      if (c.id === id) return fn(c);
      if (c.replies) return { ...c, replies: updateComment(c.replies, id, fn) };
      return c;
    });
  };

  const deleteComment = (
    comments: CommentType[],
    id: string,
  ): CommentType[] => {
    return comments
      .filter((c) => c.id !== id)
      .map((c) => ({
        ...c,
        replies: c.replies ? deleteComment(c.replies, id) : c.replies,
        repliesCount: c.replies
          ? c.replies.filter((r) => r.id !== id).length
          : c.repliesCount,
      }));
  };

  const addReply = (
    comments: CommentType[],
    parentId: string,
    newReply: CommentType,
  ): CommentType[] => {
    return comments.map((c) => {
      if (c.id === parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
          repliesCount: (c.repliesCount || 0) + 1,
        };
      }
      if (c.replies) {
        return { ...c, replies: addReply(c.replies, parentId, newReply) };
      }
      return c;
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ============================================
  // SUB-COMPONENTS
  // ============================================
  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: CommentType;
    depth?: number;
  }) => {
    const [showReplies, setShowReplies] = useState(true);
    const isOwnComment = comment.author.id === currentUser.id;

    return (
      <div
        className={`space-y-2 ${depth > 0 ? "ml-6 pl-4 border-l-2 border-muted" : ""}`}
      >
        {/* Comment Content */}
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            {comment.author.avatar ? (
              <AvatarImage
                src={comment.author.avatar}
                alt={comment.author.name}
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(comment.author.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">
                @{comment.author.username}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-sm mt-1 whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>

          {/* Actions Menu */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 pl-11">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 h-7 px-2 text-sm ${
              comment.isLiked ? "text-red-500 hover:text-red-600" : ""
            }`}
            onClick={() => handleLike(comment.id)}
          >
            {comment.isLiked ? (
              <Heart className="h-3.5 w-3.5 fill-current" />
            ) : (
              <HeartOff className="h-3.5 w-3.5" />
            )}
            <span>{comment.vote}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-7 px-2 text-sm"
            onClick={() =>
              setReplyingTo(replyingTo === comment.id ? null : comment.id)
            }
          >
            <Reply className="h-3.5 w-3.5" />
            <span>Reply</span>
          </Button>

          {comment.repliesCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 h-7 px-2 text-sm text-muted-foreground"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
              {showReplies ? "Hide" : "Show"} {comment.repliesCount} replies
            </Button>
          )}

          {isOwnComment && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-sm text-red-500 hover:text-red-600"
              onClick={() => handleDelete(comment.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <div className="pl-11 mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddReply(comment.id);
              }}
              className="flex gap-2"
            >
              <Avatar className="h-7 w-7">
                {currentUser.avatar ? (
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[50px] text-sm resize-none"
                  disabled={isSubmitting}
                />
                <div className="flex flex-col gap-1">
                  <Button
                    type="submit"
                    size="sm"
                    className="h-7 px-3"
                    disabled={isSubmitting}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4 pl-11 mt-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-1">
          <Button
            variant={sortBy === "newest" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleSort("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "oldest" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleSort("oldest")}
          >
            Oldest
          </Button>
          <Button
            variant={sortBy === "mostLiked" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleSort("mostLiked")}
          >
            Top
          </Button>
        </div>
      </div>

      <Separator />

      {/* New Comment Form */}
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9">
          {currentUser.avatar ? (
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[70px] resize-none"
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim() || isSubmitting}
              className="gap-2"
              size="sm"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Comments List */}
      <div className="space-y-5">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
