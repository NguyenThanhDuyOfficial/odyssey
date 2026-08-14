import { DiscordAvatar } from "@/components/discordAvatar";
import { Post } from "@/types/post.interface";
import { getDiscordAvatarUrl } from "@/utils/discord";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={
          post.featuredImage
            ? post.featuredImage
            : "https://images.unsplash.com/vector-1738590593450-647695dbf9d0?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag.tag.id}
              className="text-xs px-2 py-1 bg-blue-100 rounded"
            >
              #{tag.tag.name}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </a>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src={getDiscordAvatarUrl(
                post.author.discordId,
                post.author.discordAvatar,
              )}
              alt={post.author.displayName}
              className="w-6 h-6 rounded-full"
            />
            <span>{post.author.displayName}</span>
          </div>
          <time>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</time>
        </div>
      </div>
    </article>
  );
}
