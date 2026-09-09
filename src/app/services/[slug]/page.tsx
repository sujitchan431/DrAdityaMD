import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { getAllPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.map((service) => ({ slug: service.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();
  return { title: `${service.title} in Navi Mumbai`, description: `${service.shortDescription} Consult Dr. Aditya Davhale at Seawoods Hospital, Nerul.`, alternates: { canonical: `/services/${slug}` } };
}

const articleTerms: Record<string, string[]> = {
  "diabetes-management": ["diabetes", "blood sugar", "hba1c"],
  "hypertension-treatment": ["hypertension", "blood pressure"],
  "thyroid-disorder-management": ["thyroid", "tsh"],
  "fever-infectious-disease-care": ["fever", "dengue", "infection"],
  "preventive-health-checkups": ["checkup", "screening", "preventive"],
  "lifestyle-disease-management": ["obesity", "fatty liver", "cholesterol"],
  "chronic-disease-monitoring": ["diabetes", "kidney", "hypertension"],
  "general-physician-consultation": ["physician", "fatigue", "headache"],
  "heart-health-monitoring": ["heart", "cholesterol", "blood pressure"],
  "kidney-disease-evaluation": ["kidney", "creatinine", "urinary"],
  "online-consultation": ["consultation", "report"],
  "health-counseling": ["sleep", "nutrition", "stress"],
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();
  const related = (await getAllPosts()).filter((post) => {
    const text = [post.title, ...post.tags, ...post.keywords].join(" ").toLowerCase();
    return (articleTerms[slug] || []).some((term) => text.includes(term));
  }).slice(0, 3);
  const faqs = [
    { question: `What does ${service.title.toLowerCase()} cover?`, answer: service.longDescription },
    { question: "What should I bring to my consultation?", answer: "Bring previous prescriptions, recent test reports, a list of current medicines and allergies, and any home readings relevant to your concern. You can also write down the questions you would like to discuss." },
    { question: "Where can I book, and what is the consultation fee?", answer: `Contact ${siteConfig.clinic.name} at ${siteConfig.clinic.phone}. The listed consultation fee is ${siteConfig.clinic.consultationFee}. Hours: ${siteConfig.clinic.hours.days}, ${siteConfig.clinic.hours.time}. The clinic will confirm your slot and any additional charges before your visit.` },
  ];
  return <Container className="py-12 sm:py-16">
    <Breadcrumbs items={[{ name: "Home", item: "/" }, { name: "Services", item: "/services" }, { name: service.title, item: `/services/${slug}` }]} />
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold text-primary-700">Seawoods Hospital · Nerul, Navi Mumbai</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl">{service.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-gray-600">{service.longDescription}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/appointment" className="rounded-lg bg-primary-700 px-5 py-3 font-semibold text-white">Request an appointment</Link>
        <a href={`tel:${siteConfig.clinic.phoneRaw}`} className="rounded-lg border border-primary-700 px-5 py-3 font-semibold text-primary-700">Call the clinic</a>
      </div>
      <section className="mt-10 rounded-xl border border-gray-200 bg-medical-50 p-6">
        <h2 className="text-2xl font-bold">Areas of care</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">{service.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">What to expect at your consultation</h2><p className="mt-4 leading-relaxed text-gray-600">Discuss your symptoms, medical history and current medicines with the doctor. Your assessment will guide whether tests, treatment changes or follow-up are appropriate. You can ask questions about the plan before you leave.</p><h2 className="mt-8 text-2xl font-bold">Preparing for your visit</h2>
        <p className="mt-4 leading-relaxed text-gray-600">Bring your recent reports and prescriptions, along with a list of concerns and questions. The consultation is an opportunity to discuss your history, current treatment, and next steps with Dr. Aditya Davhale.</p>
        <p className="mt-4 text-gray-600">{siteConfig.clinic.address}<br />{siteConfig.clinic.hours.days}: {siteConfig.clinic.hours.time}<br />Listed consultation fee: {siteConfig.clinic.consultationFee}. Appointments are confirmed by the clinic.</p>
      </section>
      <section className="mt-10"><h2 className="text-2xl font-bold">Frequently asked questions</h2><FAQAccordion items={faqs} /></section>
      {related.length > 0 && <section className="mt-10"><h2 className="text-2xl font-bold">Related health articles</h2><ul className="mt-4 space-y-3">{related.map((post) => <li key={post.slug}><Link className="font-medium text-primary-700 underline underline-offset-4" href={`/blog/${post.slug}`}>{post.title}</Link></li>)}</ul></section>}
      <Link href="/services" className="mt-10 inline-block text-primary-700 underline">View all medical services</Link>
    </div>
  </Container>;
}
