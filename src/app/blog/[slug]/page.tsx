import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ReadingTime } from "@/components/shared/ReadingTime";
import { AuthorBox } from "@/components/shared/AuthorBox";
import { TableOfContents } from "@/components/shared/TableOfContents";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { BlogCard } from "@/components/shared/BlogCard";
import { MedicalDisclaimer } from "@/components/mdx/MedicalDisclaimer";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { getPost, getAllPosts, getHeadings, getRelatedPosts } from "@/lib/blog";
import { getPostContent } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const metaDescription = post.description || post.excerpt;

  return {
    title: post.metaTitle || post.title,
    description: metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author, url: `${SITE_URL}/about` }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.metaTitle || post.title,
      description: metaDescription,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const headings = await getHeadings(slug);
  const relatedPosts = await getRelatedPosts(slug, 3);
  const Content = await getPostContent(slug);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${slug}` },
  ];

  const postUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description || post.excerpt}
        image={post.image}
        datePublished={post.date}
        dateModified={post.dateModified}
        lastReviewed={post.lastReviewed}
        slug={slug}
        keywords={post.keywords}
        wordCount={post.wordCount}
        articleSection={post.tags[0]}
        authorName={post.author}
      />
      {post.faq && <FAQSchema faqs={post.faq} />}

      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>By {post.author}</span>
              <span>·</span>
              <ReadingTime minutes={post.readingTime} />
            </div>
          </header>

          <div className="flex gap-10">
            {/* Sidebar with TOC */}
            {headings.length > 0 && (
              <aside className="hidden w-64 flex-shrink-0 lg:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}

            {/* Main content */}
            <div className="min-w-0 flex-1">
              <div className="prose prose-lg max-w-none">
                <Content />
              </div>

              <MedicalDisclaimer />

              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <ShareButtons url={postUrl} title={post.title} />
              </div>

              <AuthorBox />
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-bold text-medical-900 mb-6">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <BlogCard
                    key={rp.slug}
                    title={rp.title}
                    excerpt={rp.excerpt}
                    slug={rp.slug}
                    date={rp.date}
                    tags={rp.tags}
                    image={rp.image}
                    readingTime={rp.readingTime}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </>
  );
}
