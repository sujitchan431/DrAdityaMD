import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { Timeline } from "@/components/shared/Timeline";
import { HospitalAffiliations } from "@/components/sections/about/HospitalAffiliations";
import { PhysicianSchema } from "@/components/schema/PhysicianSchema";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About Dr. Aditya Davhale",
  description:
    "Dr. Aditya Davhale is a Consultant General Physician & Internal Medicine Specialist in Navi Mumbai with MBBS, MD, and DNB qualifications. Learn about his journey, qualifications, and approach to patient care.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "About", item: "/about" },
  ];

  return (
    <>
      <PhysicianSchema />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">
              About {siteConfig.name}
            </h1>
            <p className="mt-2 text-lg text-primary-600">{siteConfig.title}</p>

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              {siteConfig.fullBio.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {siteConfig.stats.keyFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-lg border border-primary-100 bg-primary-50 p-3 text-center text-sm font-medium text-primary-700"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:h-80 sm:w-80">
                <Image
                  src="/images/dr-aditya-professional.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>

              <div className="mt-4 relative h-48 overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/dr-aditya-consulting.jpg"
                  alt={`${siteConfig.name} consulting a patient`}
                  fill
                  className="object-cover object-center"
                  sizes="320px"
                />
              </div>

              <div className="mt-6 rounded-xl border border-gray-100 bg-medical-50 p-6">
                <h3 className="text-lg font-semibold text-medical-900">
                  Quick Facts
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>Qualifications:</strong> {siteConfig.credentials}
                  </li>
                  <li>
                    <strong>Experience:</strong> {siteConfig.stats.yearsExperience}+ Years
                  </li>
                  <li>
                    <strong>Clinic:</strong> {siteConfig.clinic.name}
                  </li>
                  <li>
                    <strong>Location:</strong> {siteConfig.clinic.address}
                  </li>
                  <li>
                    <strong>Hours:</strong> {siteConfig.clinic.hours.days},{" "}
                    {siteConfig.clinic.hours.time}
                  </li>
                  <li>
                    <strong>Fee:</strong> {siteConfig.clinic.consultationFee}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <HospitalAffiliations />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-medical-50 p-6">
            <h2 className="text-xl font-bold text-medical-900">Clinical Expertise</h2>
            <ul className="mt-4 space-y-2">
              {siteConfig.expertise.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-medical-50 p-6">
            <h2 className="text-xl font-bold text-medical-900">Procedural Skills</h2>
            <ul className="mt-4 space-y-2">
              {siteConfig.procedures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-medical-900 text-center mb-10">
            Professional Journey
          </h2>
          <Timeline items={siteConfig.timeline} />
        </div>

        <div className="mt-16">
          <CTASection
            heading="Schedule a Consultation"
            body="Experience evidence-based internal medicine care tailored to your health needs."
            primaryCTA={{ label: "Book Appointment", href: "/appointment" }}
            variant="light"
          />
        </div>
      </Container>
    </>
  );
}
