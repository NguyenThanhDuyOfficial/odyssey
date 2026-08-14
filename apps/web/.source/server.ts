// @ts-nocheck
import * as __fd_glob_5 from "../src/content/docs/odyssey/odyssey.mdx?collection=docs"
import * as __fd_glob_4 from "../src/content/docs/odyssey/channel.mdx?collection=docs"
import * as __fd_glob_3 from "../src/content/docs/discord/discord.mdx?collection=docs"
import * as __fd_glob_2 from "../src/content/docs/index.mdx?collection=docs"
import * as __fd_glob_1 from "../src/content/docs/faq.mdx?collection=docs"
import { default as __fd_glob_0 } from "../src/content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "src/content/docs", {"meta.json": __fd_glob_0, }, {"faq.mdx": __fd_glob_1, "index.mdx": __fd_glob_2, "discord/discord.mdx": __fd_glob_3, "odyssey/channel.mdx": __fd_glob_4, "odyssey/odyssey.mdx": __fd_glob_5, });