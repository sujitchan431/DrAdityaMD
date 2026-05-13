import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/content/services";

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="bg-medical-50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-medical-900 sm:text-4xl">
            Conditions We Treat
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive internal medicine care for a wide range of acute and
            chronic conditions.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.shortDescription}
              icon={service.icon}
              href={`/services#${service.id}`}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
          >
            View All 12 Services
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
