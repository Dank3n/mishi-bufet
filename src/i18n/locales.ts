export const locales = ["ro", "en", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<
  Locale,
  { short: string; native: string; flag: string }
> = {
  ro: { short: "RO", native: "Română", flag: "RO" },
  en: { short: "EN", native: "English", flag: "EN" },
  ru: { short: "RU", native: "Русский", flag: "RU" },
  zh: { short: "中文", native: "中文", flag: "ZH" },
};

export const defaultLocale: Locale = "ro";
