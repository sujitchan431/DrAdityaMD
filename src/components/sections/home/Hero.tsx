import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site-config";

export function Hero() {
  return <section className="bg-[#f7f8f5]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-8">
    <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">Personal care. Clear answers.</p>
      <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Your Internal Medicine Specialist in <span className="text-primary-700">Navi Mumbai.</span></h1>
      <p className="mt-6 text-xl font-semibold">{siteConfig.name}</p><p className="mt-1 text-sm text-gray-600">{siteConfig.credentials}</p>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-600">Thoughtful, evidence-based care for diabetes, blood pressure, thyroid conditions and everyday health concerns.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/appointment" className="rounded-xl bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-800">Request an Appointment</Link><a href={`tel:${siteConfig.clinic.phoneRaw}`} className="rounded-xl border border-medical-200 bg-white px-6 py-3.5 text-sm font-semibold hover:bg-medical-50">Call the Clinic</a></div>
      <p className="mt-4 text-sm text-gray-600">Seawoods Hospital, Nerul · Your slot is confirmed by the clinic.</p>
    </div>
    <figure className="mx-auto w-full max-w-md"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary-100"><Image src="/images/dr-aditya-davhale.jpg" alt="Dr. Aditya Davhale, Consultant Physician" fill preload className="object-cover object-top" sizes="(max-width: 1024px) 90vw, 448px" /></div><figcaption className="mt-4 text-sm text-gray-600">Consultant Physician · Internal Medicine</figcaption></figure>
  </div></section>;
}
