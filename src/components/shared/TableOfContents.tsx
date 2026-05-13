"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-gray-200 bg-medical-50 p-4">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Table of Contents
      </h4>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(heading.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block rounded px-2 py-1 text-sm transition-colors ${
                activeId === heading.id
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
