"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TagFilter } from "@/components/shared/TagFilter";
import { useCallback } from "react";

export function BlogTagFilter({ selected }: { selected: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) params.set("tag", tag);
      else params.delete("tag");
      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `/blog?${qs}` : "/blog");
    },
    [router, searchParams]
  );

  return <TagFilter selected={selected} onSelect={handleSelect} />;
}
