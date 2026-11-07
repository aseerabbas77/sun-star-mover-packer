import type { MetadataRoute } from "next";
import { hrefLang, localePath, locales } from "@/i18n/config";
import { areas } from "@/lib/areas";
import { serviceSlugs } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/areas", priority: 0.85, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  ];

  const servicePaths = serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.88,
    changeFrequency: "weekly" as const,
  }));

  const areaPaths = areas.map((area) => ({
    path: `/areas/${area.slug}`,
    priority: 0.82,
    changeFrequency: "monthly" as const,
  }));

  const allRoutes = [...staticPaths, ...servicePaths, ...areaPaths];

  return allRoutes.flatMap(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[hrefLang[l]] = absoluteUrl(localePath(l, path));
    }
    languages["x-default"] = absoluteUrl(localePath("en", path));

    return locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
