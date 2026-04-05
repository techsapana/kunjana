"use client";

import React, { ReactNode } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";

/**
 * Translated Component
 * Easy way to display text in both languages
 *
 * Usage:
 * <Translated en="English text" ne="नेपाली पाठ" />
 * Or with HTML:
 * <Translated en={<strong>Bold English</strong>} ne={<strong>बोल्ड नेपाली</strong>} />
 */

interface TranslatedProps {
  en: string | ReactNode;
  ne: string | ReactNode;
  className?: string;
  tag?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Translated({
  en,
  ne,
  className = "",
  tag = "span",
}: TranslatedProps) {
  const { language } = useTranslation();

  const content = language === "en" ? en : ne;
  const nepaliClasses = language === "ne" ? "font-devanagari" : "";
  const finalClassName = `${className} ${nepaliClasses}`.trim();

  const props = { className: finalClassName };

  if (tag === "div") return <div {...props}>{content}</div>;
  if (tag === "p") return <p {...props}>{content}</p>;
  if (tag === "h1") return <h1 {...props}>{content}</h1>;
  if (tag === "h2") return <h2 {...props}>{content}</h2>;
  if (tag === "h3") return <h3 {...props}>{content}</h3>;
  if (tag === "h4") return <h4 {...props}>{content}</h4>;
  if (tag === "h5") return <h5 {...props}>{content}</h5>;
  if (tag === "h6") return <h6 {...props}>{content}</h6>;

  return <span {...props}>{content}</span>;
}

/**
 * TranslatedList Component
 * For lists with multiple items
 *
 * Usage:
 * <TranslatedList
 *   items={[
 *     { en: "Item 1", ne: "वस्तु १" },
 *     { en: "Item 2", ne: "वस्तु २" }
 *   ]}
 * />
 */

interface TranslatedItem {
  en: string | ReactNode;
  ne: string | ReactNode;
}

interface TranslatedListProps {
  items: TranslatedItem[];
  className?: string;
  itemClassName?: string;
  as?: "ul" | "ol";
}

export function TranslatedList({
  items,
  className = "",
  itemClassName = "",
  as: ListTag = "ul",
}: TranslatedListProps) {
  const { language } = useTranslation();
  const nepaliClasses = language === "ne" ? "font-devanagari" : "";
  const finalClassName = `${className} ${nepaliClasses}`.trim();

  return ListTag === "ul" ? (
    <ul className={finalClassName}>
      {items.map((item, idx) => (
        <li key={idx} className={itemClassName}>
          {language === "en" ? item.en : item.ne}
        </li>
      ))}
    </ul>
  ) : (
    <ol className={finalClassName}>
      {items.map((item, idx) => (
        <li key={idx} className={itemClassName}>
          {language === "en" ? item.en : item.ne}
        </li>
      ))}
    </ol>
  );
}

/**
 * ConditionalText Component
 * For complex conditional rendering based on language
 */

interface ConditionalTextProps {
  children: (language: "en" | "ne") => ReactNode;
  className?: string;
}

export function ConditionalText({
  children,
  className = "",
}: ConditionalTextProps) {
  const { language } = useTranslation();
  const nepaliClasses = language === "ne" ? "font-devanagari" : "";
  const finalClassName = `${className} ${nepaliClasses}`.trim();

  return <span className={finalClassName}>{children(language)}</span>;
}
