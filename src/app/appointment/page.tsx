import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { BookingForm } from "@/components/sections/appointment/BookingForm";
import { ClinicInfo } from "@/components/sections/appointment/ClinicInfo";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a consultation with Dr. Aditya Davhale at Seawoods Hospital, Nerul, Navi Mumbai. Evening consultations available Monday to Sunday. Consultation fee ₹800.",
  alternates: { canonical: "/appointment" },
};

export default function AppointmentPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Book Appointment", item: "/appointment" },
  ];

  return (
    <>
      <LocalBusinessSchema />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Schedule a consultation with Dr. Aditya Davhale at Seawoods Hospital,
            Navi Mumbai. Evening consultations available every day.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe5b] hover:shadow-md"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Book Instantly on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.clinic.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-600 px-6 py-3 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50"
            >
              Call {siteConfig.clinic.phone}
            </a>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Prefer a form? Fill it in below and we&apos;ll open WhatsApp with your details ready to send.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BookingForm />
          </div>
          <div className="lg:col-span-2">
            <ClinicInfo />
          </div>
        </div>
      </Container>
    </>
  );
}
