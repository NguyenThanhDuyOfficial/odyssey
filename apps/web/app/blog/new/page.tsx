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
    } catch (error) {
      console.error("Failed to publish:", error);
    }
  };
  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-gray-50 p-4 px-8">
        <Button onClick={handlePublish}>Publish</Button>
        <BlogEditor onChange={(data) => setPostData(data)} />
      </div>
    </>
  );
}
