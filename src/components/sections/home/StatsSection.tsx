import { Container } from "@/components/layout/Container";
import { StatsCounter } from "@/components/shared/StatsCounter";
import { siteConfig } from "@/content/site-config";

export function StatsSection() {
  const stats = [
    { value: siteConfig.stats.yearsExperience, suffix: "+", label: "Years Experience" },
    { value: 50000, suffix: "+", label: "Patients Treated" },
    { value: 12, suffix: "+", label: "Services Offered" },
    { value: 98, suffix: "%", label: "Patient Satisfaction" },
  ];

  return (
    <section className="bg-white py-12">
      <Container>
        <StatsCounter stats={stats} />
      </Container>
    </section>
  );
}
