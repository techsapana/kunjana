# 🚀 Quick Reference Card - Bilingual Implementation

## Import & Use Translation

```tsx
"use client";
import { useTranslation } from "@/src/hooks/useTranslation";

export function MyComponent() {
  const { t, language } = useTranslation();
  return <p>{t("key.here")}</p>;
}
```

## Common Translation Keys

| Component | Key | EN | NE |
|-----------|-----|----|----|
| Navigation | `nav.home` | Home | होम |
| Navigation | `nav.products` | Products | उत्पादनहरू |
| Hero | `hero.title` | Premium Supplements | प्रिमियम पूरक |
| Hero | `hero.cta` | Explore Products | उत्पादनहरू अन्वेषण गर्नुहोस् |
| Footer | `footer.company` | Company | कम्पनी |
| Common | `common.loading` | Loading... | लोड हुँदै छ... |

## Language Check

```tsx
const { language } = useTranslation();
if (language === "en") {
  // English specific code
}
if (language === "ne") {
  // Nepali specific code
}
```

## Add Nepali Class

```tsx
<div className={language === "ne" ? "font-devanagari" : ""}>
  {t("key")}
</div>
```

## Toggle Language from Component

```tsx
import { useLanguage } from "@/src/context/LanguageContext";

export function LanguageButton() {
  const { toggleLanguage, language } = useLanguage();
  return (
    <button onClick={toggleLanguage}>
      Current: {language}
    </button>
  );
}
```

## Add New Translation

1. **English** (`src/i18n/en.json`):
```json
{
  "section": {
    "key": "English text"
  }
}
```

2. **Nepali** (`src/i18n/ne.json`):
```json
{
  "section": {
    "key": "नेपाली पाठ"
  }
}
```

3. **Use**:
```tsx
{t("section.key")}
```

## Responsive Nepali Styling

```tsx
<h1 className={`
  text-4xl
  ${language === "ne" ? "font-devanagari text-3xl leading-relaxed" : ""}
`}>
  {t("hero.title")}
</h1>
```

## Conditional Rendering

```tsx
{language === "en" ? (
  <p>English content</p>
) : (
  <p>नेपाली सामग्री</p>
)}
```

## Language Context

```tsx
import { useLanguage } from "@/src/context/LanguageContext";

const { 
  language,              // "en" or "ne"
  setLanguage,          // (lang: Language) => void
  toggleLanguage        // () => void
} = useLanguage();
```

## Helper Components

```tsx
import { Translated, TranslatedList } from "@/src/components/TranslationComponents";

// Simple translation
<Translated 
  en="English text" 
  ne="नेपाली पाठ" 
  className="text-lg"
  tag="h1"
/>

// List translation
<TranslatedList
  items={[
    { en: "Item 1", ne: "वस्तु १" },
    { en: "Item 2", ne: "वस्तु २" }
  ]}
  className="list-none"
/>
```

## CSS for Nepali

```css
html[lang="ne"] {
  /* Automatically applied */
  font-family: var(--font-devanagari);
  letter-spacing: 0.3px;
}

html[lang="ne"] h1 {
  font-size: 2.75rem;
  line-height: 1.4;
}

html[lang="ne"] p {
  line-height: 1.8;
}
```

## Files & Paths

| File | Purpose |
|------|---------|
| `src/context/LanguageContext.tsx` | Language state |
| `src/hooks/useTranslation.ts` | Main hook |
| `src/i18n/en.json` | English translations |
| `src/i18n/ne.json` | Nepali translations |
| `src/styles/nepali.css` | Nepali styles |
| `src/components/Footer.tsx` | Server component |
| `src/components/FooterContent.tsx` | Client component |
| `src/components/Navbar.tsx` | Navigation w/ toggle |
| `src/components/Hero.tsx` | Hero section |

## Debugging

```tsx
// Log current language
const { language } = useTranslation();
console.log("Current language:", language);

// Check localStorage
console.log("Saved preference:", localStorage.getItem("language"));

// Verify keys exist
const { t } = useTranslation();
const text = t("nonexistent.key");  // Returns "nonexistent.key"
```

## Performance Tips

- ✓ Keep translations JSON simple
- ✓ Use lazy loading for large lists
- ✓ Avoid re-renders with useMemo
- ✓ Keep components small
- ✓ Use server components when possible

## Mobile Considerations

```tsx
<button className={`
  px-4 py-2
  ${language === "ne" ? "px-5" : ""}
  text-sm
  ${language === "ne" ? "text-base" : ""}
`}>
  {t("nav.button")}
</button>
```

## Common Mistakes ❌

- ❌ Forgetting `"use client"` in component
- ❌ Using translation hook in server component
- ❌ Hardcoding English/Nepali instead of using t()
- ❌ Not providing Nepali class for font
- ❌ Using uppercase for Nepali text

## Correct Way ✅

- ✅ Always use `useTranslation()` hook
- ✅ Add `"use client"` to client components
- ✅ Use `t("key")` for all text
- ✅ Apply `font-devanagari` for Nepali
- ✅ Let JavaScript handle text rendering

## Full Documentation

For detailed information, see:
- `BILINGUAL_GUIDE.md` - User and developer guide
- `TRANSLATION_GUIDE.md` - Complete API documentation
- `TRANSLATION_EXAMPLES.md` - Code examples
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
