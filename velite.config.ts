import { defineConfig, s, defineCollection } from 'velite'


const wikis = defineCollection({
  name: "wiki",
  pattern: 'wiki/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('wiki'),
      code: s.mdx(),
    })
    .transform(data => ({ ...data, permalink: `/wiki/${data.slug}` }))
})


export default defineConfig({
  collections: {
    wikis
  }
})
