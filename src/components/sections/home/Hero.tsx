"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-medical-50 via-white to-primary-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-medical-900 sm:text-4xl lg:text-5xl">
              Internal Medicine & Preventive Healthcare{" "}
              <span className="text-primary-600">with Compassion and Precision</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {siteConfig.name} provides evidence-based treatment for diabetes,
              hypertension, thyroid disorders, infections, and chronic lifestyle
              diseases in Navi Mumbai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/appointment"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
              >
                Book Appointment
              </Link>
              <Link
                href="/blog"
                className="rounded-lg border border-primary-600 px-6 py-3 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50"
              >
                Read Health Articles
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {siteConfig.credentials}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {siteConfig.stats.yearsExperience}+ Years Experience
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-primary-100">
              <Image
                src="/images/dr-aditya-davhale.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
