import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-200"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-medical-900 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
        Learn more
        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
