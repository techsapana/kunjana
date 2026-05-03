"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/src/hooks/useTranslation";
import { pickLocalizedText, type LocalizedText } from "@/src/helpers/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface GalleryImage {
  id: number;
  url: string;
  galleryId: number;
}

interface Gallery {
  id: number;
  title: string;
  titleI18n?: LocalizedText;
  images: GalleryImage[];
}

interface GalleryContentProps {
  initialGalleries: Gallery[];
}

export default function GalleryContent({ initialGalleries }: GalleryContentProps) {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);

  const galleries = initialGalleries;
  const loading = false;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGalleryTitle, setSelectedGalleryTitle] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const openLightbox = (imageUrl: string, galleryTitle: string) => {
    setSelectedImage(imageUrl);
    setSelectedGalleryTitle(galleryTitle);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedGalleryTitle("");
  };

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  // Show back to top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="mt-10 min-h-screen bg-linear-to-b from-[#f7f2e8] via-[#fafaf7] to-[#edf5df]">
        {/* Header */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="soft-panel relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#cfe7b0]/45 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#e8d8b5]/55 blur-3xl" />

              <span className="section-tag">
                {text("Photo Highlights", "फोटो हाइलाइट")}
              </span>
              <h1 className="mt-4 text-4xl text-[#1e3a0f] sm:text-5xl">
                {text("Gallery", "ग्यालेरी")}
              </h1>
              <p className="mt-4 text-base leading-8 text-[#4b5f3d] md:text-lg">
                {text(
                  "Explore field moments, team visits, and community events from across the NaturePure network.",
                  "नेचरप्योर नेटवर्कभरिका फिल्ड गतिविधि, टोली भ्रमण र सामुदायिक कार्यक्रमहरू अन्वेषण गर्नुहोस्।",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
          {loading ? (
            <div className="space-y-12 md:space-y-20">
              {/* Loading Skeletons */}
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="soft-panel animate-pulse overflow-hidden"
                >
                  {/* Skeleton Header */}
                  <div className="bg-linear-to-r from-[#1e3a0f] via-[#2d5a1b] to-[#4a8c28] px-6 py-6 md:px-8">
                    <div className="mb-2 h-8 w-1/3 rounded bg-white/35 md:h-9"></div>
                    <div className="h-4 w-20 rounded bg-white/30 md:h-5"></div>
                  </div>

                  {/* Skeleton Images Grid */}
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                        <div
                          key={j}
                          className="aspect-square rounded-xl bg-[#e6edd8]"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : galleries.length === 0 ? (
            <motion.div
              className="text-center py-16 md:py-20"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#d9edbe] md:h-32 md:w-32">
                <svg
                  className="h-12 w-12 text-[#4a8c28] md:h-16 md:w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-xl font-semibold text-[#2d5a1b] md:text-2xl">
                {text(
                  "No galleries available yet.",
                  "अहिलेसम्म ग्यालेरी उपलब्ध छैन।",
                )}
              </p>
              <p className="mt-2 text-[#5f7350]">
                {text(
                  "Check back soon for updates!",
                  "अपडेटका लागि छिट्टै पुनः हेर्नुहोस्!",
                )}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-12 md:space-y-20"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {galleries.map((gallery) => {
                const galleryTitle = pickLocalizedText(
                  gallery.titleI18n ?? gallery.title,
                  language,
                );

                return (
                  <motion.div
                    key={gallery.id}
                    variants={fadeUpItem}
                    className="soft-panel overflow-hidden transition-all duration-300 hover:shadow-[0_18px_44px_rgba(30,58,15,0.12)]"
                  >
                    {/* Gallery Title */}
                    <div className="bg-linear-to-r from-[#1e3a0f] via-[#2d5a1b] to-[#4a8c28] px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-2xl text-white md:text-3xl">
                        {galleryTitle}
                      </h2>
                      <p className="mt-1 text-sm text-white/78 md:text-base">
                        {gallery.images.length}{" "}
                        {gallery.images.length === 1
                          ? text("photo", "फोटो")
                          : text("photos", "फोटोहरू")}
                      </p>
                    </div>

                    {/* Gallery Images Grid */}
                    <div className="p-4 md:p-8">
                      {gallery.images.length === 0 ? (
                        <div className="rounded-xl bg-[#f7f2e8] py-12 text-center">
                          <svg
                            className="mx-auto mb-4 h-16 w-16 text-[#a8b891]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-[#5f7350] md:text-base">
                            {text(
                              "No images in this gallery",
                              "यस ग्यालेरीमा तस्बिर छैन",
                            )}
                          </p>
                        </div>
                      ) : (
                        <motion.div
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {gallery.images.map((img, index) => (
                            <motion.div
                              key={img.id}
                              variants={fadeUpItem}
                              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-sm ring-2 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#7bbf42] md:rounded-xl"
                              onClick={() =>
                                openLightbox(img.url, galleryTitle)
                              }
                              whileHover={{ scale: 1.05, y: -4 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Image
                                src={img.url}
                                alt={`${galleryTitle} - Image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                                  <p className="text-white text-xs md:text-sm font-medium">
                                    {text(
                                      "Click to view",
                                      "हेर्न क्लिक गर्नुहोस्",
                                    )}
                                  </p>
                                </div>
                              </div>
                              {/* Image number badge */}
                              <div className="absolute right-2 top-2 rounded-full bg-[#1e3a0f]/75 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                {index + 1}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-2 right-2 md:top-4 md:right-4 cursor-pointer text-white text-3xl md:text-4xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                ×
              </motion.button>

              {/* ESC hint */}
              <motion.div
                className="hidden md:block absolute top-4 left-4 text-white/70 text-sm bg-black/30 px-3 py-2 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {text("Press", "थिच्नुहोस्")}{" "}
                <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd>{" "}
                {text("to close", "बन्द गर्न")}
              </motion.div>

              <motion.div
                className="relative max-w-7xl w-full mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[70vh] md:h-[80vh]">
                  <Image
                    src={selectedImage}
                    alt={selectedGalleryTitle}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="100vw"
                    priority
                  />
                </div>
                {selectedGalleryTitle && (
                  <motion.div
                    className="text-center mt-3 md:mt-4 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 md:px-6 md:py-3 inline-block mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-white text-sm md:text-lg font-medium">
                      {selectedGalleryTitle}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 cursor-pointer rounded-full bg-[#4a8c28] p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#2d5a1b] hover:shadow-xl md:bottom-8 md:right-8 md:p-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
