import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { type ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { MDXComponents } from "mdx/types";
import { useMDXComponents } from "../../mdx-components";
import { getPost } from "@/lib/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getPostContent(
  slug: string
): Promise<ComponentType> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const post = await getPost(slug);
  if (!post) {
    throw new Error(`Blog post metadata could not be parsed: ${slug}`);
  }

  const { default: Content } = await evaluate(post.content, {
    ...runtime,
    baseUrl: pathToFileURL(filePath).href,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  const MDXContent = Content as ComponentType<{ components?: MDXComponents }>;

  return function BlogPostContent() {
    const components = useMDXComponents({});
    return <MDXContent components={components} />;
  };
}
