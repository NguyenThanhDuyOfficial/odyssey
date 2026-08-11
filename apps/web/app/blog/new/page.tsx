"use client";
import { Metadata } from "next";
import { BlogEditor } from "@/components/page/blog/BlogEditor";
import Header from "@/components/page/Header";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function handleSubmit() {}
  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-gray-50 p-4 px-8">
        <Button onClick={() => console.log(content)}>Publish</Button>
        <BlogEditor
          content={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </>
  );
}
