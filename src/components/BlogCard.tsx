"use client";

import Image from "next/image";
import Link from "next/link";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";
import { useTranslation } from "@/src/hooks/useTranslation";

interface BlogCardProps {
  id: number;
  title: string | LocalizedText;
  description: string | LocalizedText;
  imageUrl?: string;
  createdAt: string | Date;
}

export default function BlogCard({
  id,
  title,
  description,
  imageUrl,
  createdAt,
}: BlogCardProps) {
  const { language } = useTranslation();
  const localizedTitle = pickLocalizedText(title, language);
  const localizedDescription = pickLocalizedText(description, language);

  const dateLabel = new Date(createdAt).toLocaleDateString(
    language === "ne" ? "ne-NP" : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <article className="group hover:scale-105 transition duration-200 soft-panel overflow-hidden">
      <Link href={`/blogs/${id}`} className="block">
        <div className="relative h-52 bg-linear-to-br from-[#dcebc6] via-[#ecf6dd] to-[#f8f3e9]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={localizedTitle}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold tracking-wide text-[#3f5e2d] uppercase">
              {language === "en" ? "NaturePure Story" : "नेचरप्योर कथा"}
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#4a8c28] uppercase">
            {dateLabel}
          </p>
          <h3 className="mt-2 line-clamp-2 text-2xl text-[#1e3a0f]">
            {localizedTitle}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#4b5f3d]">
            {localizedDescription}
          </p>
          <span className="mt-5 hover:bg-gray-200 transition duration-200 inline-flex rounded-full border border-[#7bbf42]/35 px-3 py-1 text-xs font-semibold text-[#2d5a1b]">
            {language === "en" ? "Read Article" : "लेख पढ्नुहोस्"}
          </span>
        </div>
      </Link>
    </article>
  );
}
