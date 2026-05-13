import { siteConfig } from "@/content/site-config";

export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.clinic.name,
    description: `${siteConfig.name} - ${siteConfig.title}`,
    url: siteConfig.url,
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
    openingHours: "Mo-Su 19:00-22:00",
    priceRange: siteConfig.clinic.consultationFee,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.clinic.geo.latitude,
      longitude: siteConfig.clinic.geo.longitude,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
