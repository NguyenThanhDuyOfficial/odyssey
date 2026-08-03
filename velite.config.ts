import { defineConfig, s, defineCollection } from "velite";

const wikis = defineCollection({
  name: "wiki",
  pattern: "wiki/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("wiki"),
      code: s.mdx(),
      priority: s.number(),
    })
    .transform((data) => ({ ...data, permalink: `/wiki/${data.slug}` })),
});

const blogs = defineCollection({
  name: "blog",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("blog"),
      code: s.mdx(),
      priority: s.number(),
    })
    .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
});

export default defineConfig({
  collections: {
    wikis,
    blogs,
  },
});
