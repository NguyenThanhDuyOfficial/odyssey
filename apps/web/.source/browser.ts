// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"faq.mdx": () => import("../src/content/docs/faq.mdx?collection=docs"), "index.mdx": () => import("../src/content/docs/index.mdx?collection=docs"), "discord/discord.mdx": () => import("../src/content/docs/discord/discord.mdx?collection=docs"), "odyssey/channel.mdx": () => import("../src/content/docs/odyssey/channel.mdx?collection=docs"), "odyssey/odyssey.mdx": () => import("../src/content/docs/odyssey/odyssey.mdx?collection=docs"), }),
};
export default browserCollections;