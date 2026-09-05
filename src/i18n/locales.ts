export const locales = ["ro", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<
  Locale,
  { short: string; native: string; flag: string }
> = {
  ro: { short: "RO", native: "Română", flag: "RO" },
  en: { short: "EN", native: "English", flag: "EN" },
  ja: { short: "日本語", native: "日本語", flag: "JA" },
  zh: { short: "中文", native: "中文", flag: "ZH" },
};

export const defaultLocale: Locale = "ro";
