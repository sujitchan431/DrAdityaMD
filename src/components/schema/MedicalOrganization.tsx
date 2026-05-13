import { siteConfig } from "@/content/site-config";

export function MedicalOrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og/default-og.svg`,
    description: siteConfig.shortBio,
    medicalSpecialty: ["Internal Medicine", "General Practice"],
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
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
      siteConfig.social.practo,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
