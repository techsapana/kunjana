"use client";

import Link from "next/link";
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

  return (
    <footer className="mt-8 bg-[#1e3a0f] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#4a8c28] font-bold text-white">
                NP
              </span>
              <div>
                <p
                  className={`text-2xl leading-none ${
                    language === "ne" ? "font-devanagari" : ""
                  }`}
                >
                  NaturePure Co.
                </p>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#a8d97a] uppercase">
                  {language === "en" ? "Organic Supplements" : "जैविक पूरक"}
                </p>
              </div>
            </div>

            <p
              className={`mt-5 max-w-sm text-sm leading-7 text-white/78 ${
                language === "ne" ? "font-devanagari" : ""
              }`}
            >
              {language === "en"
                ? "Premium organic poultry supplements designed for healthier flocks, stronger immunity, and sustainable farm performance."
                : "स्वास्थ्यकर बगाल, मजबूत प्रतिरक्षा र टिकाऊ फार्म प्रदर्शनको लागि डिजाइन गरिएको प्रिमियम जैविक कुखुरा पूरक।"}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80">
                {language === "en" ? "Organic Certified" : "जैविक प्रमाणित"}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80">
                ISO Standards
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80">
                {language === "en"
                  ? "Vet Approved"
                  : "पशु चिकित्सक द्वारा अनुमोदित"}
              </span>
            </div>
          </div>

          <div>
            <h4
              className={`text-sm font-semibold tracking-[0.18em] text-[#bde493] uppercase ${
                language === "ne" ? "font-devanagari" : ""
              }`}
            >
              {t("footer.products")}
            </h4>
            {products.length === 0 ? (
              <p className="mt-5 text-sm text-white/70">
                {language === "en"
                  ? "No products yet."
                  : "अहिले कुनै उत्पाद छैन।"}
              </p>
            ) : (
              <ul className="mt-5 space-y-3 text-sm">
                {products.map((product) => (
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
            )}
          </div>

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
                {language === "en" ? "Banasthali Chwok" : "बनास्थली चौक"},
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
