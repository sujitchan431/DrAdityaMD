import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site-config";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { BlogCard } from "@/components/shared/BlogCard";
import { getAllPosts } from "@/lib/blog";

export function ClinicStrip() {
  const clinic = siteConfig.clinic;
  return <section aria-label="Clinic details" className="border-y border-medical-200 bg-white"><Container className="grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
    <div><p className="eyebrow">Visit us</p><p className="mt-2 font-semibold">{clinic.name}</p><p className="text-sm text-gray-600">{clinic.address}</p></div>
    <div><p className="eyebrow">Listed clinic hours</p><p className="mt-2 font-semibold">{clinic.hours.time}</p><p className="text-sm text-gray-600">{clinic.hours.days} · Confirm your slot</p></div>
    <div><p className="eyebrow">Consultation</p><p className="mt-2 font-semibold">{clinic.consultationFee}</p><p className="text-sm text-gray-600">Ask the clinic about additional charges</p></div>
    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinic.name}, ${clinic.address}`)}`} target="_blank" rel="noopener noreferrer" className="self-center rounded-xl border border-medical-200 px-5 py-3 text-center font-semibold text-primary-700 hover:bg-primary-50">Get directions ↗</a>
  </Container></section>;
}

export function MeetDoctor() {
  return <section className="bg-white py-16 sm:py-20"><Container className="grid gap-10 lg:grid-cols-2">
    <div><p className="eyebrow">Meet your doctor</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Care starts with listening.</h2><p className="mt-5 text-lg leading-relaxed text-gray-600">Dr. Aditya Davhale combines clinical practice with his role as Assistant Professor at DY Patil University. His approach brings together careful assessment, clear explanations and practical treatment planning.</p><Link href="/about" className="mt-6 inline-block py-2 font-semibold text-primary-700 underline underline-offset-4">Explore qualifications and experience →</Link></div>
    <div className="rounded-2xl bg-medical-50 p-7 sm:p-9"><h3 className="text-xl font-semibold">A foundation in adult medicine</h3><ul className="mt-5 divide-y divide-medical-200">{[siteConfig.credentials, "Assistant Professor, DY Patil University", "Clinical Associate, Apollo Hospitals, Belapur", "Consultant Physician, Seawoods Hospital"].map(fact => <li key={fact} className="py-4 text-gray-700">{fact}</li>)}</ul></div>
  </Container></section>;
}

export function VisitGuide() {
  return <section className="bg-medical-900 py-16 text-white sm:py-20"><Container><p className="text-sm font-semibold uppercase tracking-wider text-primary-200">Your first visit</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">A clear path to your consultation.</h2><ol className="mt-10 grid gap-8 md:grid-cols-3">{[
    ["Request a time", "Share your preferred date on WhatsApp or call the clinic. The clinic will confirm availability and your appointment."],
    ["Bring your health history", "Carry recent reports, previous prescriptions and a list of medicines, allergies and questions."],
    ["Discuss your next steps", "Talk through your concerns, assessment and treatment plan, including any follow-up you may need."],
  ].map(([title, body], index) => <li key={title} className="border-t border-white/20 pt-6"><span className="text-sm text-primary-200">0{index + 1}</span><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-slate-300">{body}</p></li>)}</ol></Container></section>;
}

export async function PatientQuestionsAndArticles() {
  const posts = (await getAllPosts()).slice(0, 3);
  const questions = [
    { question: "How do I request an appointment?", answer: "Use the appointment form to prepare a WhatsApp message, then send it to the clinic. You can also call directly. Your appointment is confirmed only after the clinic replies." },
    { question: "What should I bring?", answer: "Bring recent test reports, previous prescriptions, your current medicine list and any home readings you would like to discuss." },
    { question: "What are the fee and timings?", answer: `The listed consultation fee is ${siteConfig.clinic.consultationFee}. Listed clinic hours are ${siteConfig.clinic.hours.days}, ${siteConfig.clinic.hours.time}. Please confirm your consultation time and any additional charges with the clinic.` },
    { question: "How do I arrange a follow-up?", answer: "Contact the clinic with your previous visit details to ask about a follow-up appointment, availability and fees." },
  ];
  return <><section className="bg-white py-16 sm:py-20"><Container className="max-w-3xl"><h2 className="mb-8 text-3xl font-bold tracking-tight">Before you book</h2><FAQAccordion items={questions} /></Container></section>
    {posts.length > 0 && <section className="bg-[#f7f8f5] py-16 sm:py-20"><Container><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Health, explained</p><h2 className="mt-3 text-3xl font-bold">Helpful reading for everyday health</h2></div><Link href="/blog" className="py-2 font-semibold text-primary-700 underline underline-offset-4">All health articles →</Link></div><div className="mt-8 grid gap-6 md:grid-cols-3">{posts.map(post => <BlogCard key={post.slug} {...post} />)}</div></Container></section>}</>;
}
