export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeDir = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

export const ogLocale: Record<Locale, string> = { en: "en_AE", ar: "ar_AE" };

export const hrefLang: Record<Locale, string> = { en: "en-AE", ar: "ar-AE" };

/** Prefixes an internal path with the locale, e.g. ("/about", "ar") -> "/ar/about" */
export const localePath = (locale: Locale, path = "/") => {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
};
