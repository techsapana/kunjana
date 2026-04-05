# 🌍 Bilingual English/Nepali Translation System Guide

## Overview

This website now supports bilingual content switching between **English** and **Nepali (नेपाली)** with a modern language toggle in the navigation bar. The system allows **dynamic language switching without page reload**.

## Components & Architecture

### 1. **LanguageContext** (`src/context/LanguageContext.tsx`)
- Manages global language state using React Context API
- Persists language preference to localStorage
- Prevents hydration mismatches with mounted state tracking
- Exports `useLanguage()` hook for components

### 2. **useTranslation Hook** (`src/hooks/useTranslation.ts`)
- Main hook for accessing translations in components
- Provides `t(key)` function for retrieving translated strings
- Returns current `language` state
- Usage:
  ```tsx
  const { t, language } = useTranslation();
  return <p>{t("nav.home")}</p>;
  ```

### 3. **Translation Files** (`src/i18n/`)
- **en.json** - English translations
- **ne.json** - Nepali translations (Devanagari script)

## How to Use

### Getting Started

1. **Import the hook in any client component:**
   ```tsx
   "use client";
   import { useTranslation } from "@/src/hooks/useTranslation";
   
   export default function MyComponent() {
     const { t, language } = useTranslation();
     return <div>{t("nav.home")}</div>;
   }
   ```

2. **Access language directly:**
   ```tsx
   const { language, toggleLanguage, setLanguage } = useLanguage();
   ```

### Adding New Translations

1. **Add keys to both translation files:**

   **en.json:**
   ```json
   {
     "mySection": {
       "myKey": "English text here"
     }
   }
   ```

   **ne.json:**
   ```json
   {
     "mySection": {
       "myKey": "नेपाली पाठ यहाँ"
     }
   }
   ```

2. **Use in component:**
   ```tsx
   const { t } = useTranslation();
   <h1>{t("mySection.myKey")}</h1>
   ```

## Key Features

### ✅ Dynamic Language Switching
- Language toggle in navbar (EN | नेपाली)
- Desktop and mobile responsive
- Smooth switching without page reload
- Automatic localStorage persistence

### ✅ Nepali Typography
- **Font:** Noto Sans Devanagari (Google Fonts)
- **Proper spacing & line heights** for Devanagari script
- **Automatic font application** when language is Nepali
- **Responsive sizing** to handle text expansion

### ✅ Components with Translation Support
- ✓ Navbar (header navigation)
- ✓ Footer (company info, links, copyright)
- ✓ Hero section (main headline and CTA)
- ✓ Language toggle button
- Ready for: Products, Blogs, Contact forms, etc.

## Typography Guidelines

### English (DM Sans)
- Clean, modern sans-serif
- Default line-height: 1.6-1.8
- Letter-spacing: normal

### Nepali (Noto Sans Devanagari)
- Devanagari script optimized font
- Increased line-height: 1.7-1.9
- Custom letter-spacing: 0.25-0.4px
- Font size slightly smaller to match visual weight

## Nepali-Specific CSS

All Nepali typography adjustments are in `src/styles/nepali.css`:

- Automatic application when `html[lang="ne"]` is set
- Heading adjustments with increased readability
- Button and form padding optimizations
- Text expansion handling
- Responsive breakpoints

## File Structure

```
src/
├── context/
│   └── LanguageContext.tsx      # Language state management
├── hooks/
│   └── useTranslation.ts        # Translation accessor hook
├── i18n/
│   ├── en.json                  # English translations
│   └── ne.json                  # Nepali translations
├── styles/
│   ├── globals.css              # Global styles
│   └── nepali.css               # Nepali-specific typography
└── components/
    ├── Navbar.tsx               # Navigation with language toggle
    ├── Footer.tsx               # Footer with translations
    ├── Hero.tsx                 # Hero section with translations
    └── [others]                 # Other components
```

## Language Toggle Button

Located in Navbar:
- **Desktop:** Visible in top-right (EN | नेपाली)
- **Mobile:** Inside mobile menu
- Clean design with visual separator
- Shows current and target language
- Smooth hover/active animations

## Responsive Design

### Desktop (≥1024px)
- Language toggle in header navbar
- Full-width content with proper Nepali spacing

### Tablet (640px - 1024px)
- Language toggle remains visible
- Adjusted font sizes for readability

### Mobile (<640px)
- Language toggle in mobile menu
- Optimized spacing and padding
- Responsive text sizes

## Manual Language Override (Optional)

For testing or mobile-first language selection:

```tsx
import { useLanguage } from "@/src/context/LanguageContext";

export default function Settings() {
  const { setLanguage, language } = useLanguage();
  
  return (
    <button onClick={() => setLanguage("ne")}>
      Switch to Nepali
    </button>
  );
}
```

## Performance Considerations

✅ **Optimized:**
- Translations loaded once (JSON files)
- Context API prevents prop drilling
- Hydration-safe implementation
- Font loaded via Google Fonts CDN
- No runtime translation - all static

## Common Issues & Solutions

### Issue: Text not translating
**Solution:** Ensure component is marked with `"use client"` and properly imports `useTranslation`.

### Issue: Nepali font not applying
**Solution:** Check that Noto Sans Devanagari is loaded in layout. Verify `html[lang="ne"]` is set.

### Issue: Text appears cut off in Nepali
**Solution:** Nepali text takes more space. Check `max-width` values and use flexible layouts.

### Issue: Language not persisting on refresh
**Solution:** Ensure LanguageProvider wraps the entire app in layout.tsx.

## Future Enhancements

- [ ] Add more languages
- [ ] RTL support for Arabic/Urdu if needed
- [ ] Language auto-detection based on browser settings
- [ ] SEO hreflang tags for bilingual indexing
- [ ] Animated language switch transitions
- [ ] Language-specific SEO metadata

## Testing Checklist

- [ ] Language toggle works on all pages
- [ ] Preference persists after refresh
- [ ] Nepali text displays correctly
- [ ] Mobile responsiveness verified
- [ ] All buttons/forms translate
- [ ] Navigation links work in both languages
- [ ] Footer content translates
- [ ] Hero section displays properly in Nepali
- [ ] No layout shifts on language change
- [ ] Accessibility maintained (alt text, aria labels)

## Support

For adding new sections or components, follow the pattern:
1. Mark component as `"use client"`
2. Import `useTranslation` hook
3. Get `{ t, language }` from hook
4. Use `t("key.path")` for text
5. Add conditional styling for Nepali with `${language === "ne" ? "...classes..." : ""}`
