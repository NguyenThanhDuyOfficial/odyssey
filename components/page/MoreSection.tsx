import BlogCard from "./BlogCard";

const blogs = [
  {
    title: "Odyssey dùng thế nào?",
    imageUrl: "/landing/blog.jpg",
    href: "/",
    type: "Blog",
  },
  {
    title: "Yêu thương là gì?",
    imageUrl: "/landing/blog.jpg",
    href: "/",
    type: "Blog",
  },
];
export default function MoreSection() {
  return (
    <section id="more" className="p-8 space-y-8">
      <h2 className="w-full text-center">Nhiều hơn về Odyssey</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center ">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            src={blog.imageUrl}
            href={blog.href}
            type={blog.type}
          ></BlogCard>
        ))}
      </div>
    </section>
  );
}
