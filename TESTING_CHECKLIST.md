# ✅ Testing Checklist - Bilingual Implementation

## Browser Testing

### Desktop (localhost:3000)

- [ ] **Page Loads**
  - [ ] Homepage renders without errors
  - [ ] No console errors in DevTools
  - [ ] All images load correctly

- [ ] **Language Toggle Button**
  - [ ] Button visible in top-right of navbar
  - [ ] Button shows "EN | नेपाली"
  - [ ] Click toggles between English and Nepali
  - [ ] Page content updates immediately (no reload)
  - [ ] Toggle is responsive and clickable

- [ ] **English Content (Default)**
  - [ ] Navbar links in English
  - [ ] Hero title and CTA buttons in English
  - [ ] Hero stats text in English
  - [ ] Footer content in English
  - [ ] All text readable with proper spacing

- [ ] **Nepali Content**
  - [ ] Click toggle to switch to Nepali
  - [ ] All text switches to Devanagari script
  - [ ] Nepali text renders clearly and legibly
  - [ ] Fonts load from `Noto Sans Devanagari`
  - [ ] Text spacing and line height appear correct
  - [ ] No corrupted or garbled Nepali characters
  - [ ] Nepali links work correctly

- [ ] **Font Rendering**
  - [ ] English uses clean sans-serif (DM Sans)
  - [ ] Nepali uses proper Devanagari fonts
  - [ ] No font fallback issues visible
  - [ ] Characters render sharply at all sizes
  - [ ] Diacritics display correctly
  - [ ] Numbers readable in both languages

- [ ] **Navigation**
  - [ ] All nav links clickable in English
  - [ ] All nav links clickable in Nepali
  - [ ] Active page indicator works
  - [ ] Hover states visible and responsive

### Mobile (Responsive Design)

- [ ] **Hamburger Menu**
  - [ ] Menu icon visible on small screens
  - [ ] Menu opens on click
  - [ ] Menu closes on click
  - [ ] Navigation links visible in menu
  - [ ] Language toggle button visible in menu

- [ ] **Mobile Language Toggle**
  - [ ] Toggle button visible in collapsed menu
  - [ ] Toggle positioned appropriately
  - [ ] Works with same functionality as desktop
  - [ ] Labels clear on small screens

- [ ] **Text Responsiveness**
  - [ ] No horizontal scrolling needed
  - [ ] Text wraps appropriately
  - [ ] Nepali text doesn't break awkwardly
  - [ ] Hero section stacks on mobile
  - [ ] Cards and buttons sized appropriately

- [ ] **Portrait/Landscape**
  - [ ] Works in portrait orientation
  - [ ] Works in landscape orientation
  - [ ] Toggle visible in both orientations
  - [ ] No layout shifts on orientation change

### Tablets

- [ ] **Layout**
  - [ ] Content properly centered
  - [ ] Navigation accessible
  - [ ] Toggle button visible and functional
  - [ ] Text readable at tablet resolution

## Persistence Testing

- [ ] **Language Preference Saved**
  - [ ] Switch to Nepali
  - [ ] Refresh page (F5 or Cmd+R)
  - [ ] Page loads in Nepali
  - [ ] Switch to English
  - [ ] Refresh page
  - [ ] Page loads in English

- [ ] **Local Storage**
  - [ ] Open DevTools → Storage → Local Storage
  - [ ] Find "language" key
  - [ ] Value is "en" after switching to English
  - [ ] Value is "ne" after switching to Nepali

- [ ] **New Tab**
  - [ ] Set language preference to Nepali
  - [ ] Open new tab and go to localhost:3000
  - [ ] New tab loads in Nepali (remembers preference)

- [ ] **Clear Cache**
  - [ ] Set language to Nepali
  - [ ] Clear browser cache (Cmd+Shift+Delete)
  - [ ] Refresh page
  - [ ] Loads in default English (cache cleared)

## Content Translation

### Navigation

- [ ] **Nav Links**
  - [ ] "Home" ↔ "होम"
  - [ ] "Products" ↔ "उत्पादनहरू"
  - [ ] "About" ↔ "बारे"
  - [ ] "Blogs" ↔ "ब्लगहरू"
  - [ ] "Contact" ↔ "संपर्क"

### Hero Section

- [ ] **Hero Title**
  - [ ] English: "Premium Organic Supplements"
  - [ ] Nepali: "प्रिमियम अर्गानिक पूरकहरू"
  - [ ] Text centered and readable

- [ ] **Hero CTA**
  - [ ] English: "Explore Our Collection"
  - [ ] Nepali: "हाम्रो संग्रह अन्वेषण गर्नुहोस्"
  - [ ] Button clickable in both languages

- [ ] **Hero Stats**
  - [ ] Number displays same in both languages
  - [ ] Labels translate correctly
  - [ ] Layout doesn't break with different text lengths

### Footer

- [ ] **Company Section**
  - [ ] English: "About Our Company" section
  - [ ] Nepali: "हाम्रो कम्पनीको बारे" section
  - [ ] Both have proper links

- [ ] **Links**
  - [ ] All footer links translate
  - [ ] Links are functional in both languages
  - [ ] Link order consistent

- [ ] **Copyright**
  - [ ] Shows "© 2024" or current year
  - [ ] Copyright text translates if applicable

## Accessibility

- [ ] **Keyboard Navigation**
  - [ ] Tab through all elements (English)
  - [ ] Tab through all elements (Nepali)
  - [ ] Focus visible on all buttons
  - [ ] Language toggle keyboard accessible

- [ ] **Screen Reader** (if available)
  - [ ] Page title announced
  - [ ] Navigation structure understood
  - [ ] Images have alt text or are marked decorative
  - [ ] Buttons have proper labels

- [ ] **Color Contrast**
  - [ ] Text readable on background
  - [ ] Button text contrasts with button color
  - [ ] Links distinguishable from regular text

## Performance

- [ ] **Page Load Speed**
  - [ ] Homepage loads quickly
  - [ ] No noticeable delay on language toggle
  - [ ] Fonts load without blocking render

- [ ] **No Network Errors**
  - [ ] Open DevTools → Network tab
  - [ ] No 404 errors
  - [ ] No failed font requests
  - [ ] HTTP 200 on all requests

- [ ] **Bundle Size**
  - [ ] Translation files are appropriately sized
  - [ ] No duplicate data loaded
  - [ ] CSS file sizes reasonable

## Edge Cases

- [ ] **Very Long Text**
  - [ ] Navbar doesn't overflow with long titles
  - [ ] Hero text wraps appropriately
  - [ ] Footer text doesn't overflow

- [ ] **Special Characters**
  - [ ] Nepali nukta (्) displays correctly
  - [ ] Matras display properly
  - [ ] Nepali numbers display if used

- [ ] **Bidrectional Text** (if applicable)
  - [ ] Left-to-right works for English
  - [ ] Left-to-right works for Nepali
  - [ ] No text direction issues

- [ ] **RTL Languages** (future-proofing)
  - [ ] Structure ready for RTL if needed
  - [ ] CSS doesn't prevent RTL addition

## Browser Compatibility

- [ ] **Chrome/Chromium**
  - [ ] All features work
  - [ ] Fonts render correctly

- [ ] **Firefox**
  - [ ] All features work
  - [ ] Fonts render correctly

- [ ] **Safari**
  - [ ] All features work
  - [ ] Fonts render correctly

- [ ] **Edge**
  - [ ] All features work
  - [ ] Fonts render correctly

## Code Quality

- [ ] **Console Warnings**
  - [ ] No React warnings
  - [ ] No TypeScript errors
  - [ ] No 404s in console

- [ ] **TypeScript Build**
  - [ ] `bun run build` succeeds
  - [ ] `bun run dev` starts without errors
  - [ ] No type errors on hover in editor

## Component-Specific Testing

### Navbar

- [ ] **Desktop View**
  - [ ] Logo visible left side
  - [ ] Nav links centered
  - [ ] Toggle button right side
  - [ ] All clickable

- [ ] **Mobile View**
  - [ ] Hamburger menu visible
  - [ ] Logo visible
  - [ ] Menu expands properly
  - [ ] Toggle in menu works

### Hero

- [ ] **Desktop Layout**
  - [ ] Image on one side
  - [ ] Text on other side
  - [ ] Properly balanced

- [ ] **Mobile Layout**
  - [ ] Image on top
  - [ ] Text below
  - [ ] Stacked properly

### Hero Stats

- [ ] **Number Alignment**
  - [ ] Numbers column-aligned
  - [ ] Labels below numbers
  - [ ] Spacing consistent

- [ ] **Responsive Stats**
  - [ ] Stats stack on mobile
  - [ ] Readable at any size

### Footer

- [ ] **Desktop Layout**
  - [ ] Multi-column layout
  - [ ] Products list visible
  - [ ] Links organized by section

- [ ] **Mobile Layout**
  - [ ] Single column
  - [ ] All sections visible
  - [ ] Collapsible sections if needed

## Documentation Verification

- [ ] **README Files**
  - [ ] QUICK_REFERENCE.md is helpful
  - [ ] Code examples work as shown
  - [ ] API documented correctly

- [ ] **Comments in Code**
  - [ ] Key functions have comments
  - [ ] Complex logic explained
  - [ ] Translation keys documented

## Final Sign-Off

- [ ] **All items above checked**
- [ ] **No blocking issues found**
- [ ] **Ready for production** ✅

---

## Quick Test Script

Run this to verify core functionality:

```bash
# 1. Clear cache and start fresh
rm -rf .next
bun run dev

# 2. Open http://localhost:3000
# 3. Check language toggle works
# 4. Verify localStorage: localStorage.getItem("language")
# 5. Check both English and Nepali render
# 6. Test on mobile viewport (F12 → Toggle Device Toolbar)
```

## Issue Reporting Format

If you find a bug, report in this format:

```
**Page**: [URL path]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Screen Size**: [Desktop/Mobile/Tablet size]
**Language**: [English/Nepali]
**Issue**: [Description]
**Steps to Reproduce**:
1.
2.
3.

**Expected**: [What should happen]
**Actual**: [What happens instead]
**Screenshots**: [If applicable]
```
