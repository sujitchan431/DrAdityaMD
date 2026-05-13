import Link from "next/link";

interface CTASectionProps {
  heading: string;
  body: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "primary" | "light";
}

export function CTASection({
  heading,
  body,
  primaryCTA,
  secondaryCTA,
  variant = "primary",
}: CTASectionProps) {
  const isPrimary = variant === "primary";

  return (
    <section
      className={`py-16 ${
        isPrimary
          ? "bg-primary-600"
          : "bg-medical-50"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className={`text-2xl font-bold sm:text-3xl ${
            isPrimary ? "text-white" : "text-medical-900"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg ${
            isPrimary ? "text-primary-100" : "text-gray-600"
          }`}
        >
          {body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className={`rounded-lg px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:shadow-md ${
              isPrimary
                ? "bg-white text-primary-600 hover:bg-primary-50"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={`rounded-lg px-6 py-3 text-sm font-semibold border transition-all ${
                isPrimary
                  ? "border-white text-white hover:bg-white/10"
                  : "border-primary-600 text-primary-600 hover:bg-primary-50"
              }`}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
