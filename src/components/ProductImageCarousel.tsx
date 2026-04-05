"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageCarouselProps = {
  images: string[];
  name: string;
};

const formatSlideCount = (value: number) => String(value).padStart(2, "0");

export default function ProductImageCarousel({
  images,
  name,
}: ProductImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalImages = images.length;
  const currentImage = images[activeIndex];

  const moveToSlide = (nextIndex: number) => {
    if (totalImages === 0) {
      return;
    }

    const wrappedIndex = (nextIndex + totalImages) % totalImages;
    setActiveIndex(wrappedIndex);
  };

  if (totalImages === 0) {
    return (
      <div className="relative flex min-h-88 items-center justify-center overflow-hidden rounded-4xl border border-[#7bbf42]/20 bg-linear-to-br from-[#eff7df] via-[#f7f2e8] to-[#dcebc6] p-6 text-center shadow-[0_18px_50px_rgba(30,58,15,0.12)] sm:min-h-110 sm:p-8">
        <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-[#cfe7b0]/50 blur-3xl" />
        <div className="relative max-w-sm space-y-3">
          <span className="section-tag">Gallery</span>
          <h3 className="text-3xl text-[#1e3a0f]">Images coming soon</h3>
          <p className="text-sm leading-7 wrap-break-word text-[#4b5f3d] md:text-base">
            {name} will appear here once the product gallery is uploaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative min-h-88 overflow-hidden rounded-4xl border border-[#7bbf42]/20 bg-[#eff6df] shadow-[0_18px_50px_rgba(30,58,15,0.12)] sm:min-h-110">
        <div className="pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-[#badf8a]/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-[#e8d8b5]/55 blur-3xl" />

        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/50 bg-white/75 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#2d5a1b] uppercase backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
          Product Gallery
        </div>

        <div className="absolute right-4 top-4 z-10 rounded-full border border-white/50 bg-[#1e3a0f]/70 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm sm:right-5 sm:top-5 sm:text-xs">
          {formatSlideCount(activeIndex + 1)} / {formatSlideCount(totalImages)}
        </div>

        <div className="relative h-88 w-full sm:h-110 md:h-135">
          <Image
            key={currentImage}
            src={currentImage}
            alt={`${name} image ${activeIndex + 1}`}
            fill
            className="object-cover"
            priority={activeIndex === 0}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[#1e3a0f]/68 via-[#1e3a0f]/32 to-transparent px-4 pb-4 pt-8 sm:px-5">
          <p className="text-sm font-semibold leading-6 wrap-break-word text-white sm:text-base">
            {name}
          </p>
        </div>

        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={() => moveToSlide(activeIndex - 1)}
              className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white/80 text-lg text-[#1e3a0f] shadow-[0_10px_30px_rgba(30,58,15,0.16)] transition hover:scale-[1.03] hover:bg-white sm:left-4 sm:h-12 sm:w-12 sm:text-xl"
              aria-label="Show previous image"
            >
              &lt;
            </button>

            <button
              type="button"
              onClick={() => moveToSlide(activeIndex + 1)}
              className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white/80 text-lg text-[#1e3a0f] shadow-[0_10px_30px_rgba(30,58,15,0.16)] transition hover:scale-[1.03] hover:bg-white sm:right-4 sm:h-12 sm:w-12 sm:text-xl"
              aria-label="Show next image"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {totalImages > 1 && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:gap-3">
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => moveToSlide(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition sm:h-24 sm:w-24 md:h-28 md:w-28 ${
                    isActive
                      ? "border-[#4a8c28] ring-2 ring-[#cce7ae]"
                      : "border-[#7bbf42]/20 opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={isActive}
                >
                  <Image
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2">
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-dot-${index}`}
                  type="button"
                  onClick={() => moveToSlide(index)}
                  className={`h-2.5 rounded-full transition ${
                    isActive
                      ? "w-8 bg-[#4a8c28]"
                      : "w-2.5 bg-[#b8c89d] hover:bg-[#7bbf42]"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
