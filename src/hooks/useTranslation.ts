import { useLanguage } from "@/src/context/LanguageContext";
import en from "@/src/i18n/en.json";
import ne from "@/src/i18n/ne.json";

export function useTranslation() {
  const { language } = useLanguage();
  const translations = language === "en" ? en : ne;

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, language };
}
