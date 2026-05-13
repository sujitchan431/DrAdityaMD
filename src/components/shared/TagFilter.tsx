"use client";

import { BLOG_CATEGORIES } from "@/lib/constants";

export function TagFilter({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
          selected === null
            ? "bg-primary-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
            selected === cat.slug
              ? "bg-primary-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
