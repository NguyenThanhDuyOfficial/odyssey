"use client";
import Header from "@/components/page/Header";
import { Button } from "@/components/ui/button";
import { posts, getFeaturedPosts, getLatestPosts } from "@/app/blog/posts";
import Form from "next/form";
import { italianno, playwrite } from "../fonts";
import { BlogCard } from "@/components/page/blog/BlogCard";

export default function BlogPage() {
  return (
    <>
      <Header></Header>
      <div className="min-h-[80vh] px-8 md:px-16 space-y-4 md:space-y-8">
        <section className="w-full min-h-[40vh] flex flex-col justify-center items-center gap-4">
          <p className="text-sm">Odyssey Blog</p>
          <h2 className={`font-black ${italianno.className} text-5xl`}>
            Bài học và sự biết ơn
          </h2>
          <p className="px-6 text-center max-w-100">
            Nơi bạn dùng sự nhiệt huyết để học hỏi và chia sẻ những trải nghiệm
            độc nhất, kiến thức thú vị cho mọi người và cho bản thân.
          </p>
          <Form
            action="/search"
            className="border-2 border-primary rounded-lg overflow-hidden"
          >
            <input
              className="flex-1 p-2 outline-none"
              name="query"
              type="text"
              placeholder="Tìm kiếm..."
            />
            <button
              type="submit"
              className="h-full p-2 rounded-none bg-primary text-primary-foreground hover:bg-primary/80"
            >
              Tìm
            </button>
          </Form>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post}></BlogCard>
          ))}
        </section>
      </div>
    </>
  );
}
