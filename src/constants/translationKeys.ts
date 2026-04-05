/**
 * Translation Keys Reference
 *
 * This file documents all available translation keys in the system.
 * Use these keys with the t() function from useTranslation hook.
 *
 * Example:
 * const { t } = useTranslation();
 * <p>{t("nav.home")}</p>
 */

export const TRANSLATION_KEYS = {
  // Navigation
  nav: {
    home: "nav.home",
    about: "nav.about",
    products: "nav.products",
    blogs: "nav.blogs",
    gallery: "nav.gallery",
    becomePartner: "nav.becomePartner",
    farming: "nav.farming",
    soilSolutions: "nav.soilSolutions",
    contact: "nav.contact",
    getInTouch: "nav.getInTouch",
  },

  // Hero Section
  hero: {
    title: "hero.title",
    subtitle: "hero.subtitle",
    cta: "hero.cta",
  },

  // Home Page
  home: {
    partnerBenefits: {
      title: "home.partnerBenefits.title",
      benefits: "home.partnerBenefits.benefits", // Array
    },
    farmingHighlights: {
      title: "home.farmingHighlights.title",
      highlights: "home.farmingHighlights.highlights", // Array
    },
    soilSolutions: {
      title: "home.soilSolutions.title",
      highlights: "home.soilSolutions.highlights", // Array
    },
    latestBlogs: "home.latestBlogs",
    featuredPartners: "home.featuredPartners",
  },

  // About Page
  about: {
    title: "about.title",
    description: "about.description",
    mission: "about.mission",
    missionText: "about.missionText",
  },

  // Products Page
  products: {
    title: "products.title",
    description: "products.description",
    viewDetails: "products.viewDetails",
    price: "products.price",
  },

  // Blogs Page
  blogs: {
    title: "blogs.title",
    description: "blogs.description",
    readMore: "blogs.readMore",
  },

  // Gallery Page
  gallery: {
    title: "gallery.title",
    description: "gallery.description",
  },

  // Contact Page
  contact: {
    title: "contact.title",
    description: "contact.description",
    name: "contact.name",
    email: "contact.email",
    message: "contact.message",
    submit: "contact.submit",
    phone: "contact.phone",
    location: "contact.location",
  },

  // Footer
  footer: {
    company: "footer.company",
    support: "footer.support",
    products: "footer.products",
    about: "footer.about",
    becomePartner: "footer.becomePartner",
    farming: "footer.farming",
    soilSolutions: "footer.soilSolutions",
    contact: "footer.contact",
    blogs: "footer.blogs",
    copyright: "footer.copyright",
  },

  // Common
  common: {
    loading: "common.loading",
    error: "common.error",
    back: "common.back",
    next: "common.next",
    previous: "common.previous",
  },
};

/**
 * Helper function to type-check translation keys
 * Ensures you're using valid keys
 */
export function isValidTranslationKey(key: string): boolean {
  const keys = Object.values(TRANSLATION_KEYS);
  return keys.some((k) => {
    if (typeof k === "string") {
      return k === key;
    }
    if (typeof k === "object") {
      return Object.values(k).some((v) => {
        if (typeof v === "string") return v === key;
        if (typeof v === "object") {
          return Object.values(v).includes(key);
        }
        return false;
      });
    }
    return false;
  });
}
