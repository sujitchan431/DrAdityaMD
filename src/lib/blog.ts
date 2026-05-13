import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  image: string;
  readingTime: number;
  faq?: Array<{ question: string; answer: string }>;
}

export interface Post extends PostMeta {
  content: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function parsePost(filePath: string, slug: string): Post | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.title || !data.date) return null;

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || "Dr. Aditya Davhale",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      image: data.image || "/images/og/default-og.svg",
      readingTime: calculateReadingTime(content),
      faq: data.faq || undefined,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, file);
      return parsePost(filePath, slug);
    })
    .filter((p): p is Post => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath, slug);
}

export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  return getPost(slug);
}

export async function searchPosts(query: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  if (!query) return posts;

  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  if (!tag || tag === "all") return posts;
  return posts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getPaginatedPosts(
  page: number,
  perPage: number
): Promise<{ posts: PostMeta[]; totalPages: number }> {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    totalPages,
  };
}

export async function getHeadings(
  slug: string
): Promise<Array<{ id: string; text: string; level: number }>> {
  const post = await getPost(slug);
  if (!post) return [];

  const headings: Array<{ id: string; text: string; level: number }> = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(post.content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return posts.slice(0, limit);

  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aCommon = a.tags.filter((t) => current.tags.includes(t)).length;
      const bCommon = b.tags.filter((t) => current.tags.includes(t)).length;
      return bCommon - aCommon;
    })
    .slice(0, limit);
}
