"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/src/hooks/useTranslation";

type FooterProduct = {
  id: number;
  name: string;
};

interface FooterContentProps {
  products: FooterProduct[];
}

const footerLinksConfig = [
  { translationKey: "footer.about", href: "/about" },
  { translationKey: "footer.becomePartner", href: "/become-a-partner" },
  { translationKey: "footer.farming", href: "/farming" },
  { translationKey: "footer.soilSolutions", href: "/soil-solutions" },
];

const footerSupportConfig = [
  { translationKey: "footer.contact", href: "/contact" },
  { translationKey: "footer.blogs", href: "/blogs" },
  { translationKey: "footer.products", href: "/products" },
];

export default function FooterContent({ products }: FooterContentProps) {
  const { t, language } = useTranslation();

  // Premium fallbacks in case database list returns empty
  const fallbackProducts = [
    { id: 1, name: language === "en" ? "Kunjana Packaged Combo (3-in-1)" : "कुञ्जना प्याकेज्ड कम्बो (३-इन-१)" },
    { id: 2, name: language === "en" ? "HeartAttack Supplement" : "हर्टअट्याक सप्लिमेन्ट" },
    { id: 3, name: language === "en" ? "Local-Vita" : "लोकल-भिटा" },
    { id: 4, name: language === "en" ? "BC Mother" : "बीसी मदर" },
  ];

  const displayedProducts = products && products.length > 0 ? products : fallbackProducts;

  return (
    <footer className="mt-8 bg-[#1e3a0f] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          
          {/* Left Column: Beautiful Banner Card Layout */}
          <div className="flex flex-col items-start justify-start">
            <div className="group relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/20">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/image/footer.jpg"
                  alt="Kunjana Agro Banner"
                  width={450}
                  height={280}
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4
              className={`text-sm font-semibold tracking-[0.18em] text-[#bde493] uppercase ${
                language === "ne" ? "font-devanagari" : ""
              }`}
            >
              {t("footer.products")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {displayedProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-white/80 transition hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Column */}
          <div>
            <h4
              className={`text-sm font-semibold tracking-[0.18em] text-[#bde493] uppercase ${
                language === "ne" ? "font-devanagari" : ""
              }`}
            >
              {t("footer.company")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinksConfig.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 transition hover:text-white"
                  >
                    {t(item.translationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4
              className={`text-sm font-semibold tracking-[0.18em] text-[#bde493] uppercase ${
                language === "ne" ? "font-devanagari" : ""
              }`}
            >
              {t("footer.contact")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li>
                {language === "en" ? "Banasthali Chwok" : "बनास्थली चोक"},
                Kathmandu
              </li>
              <li>9746305967</li>
              <li>9824159746</li>
            </ul>

            <ul className="mt-5 space-y-3 text-sm">
              {footerSupportConfig.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 transition hover:text-white"
                  >
                    {t(item.translationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/65">
          <p className={language === "ne" ? "font-devanagari" : ""}>
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}