import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function MobileBookingBar() {
  return <nav aria-label="Quick appointment actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_2fr] gap-3 border-t border-medical-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden">
    <a href={`tel:${siteConfig.clinic.phoneRaw}`} className="rounded-xl border border-medical-200 px-3 py-3 text-center text-sm font-semibold text-medical-900">Call Clinic</a>
    <Link href="/appointment" className="rounded-xl bg-primary-700 px-3 py-3 text-center text-sm font-semibold text-white">Request Appointment</Link>
  </nav>;
}
