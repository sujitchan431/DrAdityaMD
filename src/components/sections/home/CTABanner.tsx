import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/shared/CTASection";
import { siteConfig } from "@/content/site-config";

export function CTABanner() {
  return (
    <section className="bg-primary-600 py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Book a consultation with {siteConfig.name} at Seawoods Hospital,
            Navi Mumbai. Evidence-based care, personalized treatment, and a
            commitment to your long-term wellness.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/appointment"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm transition-all hover:bg-primary-50 hover:shadow-md"
            >
              Book Appointment
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
