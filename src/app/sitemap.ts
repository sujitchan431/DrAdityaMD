import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/appointment`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/faqs`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/resources`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
