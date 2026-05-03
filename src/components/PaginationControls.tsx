"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "@/src/hooks/useTranslation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControls({ totalPages, currentPage }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useTranslation();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-full border border-[#7bbf42]/35 bg-white px-5 py-2 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
        >
          {language === "en" ? "Previous" : "अघिल्लो"}
        </Link>
      ) : (
        <button
          disabled
          className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-400 cursor-not-allowed"
        >
          {language === "en" ? "Previous" : "अघिल्लो"}
        </button>
      )}

      <div className="flex items-center gap-1 mx-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
              page === currentPage
                ? "bg-[#4a8c28] text-white shadow-md"
                : "text-[#2d5a1b] hover:bg-[#eaf4d8]"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-full border border-[#7bbf42]/35 bg-white px-5 py-2 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
        >
          {language === "en" ? "Next" : "अर्को"}
        </Link>
      ) : (
        <button
          disabled
          className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-400 cursor-not-allowed"
        >
          {language === "en" ? "Next" : "अर्को"}
        </button>
      )}
    </div>
  );
}
