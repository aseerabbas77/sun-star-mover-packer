/**
 * Central business configuration for Sun Star Movers and Packers All UAE.
 * Update these values once and they propagate to every page, metadata tag,
 * JSON-LD schema, WhatsApp link, and call button across the website.
 */
function normalizeSiteUrl(raw?: string): string {
  const trimmed = (raw || "").trim().replace(/\/+$/, "");
  if (!trimmed) return "https://sunstarmoversuae.com";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "https://sunstarmoversuae.com";
  }
}

export const site = {
  name: "Sun Star Movers and Packers All UAE",
  shortName: "Sun Star Movers",
  arabicName: "شركة صن ستار لنقل وتغليف الأثاث في الإمارات",
  tagline: "Top-Rated Movers & Packers Across All UAE",
  slogan: "Fast • Safe • Affordable",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "Sun Star Movers and Packers is a top-rated professional moving company in the UAE offering expert house, villa, apartment, and office shifting, furniture packing, professional carpenter assembly, and 24/7 safe transport across Dubai, Sharjah, Ajman, Abu Dhabi, and all Emirates.",
  phoneDisplay: "054 757 5634",
  phoneLocal: "0547575634",
  phoneIntl: "+971547575634",
  whatsappNumber: "971547575634",
  email: "info@sunstarmoversuae.com",
  gmapsUrl:
    "https://www.google.com/maps/place/Sun+star+movers+and+Packers+All+UAE/@25.3082781,55.4524904,12z/data=!4m16!1m9!3m8!1s0x60df6c567bce9277:0x36958a925f6ffc9!2sSun+star+movers+and+Packers+All+UAE!8m2!3d25.3082781!4d55.4524904!9m1!1b1!16s%2Fg%2F11mlsrz0fm!3m5!1s0x60df6c567bce9277:0x36958a925f6ffc9!8m2!3d25.3082781!4d55.4524904!16s%2Fg%2F11mlsrz0fm",
  address: {
    street: "Muwaileh Commercial / Industrial Area",
    city: "Sharjah & Dubai",
    region: "All UAE",
    postalCode: "00000",
    country: "AE",
    countryName: "United Arab Emirates",
  },
  geo: {
    lat: 25.3082781,
    lng: 55.4524904,
  },
  hours: "Open 24/7 — 7 days a week",
  stats: {
    moves: "8,500+",
    years: "12+",
    rating: "4.9",
    reviews: "1,240+",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },
} as const;

export const whatsappLink = (message?: string, locale: "en" | "ar" = "en") =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    message ??
      (locale === "ar"
        ? "مرحباً شركة صن ستار لنقل الأثاث! أرغب في الحصول على عرض سعر مجاني لنقل وتغليف الأثاث."
        : "Hello Sun Star Movers! I would like to get a free quote for moving and packing services in the UAE."),
  )}`;

export const telLink = `tel:${site.phoneIntl}`;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/areas", key: "areas" },
  { href: "/gallery", key: "gallery" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;
