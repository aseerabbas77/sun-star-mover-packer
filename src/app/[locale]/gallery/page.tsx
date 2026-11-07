import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { VideoShowcase } from "@/components/VideoShowcase";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { galleryImages, videos } from "@/lib/media";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/gallery",
    title: dict.pages.gallery.metaTitle,
    description: dict.pages.gallery.metaDescription,
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
          { name: dict.nav.gallery, path: localePath(locale, "/gallery") },
        ])}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.gallery }]}
        title={dict.pages.gallery.title}
        subtitle={dict.pages.gallery.subtitle}
      />

      {/* Photos Section */}
      <section className="py-16 sm:py-22 bg-white">
        <div className="container-x">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-950 mb-8">
            {dict.pages.gallery.photos}
          </h2>
          <GalleryGrid images={galleryImages} captions={dict.galleryItems} />
        </div>
      </section>

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="py-16 sm:py-22 bg-ink-950 bg-grid text-white">
          <div className="container-x">
            <div className="mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
                {dict.pages.gallery.videos}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-300">{dict.videos.subtitle}</p>
            </div>
            <VideoShowcase labelPrefix={dict.videos.label} />
          </div>
        </section>
      )}

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
