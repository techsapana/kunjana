"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useTranslation } from "@/src/hooks/useTranslation";

const navLinks = [
  { label: "nav.home", href: "/" },
  { label: "nav.about", href: "/about" },
  { label: "nav.products", href: "/products" },
  { label: "nav.blogs", href: "/blogs" },
  { label: "nav.gallery", href: "/gallery" },
  { label: "nav.becomePartner", href: "/become-a-partner" },
  { label: "nav.farming", href: "/farming" },
  { label: "nav.soilSolutions", href: "/soil-solutions" },
  { label: "nav.contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const isEnglish = language === "en";

  const activeHref = useMemo(() => {
    if (!pathname) {
      return "/";
    }

    const matched = navLinks.find((item) => {
      if (item.href === "/") {
        return pathname === "/";
      }

      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    });

    return matched?.href ?? "";
  }, [pathname]);

  const desktopLinkClass = (href: string) =>
    `rounded-full whitespace-nowrap font-semibold transition ${
      isEnglish ? "px-2.5 py-1.5 text-[13px]" : "px-3 py-2 text-sm"
    } ${
      activeHref === href
        ? "bg-[#eaf4d8] text-[#234311]"
        : "text-[#22311c] hover:bg-[#edf6de] hover:text-[#2d5a1b]"
    }`;

  const mobileLinkClass = (href: string) =>
    `block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
      activeHref === href
        ? "bg-[#eaf4d8] text-[#234311]"
        : "text-[#22311c] hover:bg-[#edf6de]"
    }`;

  const TranslatedLabel = ({ labelKey }: { labelKey: string }) => {
    return <>{t(labelKey)}</>;
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#7bbf42]/20 bg-white/86 backdrop-blur-xl">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ${
          isEnglish ? "h-18" : "h-20"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-105 transition duration-150"
          aria-label="KunjanAgro home"
        >
          <span
            className={`inline-flex items-center justify-center rounded-2xl bg-[#4a8c28] font-bold text-white shadow-lg shadow-[#4a8c28]/30 ${
              isEnglish ? "h-10 w-10 text-[13px]" : "h-11 w-11 text-sm"
            }`}
          >
           Kunjana
          </span>
          <div>
            <p
              className={`leading-none text-[#1e3a0f] ${
                isEnglish ? "text-lg" : "text-xl"
              }`}
            >
              Kunjana Agro
            </p>
            <p
              className={`font-semibold text-[#4a8c28] uppercase ${
                isEnglish
                  ? "text-[9px] tracking-[0.12em]"
                  : "text-[10px] tracking-[0.15em]"
              }`}
            >
              {language === "en" ? "Organic Supplements" : "जैविक पूरक"}
            </p>
          </div>
        </Link>

        <div
          className={`hidden items-center rounded-full border border-[#7bbf42]/22 bg-white/92 lg:flex ${
            isEnglish ? "gap-0.5 p-1.5" : "gap-1 p-2"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={desktopLinkClass(item.href)}
            >
              <TranslatedLabel labelKey={item.label} />
            </Link>
          ))}
          <Link
            href="/contact"
            className={`ml-1 inline-flex items-center duration-200 rounded-full bg-[#4a8c28] font-semibold text-white transition hover:bg-[#2d5a1b] ${
              isEnglish ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-sm"
            }`}
          >
            {t("nav.getInTouch")}
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#7bbf42]/30 bg-[#eaf4d8]/60 px-3.5 py-2 text-sm font-semibold text-[#234311] transition hover:bg-[#eaf4d8] hover:border-[#7bbf42]/50 active:scale-95"
            aria-label={`Switch language to ${language === "en" ? "नेपाली" : "English"}`}
            title={language === "en" ? "Switch to नेपाली" : "Switch to English"}
          >
            <span className="text-xs font-bold tracking-wider">
              {language === "en" ? "EN" : "नेपाली"}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#7bbf42]"></span>
            <span className="text-xs">
              {language === "en" ? "नेपाली" : "EN"}
            </span>
          </button>

          <button
            type="button"
            className="text-[#1e3a0f] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#7bbf42]/24 bg-white/96 px-4 py-4 lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass(item.href)}
              >
                <TranslatedLabel labelKey={item.label} />
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block w-full rounded-full duration-200 bg-[#4a8c28] px-5 py-2.5 text-sm font-semibold text-white text-center transition hover:bg-[#2d5a1b]"
            >
              {t("nav.getInTouch")}
            </Link>

            {/* Mobile Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="mt-3 w-full rounded-full border border-[#7bbf42]/30 bg-[#eaf4d8]/60 px-3.5 py-2.5 text-sm font-semibold text-[#234311] transition hover:bg-[#eaf4d8] hover:border-[#7bbf42]/50 active:scale-95"
              aria-label={`Switch language to ${language === "en" ? "नेपाली" : "English"}`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <span className="text-xs font-bold tracking-wider">
                  {language === "en" ? "EN" : "नेपाली"}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#7bbf42]"></span>
                <span className="text-xs">
                  {language === "en" ? "नेपाली" : "EN"}
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
