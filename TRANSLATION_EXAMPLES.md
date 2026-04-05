# Translation System Examples

## Basic Usage

### Example 1: Simple Translation Hook

```tsx
"use client";

import { useTranslation } from "@/src/hooks/useTranslation";

export function MyComponent() {
  const { t, language } = useTranslation();

  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("hero.subtitle")}</p>

      {/* Conditional rendering based on language */}
      {language === "en" ? (
        <p>English content</p>
      ) : (
        <p>नेपाली सामग्री</p>
      )}
    </div>
  );
}
```

### Example 2: Using TranslatedComponents

```tsx
"use client";

import { Translated, TranslatedList } from "@/src/components/TranslationComponents";

export function MySection() {
  return (
    <div>
      <Translated
        tag="h1"
        className="text-2xl font-bold"
        en="Welcome to our website"
        ne="हाम्रो वेबसाइटमा स्वागतम्"
      />

      <TranslatedList
        items={[
          {
            en: "High-quality products",
            ne: "उच्च गुणस्तरको उत्पादन",
          },
          {
            en: "Fast delivery",
            ne: "छिटो डेलिभरी",
          },
          {
            en: "Customer support",
            ne: "ग्राहक समर्थन",
          },
        ]}
        className="mt-4 space-y-2"
        itemClassName="text-lg"
      />
    </div>
  );
}
```

### Example 3: Dynamic Language Switching

```tsx
"use client";

import { useLanguage } from "@/src/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, toggleLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded ${
          language === "en"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        English
      </button>

      <button
        onClick={() => setLanguage("ne")}
        className={`px-4 py-2 rounded ${
          language === "ne"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        नेपाली
      </button>

      <button
        onClick={toggleLanguage}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Toggle Language
      </button>
    </div>
  );
}
```

### Example 4: Conditional Text Rendering

```tsx
"use client";

import { ConditionalText } from "@/src/components/TranslationComponents";

export function MyConditionalSection() {
  return (
    <div>
      <ConditionalText className="text-sm">
        {(language) =>
          language === "en"
            ? "This text changes based on the selected language"
            : "यो पाठ चयनित भाषाको आधारमा परिवर्तन हुन्छ"
        }
      </ConditionalText>
    </div>
  );
}
```

### Example 5: Adding New Translations

**In `src/i18n/en.json`:**

```json
{
  "mySection": {
    "title": "My Section Title",
    "description": "My section description"
  }
}
```

**In `src/i18n/ne.json`:**

```json
{
  "mySection": {
    "title": "मेरो अनुभाग शीर्षक",
    "description": "मेरो अनुभाग विवरण"
  }
}
```

**In your component:**

```tsx
"use client";

import { useTranslation } from "@/src/hooks/useTranslation";

export function MySection() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t("mySection.title")}</h2>
      <p>{t("mySection.description")}</p>
    </section>
  );
}
```

## Best Practices

1. **Always use `"use client"`** in components that use translation hooks
2. **Keep translation keys organized** using dot notation (e.g., `nav.home`, `hero.title`)
3. **Use consistent naming** for keys across en.json and ne.json
4. **Add Nepali class** for proper font rendering: `${language === "ne" ? "font-devanagari" : ""}`
5. **Test both languages** when adding new content

## Translation Keys Reference

See `src/constants/translationKeys.ts` for a complete list of all available translation keys.

## Common Patterns

### Pattern: Language-aware styling

```tsx
<div
  className={`text-lg ${
    language === "ne"
      ? "font-devanagari leading-relaxed"
      : "font-sans"
  }`}
>
  {t("myKey")}
</div>
```

### Pattern: Multiple language variants

```tsx
{language === "en" ? (
  <>
    <h1>English Title</h1>
    <p>English description</p>
  </>
) : (
  <>
    <h1>नेपाली शीर्षक</h1>
    <p>नेपाली विवरण</p>
  </>
)}
```

### Pattern: Fallback for missing translations

```tsx
const text = t("optional.key") || "Fallback text";
```
