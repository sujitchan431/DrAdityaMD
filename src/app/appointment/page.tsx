import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { BookingForm } from "@/components/sections/appointment/BookingForm";
import { ClinicInfo } from "@/components/sections/appointment/ClinicInfo";

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
