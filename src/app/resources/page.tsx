import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Patient Education Resources",
  description:
    "Free patient education resources covering diabetes management, hypertension, thyroid health, nutrition, diagnostic tests, and preventive healthcare.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Patient Resources", item: "/resources" },
  ];

  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">
          Patient Education Resources
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Free educational materials to help you understand your health better.
          These resources complement, but do not replace, professional medical
          consultation.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {categories.map((category) => {
          const catResources = resources.filter((r) => r.category === category);
          return (
            <div key={category}>
              <h2 className="text-xl font-bold text-medical-900 mb-6">
                {category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-3 text-3xl">{resource.icon}</div>
                    <h3 className="text-lg font-semibold text-medical-900">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16">
        <CTASection
          heading="Want Personalized Medical Guidance?"
          body="Educational resources are a great start, but nothing replaces a one-on-one consultation with a qualified physician."
          primaryCTA={{ label: "Book Appointment", href: "/appointment" }}
          variant="light"
        />
      </div>
    </Container>
  );
}
