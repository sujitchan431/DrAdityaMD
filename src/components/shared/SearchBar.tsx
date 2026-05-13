"use client";

import { useState, useEffect, useRef } from "react";

export function SearchBar({
  onSearch,
  defaultValue = "",
}: {
  onSearch: (query: string) => void;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [value, onSearch]);

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
      />
    </div>
  );
}
