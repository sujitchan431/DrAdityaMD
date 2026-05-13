import Link from "next/link";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

interface BreadcrumbItem {
  name: string;
  item: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <BreadcrumbListSchema items={items} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.item} className="flex items-center gap-1">
                {index > 0 && (
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-900 font-medium">{item.name}</span>
                ) : (
                  <Link
                    href={item.item}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
