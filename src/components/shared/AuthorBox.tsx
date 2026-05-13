import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function AuthorBox() {
  return (
    <div className="my-12 rounded-xl border border-gray-200 bg-medical-50 p-6 flex flex-col sm:flex-row gap-4 items-start">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-primary-100">
        <Image
          src="/images/dr-aditya-davhale.svg"
          alt={siteConfig.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-medical-900">
          {siteConfig.name}
        </h4>
        <p className="text-sm text-gray-600">{siteConfig.credentials}</p>
        <p className="text-sm text-gray-500">{siteConfig.title}</p>
        <p className="mt-2 text-sm text-gray-600">{siteConfig.shortBio}</p>
        <Link
          href="/about"
          className="mt-3 inline-flex text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Full Profile →
        </Link>
      </div>
    </div>
  );
}
