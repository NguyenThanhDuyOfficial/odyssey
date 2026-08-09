export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published: boolean;
  publishedAt: Date;
  isFeatured: boolean;
  viewCount: number;
  authorId: string;
  author: {
    id: string;
    displayName: string;
    username: string;
    avatarUrl?: string;
  };
  tags: { id: string; name: string; slug: string }[];
  categories: { id: string; name: string; slug: string; icon?: string }[];
  comments: {
    id: string;
    content: string;
    author: { id: string; displayName: string; avatarUrl?: string };
    createdAt: Date;
  }[];
  likes: number;
  bookmarks: number;
  createdAt: Date;
  updatedAt: Date;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

// ============================================
// USERS - 15 users cố định
// ============================================
const USERS = [
  {
    id: "user1",
    displayName: "Nguyễn Văn An",
    username: "nguyenvanan",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=an",
  },
  {
    id: "user2",
    displayName: "Trần Thị Bình",
    username: "tranthibinh",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=binh",
  },
  {
    id: "user3",
    displayName: "Lê Văn Cường",
    username: "levancuong",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=cuong",
  },
  {
    id: "user4",
    displayName: "Phạm Thị Dung",
    username: "phamthidung",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=dung",
  },
  {
    id: "user5",
    displayName: "Hoàng Văn Em",
    username: "hoangvanem",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=em",
  },
  {
    id: "user6",
    displayName: "Vũ Thị Phương",
    username: "vuthiphuong",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=phuong",
  },
  {
    id: "user7",
    displayName: "Đặng Văn Giang",
    username: "dangvangiang",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=giang",
  },
  {
    id: "user8",
    displayName: "Bùi Thị Hoa",
    username: "buithihoa",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=hoa",
  },
  {
    id: "user9",
    displayName: "Đỗ Văn Inh",
    username: "dovaninh",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=inh",
  },
  {
    id: "user10",
    displayName: "Hồ Thị Kim",
    username: "hothikim",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=kim",
  },
  {
    id: "user11",
    displayName: "Ngô Văn Long",
    username: "ngovanlong",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=long",
  },
  {
    id: "user12",
    displayName: "Lý Thị Mai",
    username: "lythimai",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mai",
  },
  {
    id: "user13",
    displayName: "Trương Văn Nam",
    username: "truongvannam",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=nam",
  },
  {
    id: "user14",
    displayName: "Huỳnh Thị Oanh",
    username: "huynhthioanh",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=oanh",
  },
  {
    id: "user15",
    displayName: "Phan Văn Phúc",
    username: "phanvanphuc",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=phuc",
  },
];

// ============================================
// TAGS - 20 tags cố định
// ============================================
const TAGS = [
  { id: "tag1", name: "React", slug: "react" },
  { id: "tag2", name: "Next.js", slug: "nextjs" },
  { id: "tag3", name: "TypeScript", slug: "typescript" },
  { id: "tag4", name: "JavaScript", slug: "javascript" },
  { id: "tag5", name: "Node.js", slug: "nodejs" },
  { id: "tag6", name: "Python", slug: "python" },
  { id: "tag7", name: "Docker", slug: "docker" },
  { id: "tag8", name: "AWS", slug: "aws" },
  { id: "tag9", name: "GraphQL", slug: "graphql" },
  { id: "tag10", name: "Prisma", slug: "prisma" },
  { id: "tag11", name: "TailwindCSS", slug: "tailwindcss" },
  { id: "tag12", name: "PostgreSQL", slug: "postgresql" },
  { id: "tag13", name: "MongoDB", slug: "mongodb" },
  { id: "tag14", name: "Redis", slug: "redis" },
  { id: "tag15", name: "NestJS", slug: "nestjs" },
  { id: "tag16", name: "Vue.js", slug: "vuejs" },
  { id: "tag17", name: "Angular", slug: "angular" },
  { id: "tag18", name: "Svelte", slug: "svelte" },
  { id: "tag19", name: "DevOps", slug: "devops" },
  { id: "tag20", name: "AI & ML", slug: "ai-ml" },
];

// ============================================
// CATEGORIES - 10 categories cố định
// ============================================
const CATEGORIES = [
  { id: "cat1", name: "Lập trình Web", slug: "lap-trinh-web", icon: "🌐" },
  { id: "cat2", name: "Frontend", slug: "frontend", icon: "🎨" },
  { id: "cat3", name: "Backend", slug: "backend", icon: "⚙️" },
  { id: "cat4", name: "DevOps", slug: "devops", icon: "🚀" },
  { id: "cat5", name: "Mobile", slug: "mobile", icon: "📱" },
  { id: "cat6", name: "AI & Machine Learning", slug: "ai-ml", icon: "🤖" },
  { id: "cat7", name: "Database", slug: "database", icon: "🗄️" },
  { id: "cat8", name: "UI/UX", slug: "ui-ux", icon: "🎯" },
  { id: "cat9", name: "Security", slug: "security", icon: "🔒" },
  { id: "cat10", name: "Blockchain", slug: "blockchain", icon: "⛓️" },
];

// ============================================
// HELPER FUNCTIONS - Không dùng Math.random
// ============================================
function getTagsForPost(postIndex: number): typeof TAGS {
  const tagCount = (postIndex % 3) + 2; // 2-4 tags
  const startIndex = (postIndex * 3) % TAGS.length;
  const result = [];
  for (let i = 0; i < tagCount; i++) {
    const idx = (startIndex + i) % TAGS.length;
    result.push(TAGS[idx]);
  }
  return result;
}

function getCategoriesForPost(postIndex: number): typeof CATEGORIES {
  const count = (postIndex % 2) + 1; // 1-2 categories
  const startIndex = (postIndex * 2) % CATEGORIES.length;
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % CATEGORIES.length;
    result.push(CATEGORIES[idx]);
  }
  return result;
}

function getAuthorForPost(postIndex: number): (typeof USERS)[0] {
  return USERS[postIndex % USERS.length];
}

function getCommentsForPost(postIndex: number, createdAt: Date): any[] {
  const commentCount = postIndex % 5; // 0-4 comments
  const comments = [];
  for (let i = 0; i < commentCount; i++) {
    const author = USERS[(postIndex + i + 1) % USERS.length];
    const date = new Date(createdAt);
    date.setHours(date.getHours() + i * 2);
    comments.push({
      id: `comment-${postIndex}-${i}`,
      content: getCommentContent(i),
      author: {
        id: author.id,
        displayName: author.displayName,
        avatarUrl: author.avatarUrl,
      },
      createdAt: date,
    });
  }
  return comments;
}

function getCommentContent(index: number): string {
  const contents = [
    "Bài viết rất hữu ích, cảm ơn tác giả!",
    "Mình đã áp dụng và thấy hiệu quả. Tuyệt vời!",
    "Có cách nào tối ưu hơn không bạn?",
    "Rất chi tiết và dễ hiểu. Mong có thêm phần tiếp theo.",
    "Hay quá! Mình sẽ share cho nhóm học tập.",
    "Đang tìm hiểu về chủ đề này, bài viết đúng lúc quá.",
    "Cảm ơn bạn đã chia sẻ kiến thức bổ ích.",
  ];
  return contents[index % contents.length];
}

function getExcerpt(index: number): string {
  const excerpts = [
    "Bài viết tổng hợp những kiến thức quan trọng và kinh nghiệm thực tế...",
    "Hướng dẫn chi tiết từng bước với ví dụ cụ thể và dễ hiểu...",
    "Phân tích sâu về các khía cạnh kỹ thuật và ứng dụng thực tế...",
    "Những tips và tricks hữu ích giúp tăng năng suất làm việc...",
    "Giải thích cặn kẽ các khái niệm phức tạp thành đơn giản...",
    "Tổng hợp những lỗi thường gặp và cách khắc phục hiệu quả...",
    "So sánh các phương pháp khác nhau để lựa chọn tối ưu...",
  ];
  return excerpts[index % excerpts.length];
}

function getViewCount(postIndex: number): number {
  const views = [120, 450, 780, 1250, 2300, 3400, 5600, 8900];
  return views[postIndex % views.length];
}

function getLikes(postIndex: number): number {
  const likes = [5, 12, 23, 34, 45, 56, 67, 78, 89];
  return likes[postIndex % likes.length];
}

function getBookmarks(postIndex: number): number {
  const bookmarks = [2, 5, 8, 12, 15, 18, 22, 25];
  return bookmarks[postIndex % bookmarks.length];
}

// ============================================
// TITLES - 20 titles cố định
// ============================================
const TITLES = [
  { topic: "React", title: "Hướng dẫn React từ cơ bản đến nâng cao" },
  { topic: "Next.js", title: "Tối ưu hiệu suất Next.js trong dự án thực tế" },
  { topic: "TypeScript", title: "10 mẹo hay khi làm việc với TypeScript" },
  { topic: "JavaScript", title: "Tìm hiểu sâu về JavaScript cho người mới" },
  { topic: "Node.js", title: "Cách tích hợp Node.js vào dự án Next.js" },
  {
    topic: "Python",
    title: "Phân tích và so sánh các cách tiếp cận với Python",
  },
  { topic: "Docker", title: "Xây dựng ứng dụng với Docker và TypeScript" },
  {
    topic: "GraphQL",
    title: "Debug GraphQL: Những lỗi thường gặp và cách khắc phục",
  },
  { topic: "Prisma", title: "Kiến trúc microservices với Prisma" },
  {
    topic: "TailwindCSS",
    title: "Testing TailwindCSS: Unit test và Integration test",
  },
  { topic: "PostgreSQL", title: "Deploy PostgreSQL lên production với Docker" },
  { topic: "MongoDB", title: "Bảo mật MongoDB: Những lưu ý quan trọng" },
  { topic: "Redis", title: "Tối ưu code Redis để tăng performance" },
  { topic: "NestJS", title: "Làm chủ NestJS trong 30 ngày" },
  { topic: "Vue.js", title: "Những thay đổi mới nhất trong Vue.js 2026" },
  { topic: "Angular", title: "Hướng dẫn Angular từ cơ bản đến nâng cao" },
  { topic: "Svelte", title: "Tối ưu hiệu suất Svelte trong dự án thực tế" },
  { topic: "DevOps", title: "10 công cụ DevOps bạn nên biết" },
  { topic: "AI & ML", title: "Giới thiệu Machine Learning cho người mới" },
  { topic: "Blockchain", title: "Blockchain cơ bản và ứng dụng thực tế" },
];

function getTitleForPost(postIndex: number): string {
  return TITLES[postIndex % TITLES.length].title;
}

// ============================================
// CONTENT - 10 paragraphs cố định
// ============================================
const PARAGRAPHS = [
  "Trong quá trình phát triển ứng dụng web hiện đại, việc lựa chọn công nghệ phù hợp đóng vai trò quan trọng trong thành công của dự án. Bài viết này sẽ giúp bạn hiểu rõ hơn về các khía cạnh quan trọng cần xem xét khi xây dựng một ứng dụng scalable và maintainable.",

  "Khi làm việc với các framework và thư viện mới, chúng ta thường gặp phải những thách thức về hiệu suất và khả năng mở rộng. Tuy nhiên, với những kỹ thuật và công cụ phù hợp, bạn có thể giải quyết vấn đề một cách hiệu quả và tối ưu hóa ứng dụng của mình.",

  "Một trong những xu hướng nổi bật trong những năm gần đây là việc áp dụng kiến trúc microservices và serverless. Điều này mang lại nhiều lợi ích như khả năng scale tốt hơn, giảm chi phí vận hành và tăng tính linh hoạt cho đội ngũ phát triển.",

  "Việc tối ưu hóa hiệu suất không chỉ dừng lại ở code mà còn bao gồm cả cách tổ chức cơ sở dữ liệu, caching strategy và CDN. Mỗi thành phần đều đóng góp vào trải nghiệm người dùng cuối và cần được xem xét kỹ lưỡng.",

  "Bảo mật là một trong những ưu tiên hàng đầu khi phát triển ứng dụng. Các biện pháp như authentication, authorization, và data encryption cần được triển khai đúng cách để bảo vệ thông tin người dùng và dữ liệu nhạy cảm.",

  "Testing tự động đã trở thành một phần không thể thiếu trong quy trình phát triển phần mềm hiện đại. Unit test, integration test, và end-to-end test giúp đảm bảo chất lượng và giảm thiểu lỗi trong sản phẩm cuối cùng.",

  "DevOps và CI/CD pipeline giúp tự động hóa quy trình build, test, và deploy ứng dụng. Điều này không chỉ tăng tốc độ phát triển mà còn giảm thiểu rủi ro khi release sản phẩm mới.",

  "Khi làm việc với database, việc tối ưu query và index là cực kỳ quan trọng. Một database được thiết kế tốt sẽ cải thiện đáng kể hiệu suất của toàn bộ ứng dụng và giảm thời gian response.",

  "UI/UX design không chỉ đơn thuần là làm cho ứng dụng đẹp mắt. Nó còn liên quan đến việc tạo ra trải nghiệm người dùng mượt mà và trực quan, giúp người dùng dễ dàng đạt được mục tiêu của họ.",

  "Trong thế giới phát triển phần mềm, việc học hỏi và cập nhật kiến thức mới là điều bắt buộc. Công nghệ thay đổi nhanh chóng, và chúng ta cần không ngừng nâng cao kỹ năng để theo kịp xu hướng.",
];

function getContentForPost(postIndex: number): string {
  const topic = TITLES[postIndex % TITLES.length].topic;
  const title = TITLES[postIndex % TITLES.length].title;
  const numParagraphs = (postIndex % 4) + 3; // 3-6 paragraphs

  let content = `# ${title}\n\n`;
  content += `## Giới thiệu\n\n`;
  content += `${PARAGRAPHS[postIndex % PARAGRAPHS.length]}\n\n`;

  for (let i = 1; i < numParagraphs; i++) {
    if (i === Math.floor(numParagraphs / 2)) {
      content += `## Chi tiết về ${topic}\n\n`;
    }
    content += `${PARAGRAPHS[(postIndex + i) % PARAGRAPHS.length]}\n\n`;
  }

  content += `## Kết luận\n\n`;
  content += `${PARAGRAPHS[(postIndex + numParagraphs) % PARAGRAPHS.length]}\n\n`;
  content += `---\n\n`;
  content += `*Bài viết được chia sẻ bởi thành viên nhóm học tập. Hy vọng sẽ giúp ích cho các bạn!*`;

  return content;
}

function getMetaDescription(postIndex: number): string {
  const descriptions = [
    "Hướng dẫn chi tiết và dễ hiểu về chủ đề này cho người mới bắt đầu.",
    "Tổng hợp những kiến thức và kinh nghiệm thực tế từ dự án.",
    "Phân tích sâu và đưa ra giải pháp tối ưu cho vấn đề thường gặp.",
    "Những mẹo và kỹ thuật hữu ích giúp bạn làm việc hiệu quả hơn.",
    "Cập nhật những xu hướng và công nghệ mới nhất trong lĩnh vực.",
  ];
  return descriptions[postIndex % descriptions.length];
}

// ============================================
// GENERATE 100 POSTS - CỐ ĐỊNH HOÀN TOÀN
// ============================================
export const posts: Post[] = Array.from({ length: 100 }, (_, index) => {
  const postIndex = index + 1;
  const author = getAuthorForPost(postIndex);
  const tags = getTagsForPost(postIndex);
  const categories = getCategoriesForPost(postIndex);
  const title = getTitleForPost(postIndex);
  const createdAt = new Date(2025, 0, 1);
  createdAt.setDate(createdAt.getDate() + postIndex * 3);

  const isPublished = postIndex % 6 !== 0; // ~83% published
  const isFeatured = postIndex % 7 === 0; // ~14% featured

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: `post-${String(postIndex).padStart(3, "0")}`,
    slug: `${slug}-${String(postIndex).padStart(3, "0")}`,
    title: title,
    content: getContentForPost(postIndex),
    excerpt: getExcerpt(postIndex),
    featuredImage: `https://picsum.photos/seed/${postIndex}/800/450`,
    published: isPublished,
    publishedAt: isPublished ? new Date(createdAt) : new Date(createdAt),
    isFeatured: isFeatured,
    viewCount: getViewCount(postIndex),
    authorId: author.id,
    author: {
      id: author.id,
      displayName: author.displayName,
      username: author.username,
      avatarUrl: author.avatarUrl,
    },
    tags: tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    categories: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
    })),
    comments: getCommentsForPost(postIndex, createdAt),
    likes: getLikes(postIndex),
    bookmarks: getBookmarks(postIndex),
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
    metaTitle: title,
    metaDescription: getMetaDescription(postIndex),
    metaKeywords: tags.map((t) => t.name).join(", "),
  };
});

// ============================================
// EXPORT FUNCTIONS
// ============================================
export function getFeaturedPosts(): Post[] {
  return posts.filter((post) => post.isFeatured && post.published);
}

export function getLatestPosts(limit: number = 6): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function getPopularPosts(limit: number = 6): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return posts.filter(
    (post) =>
      post.published &&
      post.categories.some((cat) => cat.slug === categorySlug),
  );
}

export function getPostsByTag(tagSlug: string): Post[] {
  return posts.filter(
    (post) => post.published && post.tags.some((tag) => tag.slug === tagSlug),
  );
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return posts.filter(
    (post) =>
      post.published &&
      (post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.name.toLowerCase().includes(q)) ||
        post.categories.some((cat) => cat.name.toLowerCase().includes(q))),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  const tagIds = post.tags.map((t) => t.id);
  const categoryIds = post.categories.map((c) => c.id);

  const related = posts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.published &&
        (p.tags.some((t) => tagIds.includes(t.id)) ||
          p.categories.some((c) => categoryIds.includes(c.id))),
    )
    .sort((a, b) => {
      // Đếm số lượng tag/category trùng nhau
      const scoreA =
        a.tags.filter((t) => tagIds.includes(t.id)).length +
        a.categories.filter((c) => categoryIds.includes(c.id)).length;
      const scoreB =
        b.tags.filter((t) => tagIds.includes(t.id)).length +
        b.categories.filter((c) => categoryIds.includes(c.id)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);

  return related;
}

export function getAllTags(): {
  id: string;
  name: string;
  slug: string;
  count: number;
}[] {
  const tagCount = new Map<string, number>();

  posts
    .filter((p) => p.published)
    .forEach((post) => {
      post.tags.forEach((tag) => {
        const key = tag.id;
        if (tagCount.has(key)) {
          tagCount.set(key, tagCount.get(key)! + 1);
        } else {
          tagCount.set(key, 1);
        }
      });
    });

  return TAGS.map((tag) => ({
    ...tag,
    count: tagCount.get(tag.id) || 0,
  })).sort((a, b) => b.count - a.count);
}

export function getAllCategories(): {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  count: number;
}[] {
  const categoryCount = new Map<string, number>();

  posts
    .filter((p) => p.published)
    .forEach((post) => {
      post.categories.forEach((category) => {
        const key = category.id;
        if (categoryCount.has(key)) {
          categoryCount.set(key, categoryCount.get(key)! + 1);
        } else {
          categoryCount.set(key, 1);
        }
      });
    });

  return CATEGORIES.map((category) => ({
    ...category,
    count: categoryCount.get(category.id) || 0,
  })).sort((a, b) => b.count - a.count);
}

// ============================================
// STATISTICS
// ============================================
export function getBlogStats() {
  const publishedPosts = posts.filter((p) => p.published);
  const featuredPosts = publishedPosts.filter((p) => p.isFeatured);
  const totalViews = publishedPosts.reduce((sum, p) => sum + p.viewCount, 0);
  const totalLikes = publishedPosts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = publishedPosts.reduce(
    (sum, p) => sum + p.comments.length,
    0,
  );
  const uniqueAuthors = new Set(publishedPosts.map((p) => p.authorId)).size;

  return {
    totalPosts: publishedPosts.length,
    featuredPosts: featuredPosts.length,
    totalViews,
    totalLikes,
    totalComments,
    uniqueAuthors,
    lastUpdated: new Date(),
  };
}
