import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { absoluteUrl, site } from "./site";
import { areas } from "./areas";

const businessId = `${site.url}/#business`;

export function localBusinessSchema(locale: Locale, serviceNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": businessId,
    name: site.name,
    alternateName: [site.arabicName, site.shortName],
    description: site.description,
    url: absoluteUrl(localePath(locale, "/")),
    logo: absoluteUrl("/icon.svg"),
    image: [absoluteUrl("/images/sun-star-google-maps-hero.jpg")],
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: "AED",
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    slogan: site.tagline,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    address: {
      "@type": "PostalAddress",
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Abu Dhabi" },
      ...areas.map((a) => ({ "@type": "Place", name: `${a.name.en}, Abu Dhabi` })),
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneIntl,
      contactType: "customer service",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic", "Urdu", "Hindi"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: serviceNames.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: locale === "ar" ? site.arabicName : site.name,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    publisher: { "@id": businessId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image),
    provider: { "@id": businessId },
    areaServed: { "@type": "Place", name: opts.areaName ?? "Abu Dhabi, United Arab Emirates" },
  };
}
