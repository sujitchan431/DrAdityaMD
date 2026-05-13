"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/shared/SearchBar";
import { useCallback } from "react";

export function BlogSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQ = searchParams.get("q") || "";

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) params.set("q", query);
      else params.delete("q");
      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `/blog?${qs}` : "/blog");
    },
    [router, searchParams]
  );

  return <SearchBar onSearch={handleSearch} defaultValue={currentQ} />;
}
