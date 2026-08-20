import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BlogCard } from "@/components/shared/BlogCard";
import { Pagination } from "@/components/shared/Pagination";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { getAllPosts, searchPosts, getPostsByTag } from "@/lib/blog";
import { POSTS_PER_PAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Health Blog & Medical Articles",
  description:
    "Read evidence-based health articles by Dr. Aditya Davhale on diabetes, hypertension, thyroid, lifestyle diseases, nutrition, and preventive healthcare.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const tag = params.tag || null;
  const requestedPage = Number.parseInt(params.page || "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  let allMatchingPosts;
  if (query) {
    allMatchingPosts = await searchPosts(query);
  } else if (tag) {
    allMatchingPosts = await getPostsByTag(tag);
  } else {
    allMatchingPosts = await getAllPosts();
  }

  const totalPages = Math.max(1, Math.ceil(allMatchingPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allMatchingPosts.slice(start, start + POSTS_PER_PAGE);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">
          Health Blog & Medical Articles
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Evidence-based articles on internal medicine, lifestyle diseases,
          preventive health, and medical awareness by Dr. Aditya Davhale.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Suspense fallback={<div className="h-11 rounded-lg bg-gray-50" />}>
          <SearchBarWrapper />
        </Suspense>
        <Suspense fallback={<div className="h-9 rounded-lg bg-gray-50" />}>
          <TagFilterWrapper selected={tag} />
        </Suspense>
      </div>

      {posts.length === 0 ? (
        <div className="mt-16 text-center py-12">
          <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          <Link href="/blog" className="mt-4 inline-flex text-primary-600 text-sm font-medium hover:text-primary-700">
            Clear all filters →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.date}
              tags={post.tags}
              image={post.image}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            searchParams={
              query ? { q: query } : tag ? { tag } : {}
            }
          />
        </div>
      )}

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </Container>
  );
}

// Client component wrappers needed for interactivity
import { BlogSearchBar } from "./search-bar";
import { BlogTagFilter } from "./tag-filter";

function SearchBarWrapper() {
  return <BlogSearchBar />;
}

function TagFilterWrapper({ selected }: { selected: string | null }) {
  return <BlogTagFilter selected={selected} />;
}
