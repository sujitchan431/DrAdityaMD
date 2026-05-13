import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage = "/images/og/default-og.svg",
  ogType = "website",
  publishedTime,
  noIndex = false,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      type: ogType,
      publishedTime: ogType === "article" ? publishedTime : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function getDefaultOGImage(): string {
  return `${SITE_URL}/images/og/default-og.svg`;
}
