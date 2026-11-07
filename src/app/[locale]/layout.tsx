import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { JsonLd } from "@/components/JsonLd";
import { RevealInit } from "@/components/RevealInit";
import { isLocale, localeDir, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getServices } from "@/lib/catalog";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0e0f14",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.pages.home.metaTitle,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.pages.home.metaDescription,
    applicationName: dict.brand.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const services = getServices(locale);
  const dir = localeDir(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap"
        />
      </head>
      <body className="min-h-dvh flex flex-col font-sans bg-white text-ink-700">
        <JsonLd
          data={[
            localBusinessSchema(
              locale,
              services.map((s) => s.title),
            ),
            websiteSchema(locale),
          ]}
        />
        <RevealInit />
        <Header
          locale={locale}
          dict={{
            switchTo: dict.switchTo,
            brand: dict.brand,
            nav: dict.nav,
            cta: dict.cta,
            common: dict.common,
          }}
          services={services.map(({ slug, shortTitle, excerpt, icon }) => ({
            slug,
            shortTitle,
            excerpt,
            icon,
          }))}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} services={services} />
        <FloatingActions locale={locale} cta={dict.cta} />
      </body>
    </html>
  );
}
