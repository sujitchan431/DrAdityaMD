import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { CTASection } from "@/components/shared/CTASection";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about internal medicine, appointments with Dr. Aditya Davhale, treatment approaches, and preventive healthcare in Navi Mumbai.",
  alternates: { canonical: "/faqs" },
};

export default function FAQsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "FAQs", item: "/faqs" },
  ];

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl text-center">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-center text-lg text-gray-600">
            Answers to common questions about our medical services,
            appointments, and treatments.
          </p>

          <div className="mt-12 space-y-10">
            {categories.map((category) => {
              const categoryFaqs = faqs.filter((f) => f.category === category);
              return (
                <div key={category}>
                  <h2 className="text-xl font-bold text-medical-900 mb-2">
                    {category}
                  </h2>
                  <FAQAccordion items={categoryFaqs} />
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <CTASection
              heading="Still Have Questions?"
              body="We are happy to help. Contact us or book an appointment to discuss your health concerns with Dr. Aditya Davhale."
              primaryCTA={{ label: "Book Appointment", href: "/appointment" }}
              variant="light"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
