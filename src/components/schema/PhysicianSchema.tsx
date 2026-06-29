import { siteConfig } from "@/content/site-config";

export function PhysicianSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteConfig.fullName,
    image: `${siteConfig.url}/images/dr-aditya-davhale.jpg`,
    description: siteConfig.fullBio,
    medicalSpecialty: [
      "Internal Medicine",
      "General Practice",
      "Diabetes Management",
      "Hypertension",
      "Critical Care Medicine",
      "Infectious Disease",
    ],
    hasCredential: siteConfig.stats.qualifications,
    knowsLanguage: ["English", "Hindi", "Marathi"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.clinic.address,
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: siteConfig.clinic.postalCode,
      addressCountry: "IN",
    },
    telephone: siteConfig.clinic.phoneRaw,
    email: siteConfig.clinic.email,
    url: siteConfig.url,
    sameAs: [siteConfig.social.whatsapp],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "TN Medical College & BYL Nair Hospital, Mumbai",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Dr. D. Y. Patil University, Navi Mumbai",
      },
    ],
    hospitalAffiliation: siteConfig.hospitals.map((hospital) => ({
      "@type": "Hospital",
      name: hospital.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: hospital.location,
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    })),
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Dr. D. Y. Patil University School of Medicine",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
