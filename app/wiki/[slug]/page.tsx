import { wikis } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import Header from "@/components/page/Header";
import Sidebar from "@/components/page/Sidebar";
import { notFound } from "next/navigation";

export default async function WikiPage({ params }: { params: { slug: string } }) {
  const param = await params
  const wiki = wikis.find(wiki => wiki.slug === param.slug)
  if (wiki === null || !wiki) notFound()

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="p-4">
          <MDXContent code={wiki.code}></MDXContent>
        </main>
      </div>
    </>
  )
}
