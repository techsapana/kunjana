export type LocalizedText = {
  en: string;
  ne: string;
};

export type LocalizedStringList = {
  en: string[];
  ne: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toCleanString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const toCleanStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
};

export const getLocalizedText = (
  i18nValue: unknown,
  fallbackValue = "",
): LocalizedText => {
  if (typeof i18nValue === "string") {
    const value = i18nValue.trim() || fallbackValue.trim();
    return { en: value, ne: value };
  }

  if (!isRecord(i18nValue)) {
    const fallback = fallbackValue.trim();
    return { en: fallback, ne: fallback };
  }

  const en = toCleanString(i18nValue.en) || fallbackValue.trim();
  const ne = toCleanString(i18nValue.ne) || en;

  return { en, ne };
};

export const getLocalizedStringList = (
  i18nValue: unknown,
  fallbackValue: string[] = [],
): LocalizedStringList => {
  if (Array.isArray(i18nValue)) {
    const values = toCleanStringArray(i18nValue);
    return {
      en: values.length > 0 ? values : fallbackValue,
      ne: values.length > 0 ? values : fallbackValue,
    };
  }

  if (!isRecord(i18nValue)) {
    return {
      en: fallbackValue,
      ne: fallbackValue,
    };
  }

  const en = toCleanStringArray(i18nValue.en);
  const ne = toCleanStringArray(i18nValue.ne);
  const resolvedEn = en.length > 0 ? en : fallbackValue;

  return {
    en: resolvedEn,
    ne: ne.length > 0 ? ne : resolvedEn,
  };
};

export const toLocalizedTextPayload = (
  value: unknown,
  fallbackValue = "",
): LocalizedText => {
  const normalized = getLocalizedText(value, fallbackValue);

  return {
    en: normalized.en,
    ne: normalized.ne || normalized.en,
  };
};

export const toLocalizedStringListPayload = (
  value: unknown,
  fallbackValue: string[] = [],
): LocalizedStringList => {
  const normalized = getLocalizedStringList(value, fallbackValue);

  return {
    en: normalized.en,
    ne: normalized.ne.length > 0 ? normalized.ne : normalized.en,
  };
};

export const pickLocalizedText = (
  value: LocalizedText | string,
  language: "en" | "ne",
) => {
  if (typeof value === "string") {
    return value;
  }

  return language === "ne" ? value.ne || value.en : value.en || value.ne;
};

export const pickLocalizedStringList = (
  value: LocalizedStringList | string[],
  language: "en" | "ne",
) => {
  if (Array.isArray(value)) {
    return value;
  }

  const selected = language === "ne" ? value.ne : value.en;
  return selected.length > 0
    ? selected
    : language === "ne"
      ? value.en
      : value.ne;
};
