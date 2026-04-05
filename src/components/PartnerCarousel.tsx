"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";

type PartnerItem = {
  id: number;
  name: string | LocalizedText;
  imageUrl: string;
  description: string | LocalizedText;
};

type PartnerCarouselProps = {
  partners: PartnerItem[];
  className?: string;
};

const getItemsPerSlide = (width: number) => {
  if (width < 640) return 1;
  return 2;
};

export default function PartnerCarousel({
  partners,
  className,
}: PartnerCarouselProps) {
  const { language } = useTranslation();
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(1, Math.ceil(partners.length / itemsPerSlide));
  const safeActiveSlide = activeSlide >= totalSlides ? 0 : activeSlide;

  useEffect(() => {
    if (totalSlides <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  const visiblePartners = useMemo(() => {
    const start = safeActiveSlide * itemsPerSlide;
    return partners.slice(start, start + itemsPerSlide);
  }, [itemsPerSlide, partners, safeActiveSlide]);

  const goToPrev = () => {
    setActiveSlide(
      safeActiveSlide === 0 ? totalSlides - 1 : safeActiveSlide - 1,
    );
  };

  const goToNext = () => {
    setActiveSlide((safeActiveSlide + 1) % totalSlides);
  };

  if (partners.length === 0) {
    return (
      <div className="soft-panel p-8 text-center">
        <p className="text-sm leading-7 text-[#4b5f3d] md:text-base">
          {language === "en"
            ? "No partners available right now."
            : "अहिले कुनै साझेदार उपलब्ध छैनन्।"}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="soft-panel p-5 md:p-7">
        <div
          className="grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: `repeat(${visiblePartners.length}, minmax(0, 1fr))`,
          }}
        >
          {visiblePartners.map((partner) => {
            const partnerName = pickLocalizedText(partner.name, language);
            const partnerDescription = pickLocalizedText(
              partner.description,
              language,
            );

            return (
              <article
                key={partner.id}
                className="relative flex h-full flex-col items-center justify-start overflow-hidden rounded-3xl border border-[#7bbf42]/20 bg-linear-to-br from-white via-[#f7f2e8] to-[#eaf4d8] p-5 text-center shadow-[0_10px_28px_rgba(30,58,15,0.08)] md:p-6"
              >
                <Image
                  src={partner.imageUrl}
                  alt={partnerName}
                  width={170}
                  height={82}
                  className="max-h-16 rounded-2xl w-auto object-contain"
                />
                <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#4b5f3d] uppercase">
                  {partnerName}
                </p>

                <p className="mt-2 text-xs leading-6 wrap-break-word text-[#4b5f3d]/90 md:text-sm">
                  {partnerDescription}
                </p>
              </article>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition ${
                    activeSlide === index
                      ? "w-8 bg-[#4a8c28]"
                      : "w-2.5 bg-[#b8c89d] hover:bg-[#7bbf42]"
                  }`}
                  aria-label={`Go to partner slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={goToPrev}
                className="rounded-full border border-[#7bbf42]/30 bg-white px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#2d5a1b] uppercase transition hover:bg-[#eaf4d8]"
              >
                {language === "en" ? "Prev" : "अघिल्लो"}
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="rounded-full bg-[#4a8c28] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-[#2d5a1b]"
              >
                {language === "en" ? "Next" : "अर्को"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
