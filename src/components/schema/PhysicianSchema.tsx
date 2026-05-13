import { siteConfig } from "@/content/site-config";

export function PhysicianSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteConfig.fullName,
    image: `${siteConfig.url}/images/dr-aditya-davhale.svg`,
    description: siteConfig.fullBio,
    medicalSpecialty: [
      "Internal Medicine",
      "General Practice",
      "Diabetes Management",
      "Hypertension",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.clinic.address,
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: siteConfig.clinic.postalCode,
      addressCountry: "IN",
    },
    telephone: siteConfig.clinic.phone,
    email: siteConfig.clinic.email,
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "TNMC & BYL Nair Hospital, Mumbai",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "DY Patil University, Navi Mumbai",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
