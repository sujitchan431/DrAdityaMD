import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { type ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import matter from "gray-matter";
import type { MDXComponents } from "mdx/types";
import { useMDXComponents } from "../../mdx-components";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getPostContent(
  slug: string
): Promise<ComponentType> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  const { default: Content } = await evaluate(content, {
    ...runtime,
    baseUrl: pathToFileURL(filePath).href,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  const components = useMDXComponents({});
  const MDXContent = Content as ComponentType<{ components?: MDXComponents }>;

  return function BlogPostContent() {
    return <MDXContent components={components} />;
  };
}
