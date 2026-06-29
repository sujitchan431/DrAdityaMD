import { siteConfig } from "@/content/site-config";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  lastReviewed?: string;
  slug: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  lastReviewed,
  slug,
  keywords,
  wordCount,
  articleSection,
  authorName,
}: ArticleSchemaProps) {
  const url = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  // Author as a credentialed medical professional (E-E-A-T).
  const author = {
    "@type": "Person",
    name: authorName || siteConfig.fullName,
    jobTitle: siteConfig.title,
    description: siteConfig.shortBio,
    url: `${siteConfig.url}/about`,
    image: `${siteConfig.url}/images/dr-aditya-davhale.jpg`,
    knowsAbout: siteConfig.specialties,
    sameAs: [siteConfig.social.whatsapp],
  };

  // MedicalWebPage + Article hybrid: stronger trust signal for health content,
  // and "speakable" makes the answer-first intro eligible for voice / AI answers.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    headline: title,
    name: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    lastReviewed: lastReviewed || dateModified || datePublished,
    inLanguage: "en-IN",
    isFamilyFriendly: true,
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
    ...(articleSection ? { articleSection } : {}),
    ...(wordCount ? { wordCount } : {}),
    author,
    reviewedBy: author,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/og/default-og.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose p:first-of-type"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
