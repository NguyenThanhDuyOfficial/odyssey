"use client";
import Header from "@/components/page/Header";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { italianno, playwrite } from "../fonts";
import { BlogCard } from "@/components/page/blog/BlogCard";
import { usePathname, useRouter } from "next/navigation";
import { blogService } from "@/services/blogService";
import { use, useEffect } from "react";
import { useBlogStore } from "@/stores/useBlogStore";

export default function BlogPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    tag?: string;
    category?: string;
    search?: string;
    orderBy?: string;
  };
}) {
  const params: any = use(searchParams as any);
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const tag = params.tag || "";
  const category = params.category || "";
  const orderBy = (params.orderBy || "newest") as
    "newest" | "oldest" | "popular";

  const {
    posts,
    meta,
    tags,
    categories,
    filters,
    isLoading,
    error,
    fetchPosts,
    fetchTags,
    fetchCategories,
    setFilters,
    resetFilters,
  } = useBlogStore();
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.tag) params.set("tag", filters.tag);
    if (filters.category) params.set("category", filters.category);
    if (filters.orderBy && filters.orderBy !== "newest")
      params.set("orderBy", filters.orderBy);
    if (filters.page > 1) params.set("page", String(filters.page));

    const newUrl = `${pathname}?${params.toString()}`;
    if (window.location.pathname + window.location.search !== newUrl) {
      router.push(newUrl);
    }

    fetchPosts();
    console.log(posts);
  }, [filters, fetchPosts, router, pathname]);

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
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
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
            <Button onClick={() => router.push("/blog/new")}>Đăng bài</Button>
          </div>
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
