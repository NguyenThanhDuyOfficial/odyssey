"use client";
import { Metadata } from "next";
import { BlogEditor } from "@/components/page/blog/BlogEditor";
import Header from "@/components/page/Header";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/stores/useBlogStore";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [error, setError] = useState();
  const [postData, setPostData] = useState({ title: "", content: "" });
  const { createPost } = useBlogStore();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const post = await createPost({
        title: postData.title,
        content: postData.content,
        published: true,
      });
      router.push(`/blog/${post.slug}`);
    } catch (error: any) {
      const message = error.request?.data?.message || error.message;
      setError(message);
    }
  };
  return (
    <div className="relative min-h-screen bg-gray-50 px-8 md:px-16">
      <Header></Header>
      <div className="">
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Nhập tiêu đề ở đây..."
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            className="w-full text-3xl md:text-4xl font-bold border-none outline-none my-4"
          />
          {/* TODO: TAG */}
        </div>
        <BlogEditor onChange={(data) => setPostData(data)} />

        <div className="absolute bottom-10 left-16">
          <Button onClick={handlePublish} size="lg">
            Đăng bài
          </Button>
          <Button>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
