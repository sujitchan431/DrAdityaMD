import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              {siteConfig.name}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{siteConfig.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)] opacity-75">{siteConfig.credentials}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Quick Links
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-primary-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Clinic Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Clinic
            </h4>
            <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <p>{siteConfig.clinic.name}</p>
              <p>{siteConfig.clinic.address}</p>
              <p>
                {siteConfig.clinic.hours.days}: {siteConfig.clinic.hours.time}
              </p>
              <p>Consultation Fee: {siteConfig.clinic.consultationFee}</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Legal
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-[var(--muted)] transition-colors hover:text-primary-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[var(--muted)] transition-colors hover:text-primary-400"
              >
                Terms & Medical Disclaimer
              </Link>
              <Link
                href="/appointment"
                className="text-sm text-[var(--muted)] transition-colors hover:text-primary-400"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="text-center text-xs text-[var(--muted)]">
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
