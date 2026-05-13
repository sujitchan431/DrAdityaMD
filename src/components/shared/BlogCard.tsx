import Link from "next/link";
import Image from "next/image";
import { ReadingTime } from "@/components/shared/ReadingTime";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  image?: string;
  readingTime: number;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  date,
  tags,
  image,
  readingTime,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{formatDate(date)}</span>
          <span>·</span>
          <ReadingTime minutes={readingTime} />
        </div>
        <h3 className="mt-2 text-lg font-semibold text-medical-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
