"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";

type TeamMemberItem = {
  id: number;
  name: string | LocalizedText;
  role: string | LocalizedText;
  description: string | LocalizedText;
  imageUrl: string;
};

type TeamMembersCarouselProps = {
  members: TeamMemberItem[];
};

const getCardsPerSlide = (width: number) => {
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
};

export default function TeamMembersCarousel({
  members,
}: TeamMembersCarouselProps) {
  const { language } = useTranslation();
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(getCardsPerSlide(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(1, Math.ceil(members.length / cardsPerSlide));
  const safeActiveSlide = activeSlide >= totalSlides ? 0 : activeSlide;

  useEffect(() => {
    if (totalSlides <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  const visibleMembers = useMemo(() => {
    const start = safeActiveSlide * cardsPerSlide;
    return members.slice(start, start + cardsPerSlide);
  }, [cardsPerSlide, members, safeActiveSlide]);

  const goToPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  if (members.length === 0) {
    return (
      <div className="soft-panel p-8 text-center">
        <p className="text-sm leading-7 text-[#4b5f3d] md:text-base">
          {language === "en"
            ? "Team members will appear here once profiles are added."
            : "प्रोफाइल थपिएपछि टीम सदस्यहरू यहाँ देखिनेछन्।"}
        </p>
      </div>
    );
  }

  return (
    <div className="soft-panel p-6 md:p-8">
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: `repeat(${visibleMembers.length}, minmax(0, 1fr))`,
        }}
      >
        {visibleMembers.map((member) => {
          const memberName = pickLocalizedText(member.name, language);
          const memberRole = pickLocalizedText(member.role, language);
          const memberDescription = pickLocalizedText(
            member.description,
            language,
          );

          return (
            <article
              key={member.id}
              className="rounded-3xl border border-[#7bbf42]/20 bg-white p-6 shadow-[0_10px_30px_rgba(30,58,15,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#cce7ae] bg-[#eaf4d8]">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={memberName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-xl font-semibold text-[#2d5a1b]">
                      {memberName.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl leading-tight text-[#1e3a0f]">
                    {memberName}
                  </h3>
                  <p className="mt-1 text-sm font-semibold tracking-[0.08em] text-[#4a8c28] uppercase">
                    {memberRole}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#4b5f3d] md:text-base">
                {memberDescription}
              </p>
            </article>
          );
        })}
      </div>

      {totalSlides > 1 && (
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${
                  safeActiveSlide === index
                    ? "w-8 bg-[#4a8c28]"
                    : "w-2.5 bg-[#b8c89d] hover:bg-[#7bbf42]"
                }`}
                aria-label={`Go to team slide ${index + 1}`}
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
  );
}
