import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/content/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-medical-900">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/appointment"
              className="hidden rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md lg:inline-flex"
            >
              Book Appointment
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
