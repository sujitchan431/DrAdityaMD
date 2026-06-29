import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-medical-50">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-medical-900">
              {siteConfig.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{siteConfig.title}</p>
            <p className="mt-1 text-sm text-gray-500">{siteConfig.credentials}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Quick Links
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Clinic Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Clinic
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>{siteConfig.clinic.name}</p>
              <p>{siteConfig.clinic.address}</p>
              <p>
                {siteConfig.clinic.hours.days}: {siteConfig.clinic.hours.time}
              </p>
              <p>Consultation Fee: {siteConfig.clinic.consultationFee}</p>
              <p>
                <a
                  href={`tel:${siteConfig.clinic.phoneRaw}`}
                  className="transition-colors hover:text-primary-600"
                >
                  {siteConfig.clinic.phone}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#1ebe5b] transition-colors hover:underline"
                >
                  WhatsApp Appointment
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.clinic.email}`}
                  className="break-all transition-colors hover:text-primary-600"
                >
                  {siteConfig.clinic.email}
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Legal
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 transition-colors hover:text-primary-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 transition-colors hover:text-primary-600"
              >
                Terms & Medical Disclaimer
              </Link>
              <Link
                href="/appointment"
                className="text-sm text-gray-600 transition-colors hover:text-primary-600"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved. The content on this website is for informational purposes
            only and is not a substitute for professional medical advice,
            diagnosis, or treatment.
          </p>
        </div>
      </Container>
    </footer>
  );
}
