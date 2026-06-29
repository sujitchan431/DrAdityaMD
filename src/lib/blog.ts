import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  /** ISO date of last meaningful update — used for freshness signals & schema. */
  dateModified: string;
  /** ISO date the medical content was last reviewed (E-E-A-T). */
  lastReviewed: string;
  author: string;
  excerpt: string;
  /** Optional SEO <title>, distinct from the on-page H1. Falls back to title. */
  metaTitle?: string;
  /** Optional meta description, distinct from excerpt. Falls back to excerpt. */
  description?: string;
  /** Target keywords for this post (primary first). */
  keywords: string[];
  tags: string[];
  image: string;
  readingTime: number;
  wordCount: number;
  faq?: Array<{ question: string; answer: string }>;
}

export interface Post extends PostMeta {
  content: string;
}

function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

/** Normalize a frontmatter field that may be a string, array, or undefined. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

function parsePost(filePath: string, slug: string): Post | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.title || !data.date) return null;

    const words = countWords(content);
    const keywords = toStringArray(data.keywords);
    const tags = toStringArray(data.tags);

    return {
      slug,
      title: data.title,
      date: data.date,
      dateModified: data.dateModified || data.date,
      lastReviewed: data.lastReviewed || data.dateModified || data.date,
      author: data.author || "Dr. Aditya Davhale",
      excerpt: data.excerpt || "",
      metaTitle: data.metaTitle || undefined,
      description: data.description || undefined,
      keywords: keywords.length ? keywords : tags,
      tags,
      image: data.image || "/images/og/default-og.svg",
      readingTime: Math.max(1, Math.ceil(words / 200)),
      wordCount: words,
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
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
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
