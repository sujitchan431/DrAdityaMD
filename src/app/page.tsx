import type { Metadata } from "next";
import { MedicalOrganizationSchema } from "@/components/schema/MedicalOrganization";
import { Hero } from "@/components/sections/home/Hero";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Dr. Aditya Davhale | Consultant Physician & Internal Medicine Specialist | Navi Mumbai",
  description:
    "Dr. Aditya Davhale is a Consultant General Physician & Internal Medicine Specialist in Navi Mumbai, providing evidence-based treatment for diabetes, hypertension, thyroid disorders, and chronic lifestyle diseases.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <MedicalOrganizationSchema />
      <Hero />
      <StatsSection />
      <ServicesPreview />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
