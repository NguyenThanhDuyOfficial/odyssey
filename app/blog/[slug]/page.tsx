
import { blogs } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import Header from "@/components/page/Header";
import Sidebar from "@/components/page/Sidebar";
import { notFound } from "next/navigation";

export default async function blogPage({ params }: { params: { slug: string } }) {
  const param = await params
  const blog = blogs.find(blog => blog.slug === param.slug)
  if (blog === null || !blog) notFound()

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="p-4">
          <MDXContent code={blog.code}></MDXContent>
        </main>
      </div>
    </>
  )
}
