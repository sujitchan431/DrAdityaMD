import { Container } from "@/components/layout/Container";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-medical-900 sm:text-4xl">
            What Patients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Trusted by patients across Navi Mumbai for compassionate and
            evidence-based medical care.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <TestimonialCard testimonials={testimonials} />
        </div>
      </Container>
    </section>
  );
}
