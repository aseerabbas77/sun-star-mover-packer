import type { Metadata } from "next";
import { hrefLang, locales, ogLocale, type Locale, localePath } from "@/i18n/config";
import { absoluteUrl, site } from "./site";

type BuildMetaInput = {
  locale: Locale;
  /** Path WITHOUT locale prefix, e.g. "/about" or "/" */
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

/**
 * Builds page metadata with a self-referencing canonical URL,
 * hreflang alternates (en-AE, ar-AE, x-default), Open Graph and Twitter cards.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/sun-star-google-maps-hero.jpg",
  imageAlt,
  absoluteTitle = true,
}: BuildMetaInput): Metadata {
  const canonical = absoluteUrl(localePath(locale, path));
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hrefLang[l]] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath("en", path));

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: locale === "ar" ? site.arabicName : site.name,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: image, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
