"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ne";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Get initial language from localStorage (client-side only)
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ne";
  const stored = localStorage.getItem("language") as Language | null;
  return stored && (stored === "en" || stored === "ne") ? stored : "ne";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    getInitialLanguage(),
  );

  // Update DOM and localStorage when language changes (client-side only)
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "ne" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
