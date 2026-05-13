import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTASection } from "@/components/shared/CTASection";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Medical Services & Conditions Treated",
  description:
    "Dr. Aditya Davhale offers comprehensive internal medicine care including diabetes management, hypertension treatment, thyroid care, infectious disease treatment, and preventive health checkups in Navi Mumbai.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">
          Medical Services & Conditions Treated
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Comprehensive internal medicine care for a wide range of conditions.
          Each service is delivered with evidence-based protocols and
          personalized attention.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.shortDescription}
            icon={service.icon}
            href={`/appointment`}
          />
        ))}
      </div>

      <div className="mt-20">
        {services.map((service) => (
          <section key={service.id} id={service.id} className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-medical-900">
              {service.title}
            </h2>
            <p className="mt-2 text-gray-600">{service.longDescription}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-medical-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Conditions Treated
                </h3>
                <ul className="mt-3 space-y-1">
                  {service.conditions.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-medical-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Key Benefits
                </h3>
                <ul className="mt-3 space-y-1">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 text-right">
              <a
                href="/appointment"
                className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Book a consultation for {service.title.toLowerCase()} →
              </a>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <CTASection
          heading="Need Expert Medical Care?"
          body="Book a consultation with Dr. Aditya Davhale at Seawoods Hospital, Navi Mumbai."
          primaryCTA={{ label: "Book Appointment", href: "/appointment" }}
          variant="light"
        />
      </div>
    </Container>
  );
}
