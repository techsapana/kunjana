"use client";

import Link from "next/link";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function Hero() {
  const { t, language } = useTranslation();

  const heroStats = [
    {
      label: language === "en" ? "Partner Farms" : "साझेदार फार्मह",
      value: language === "en" ? "500+" : "५०० +",
    },
    {
      label: language === "en" ? "Product Range" : "उत्पाद श्रृंखला",
      value: language === "en" ? "12+" : "१२ +",
    },
    {
      label: language === "en" ? "Farmer Satisfaction" : "किसान संतुष्टि",
      value: language === "en" ? "98%" : "९८%",
    },
  ];

  const titleContent =
    language === "en"
      ? {
          line1: "Advanced Poultry Health",
          line2: "& Farm Protection",
          line3: "Solutions",
        }
      : {
          line1: "उन्नत कुखुरा स्वास्थ्य",
          line2: "र फार्म संरक्षण",
          line3: "समाधानहरू",
        };

  const panelHighlights =
    language === "en"
      ? [
          "Organic & safe formulations",
          "Improved poultry health & immunity",
          "Consistent growth & better productivity",
        ]
      : [
          "जैविक र सुरक्षित फर्मुलेसन",
          "कुखुराको स्वास्थ्य र प्रतिरक्षा सुधार",
          "स्थिर वृद्धि र राम्रो उत्पादकता",
        ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1e3a0f] via-[#254d16] to-[#4a8c28] pb-18 pt-28 text-white md:pt-34">
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-[#7bbf42]/20 blur-3xl" />
        <div className="absolute right-8 top-24 h-64 w-64 rounded-full bg-[#d9f0b8]/14 blur-3xl" />
        <div className="leaf-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <span
            className={`inline-flex items-center rounded-full border border-[#7bbf42]/45 bg-[#7bbf42]/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#cce7ae] uppercase ${
              language === "ne" ? "font-devanagari text-[12px]" : ""
            }`}
          >
            {language === "en"
              ? "Poultry Health Solutions"
              : "कुखुरा स्वास्थ्य समाधान"}
          </span>

          <h1
            className={`mt-6 text-4xl leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl ${
              language === "ne"
                ? "font-devanagari text-3xl sm:text-4xl md:text-5xl leading-relaxed"
                : ""
            }`}
          >
            {titleContent.line1}
            <br />
            <span className="text-[#9fd66e] italic">{titleContent.line2}</span>
            <br />
            {titleContent.line3}
          </h1>

          <p
            className={`mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg ${
              language === "ne"
                ? "font-devanagari text-sm md:text-base leading-relaxed"
                : ""
            }`}
          >
            {language === "en"
              ? "Improve poultry performance with scientifically developed treatments, water purification systems, and disease control solutions designed for modern farms."
              : "आधुनिक फार्मका लागि डिजाइन गरिएका वैज्ञानिक रूपमा विकसित उपचार, पानी शुद्धीकरण प्रणाली र रोग नियन्त्रण समाधानमार्फत कुखुराको कार्यक्षमता सुधार गर्नुहोस्।"}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-[#7bbf42] px-6 py-3 text-sm font-semibold text-[#17320d] transition hover:-translate-y-0.5 hover:bg-[#a8dd7a]"
            >
              {t("home.latestBlogs") === "Latest Insights"
                ? "Explore Products"
                : "उत्पादनहरू अन्वेषण गर्नुहोस्"}
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1e3a0f]"
            >
              {language === "en" ? "About Kunjana Agro" : "कुञ्जना एग्रोबारे"}
            </Link>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/18 pt-7">
            {heroStats.map((item) => (
              <div key={item.label}>
                <p className="text-3xl leading-none text-[#cce7ae]">
                  {item.value}
                </p>
                <p
                  className={`mt-2 text-xs tracking-[0.14em] text-white/70 uppercase ${
                    language === "ne"
                      ? "font-devanagari text-[11px] tracking-normal"
                      : ""
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <div className="relative isolate h-full min-h-117.5 overflow-hidden rounded-[30px] border border-[#e2f6cf]/45 bg-linear-to-br from-[#d4efbd]/20 via-[#9fd66e]/10 to-[#13270d]/50 p-1 shadow-[0_24px_65px_rgba(8,24,8,0.52)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#cce7ae]/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 bottom-8 h-44 w-44 rounded-full bg-[#7bbf42]/20 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between rounded-[26px] border border-[#f0fadc]/30 bg-linear-to-b from-[#1f4314]/82 via-[#183811]/86 to-[#0e220a]/92 p-6 sm:p-7">
              <div className="absolute right-5 top-5 rounded-full border border-[#d8efc0]/45 bg-[#d8efc0]/16 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#e9f8d7] uppercase">
                {language === "en" ? "Top Choice" : "शीर्ष छनोट"}
              </div>

              <div>
                <p
                  className={`text-xs font-semibold tracking-[0.2em] text-[#d8efc0] uppercase ${
                    language === "ne" ? "font-devanagari text-[12px]" : ""
                  }`}
                >
                  {language === "en"
                    ? "Healthier Poultry, Stronger Growth, Better Results"
                    : "स्वस्थ कुखुरा, बलियो वृद्धि, राम्रो परिणाम"}
                </p>
                <h3
                  className={`mt-4 max-w-md text-3xl font-bold leading-tight text-white sm:text-4xl ${
                    language === "ne"
                      ? "font-devanagari text-2xl sm:text-3xl leading-relaxed"
                      : ""
                  }`}
                >
                  {language === "en"
                    ? "Practical poultry care solutions for modern and reliable farm operations."
                    : "आधुनिक र भरोसायोग्य फार्म सञ्चालनका लागि व्यावहारिक कुखुरा हेरचाह समाधानहरू।"}
                </h3>

                <div className="mt-5 grid gap-2.5">
                  {panelHighlights.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2.5 rounded-xl border border-[#e2f6cf]/30 bg-[#d8efc0]/8 px-3 py-2"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#9fd66e]" />
                      <p
                        className={`text-xs text-[#eef9df] sm:text-sm ${
                          language === "ne"
                            ? "font-devanagari text-[13px] sm:text-sm"
                            : ""
                        }`}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#e2f6cf]/40 bg-[#d8efc0]/12 p-4 font-semibold backdrop-blur-sm sm:p-5">
                <p
                  className={`text-sm leading-7 text-white/95 ${
                    language === "ne"
                      ? "font-devanagari text-base leading-relaxed"
                      : ""
                  }`}
                >
                  {language === "en"
                    ? "Kunjana Agro delivers practical and effective disease treatment, clean water systems, nutritional supplements, and farm hygiene support for safer and sustainable poultry farming."
                    : "कुञ्जना एग्रोले सुरक्षित र दिगो कुखुरा पालनका लागि व्यावहारिक तथा प्रभावकारी रोग उपचार, स्वच्छ पानी प्रणाली, पोषण पूरक र फार्म स्वच्छता सहयोग प्रदान गर्छ।"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
