import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Dr. Aditya Davhale's website. Learn how we collect, use, and protect your personal and medical information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy" },
  ];

  const filePath = path.join(process.cwd(), "src/content/privacy.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbs} />
      <div className="prose prose-lg mx-auto max-w-3xl">
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/^# (.*)/gm, '<h1 class="text-3xl font-extrabold text-medical-900 sm:text-4xl mb-6">$1</h1>')
              .replace(/^## (.*)/gm, '<h2 class="text-2xl font-bold text-medical-900 mt-8 mb-4">$1</h2>')
              .replace(/^### (.*)/gm, '<h3 class="text-xl font-semibold text-medical-800 mt-6 mb-3">$1</h3>')
              .replace(/^- (.*)/gm, '<li class="ml-4 text-gray-700">$1</li>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/\n(?!<)/g, '<br/>'),
          }}
        />
      </div>
    </Container>
  );
}
