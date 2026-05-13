import { type ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export async function getPostContent(
  slug: string
): Promise<ComponentType> {
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  return Content;
}
