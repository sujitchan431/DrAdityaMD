import { Container } from "@/components/layout/Container";
import { StatsCounter } from "@/components/shared/StatsCounter";
import { siteConfig } from "@/content/site-config";

export function StatsSection() {
  const stats = [
    { value: siteConfig.stats.yearsExperience, suffix: "+", label: "Years in Medicine" },
    { value: siteConfig.hospitals.length, suffix: "", label: "Hospital Affiliations" },
    { value: siteConfig.specialties.length, suffix: "", label: "Core Specialties" },
    { value: 3, suffix: "", label: "Languages Spoken" },
  ];

  return (
    <section className="bg-white py-12">
      <Container>
        <StatsCounter stats={stats} />
      </Container>
    </section>
  );
}
