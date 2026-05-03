"use client";

import Image from "next/image";
import Link from "next/link";
import {
  pickLocalizedStringList,
  pickLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from "@/src/helpers/i18n";
import { useTranslation } from "@/src/hooks/useTranslation";

const PRODUCT_CARD_FEATURE_LIMIT = 3;
const PRODUCT_CONTENT_MAX_CHARS = 140;

const truncateWithEllipsis = (value: string, maxChars: number) => {
  const normalized = value.trim();

  if (normalized.length <= maxChars) {
    return normalized;
  }

  return `${normalized.slice(0, maxChars).trimEnd()}...`;
};

interface ProductCardProps {
  id: number;
  name: string | LocalizedText;
  content: string | LocalizedText;
  features: string[] | LocalizedStringList;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({
  id,
  name,
  content,
  features,
  price,
  imageUrl,
}: ProductCardProps) {
  const { language } = useTranslation();
  const localizedName = pickLocalizedText(name, language);
  const localizedContent = pickLocalizedText(content, language);
  const localizedFeatures = pickLocalizedStringList(features, language);

  const previewContent = truncateWithEllipsis(
    localizedContent,
    PRODUCT_CONTENT_MAX_CHARS,
  );
  const previewFeatures = localizedFeatures.slice(
    0,
    PRODUCT_CARD_FEATURE_LIMIT,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-[#7bbf42]/18 bg-[#f2f2eb] shadow-[0_14px_28px_rgba(30,58,15,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(30,58,15,0.14)]">
      <Link href={`/products/${id}`} className="flex h-full flex-1 flex-col">
        <div className="relative shrink-0 h-48 sm:h-52 bg-[#dbe7c7]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={localizedName}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#5a7d45]">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-content-center rounded-2xl border border-[#7bbf42]/35 bg-white/55 text-xl sm:text-2xl">
                □
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                {language === "en" ? "Product Image" : "उत्पादन चित्र"}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col bg-[#fdfdfc] p-4 sm:p-5 md:p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl leading-[1.15] text-[#1e3a0f]">
            {localizedName}
          </h3>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed sm:leading-8 text-[#4b5f3d]">
            {previewContent ||
              (language === "en"
                ? "High-performance organic support for poultry health."
                : "कुखुराको स्वास्थ्यका लागि उच्च-प्रदर्शन जैविक सहयोग।")}
          </p>
          <div className="mt-auto pt-4 sm:pt-5 md:pt-6">
            <p className="text-sm font-semibold tracking-wide text-[#4a8c28] uppercase">
              {language === "en" ? "NPR" : "रु."} {price.toLocaleString()}
            </p>

            <span className="mt-2 inline-flex w-full items-center justify-center rounded-full border-2 border-[#4a8c28] px-4 py-2.5 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]">
              {language === "en" ? "View Details" : "विवरण हेर्नुहोस्"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
