import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { areas } from "@/lib/areas";
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
    path: "/areas",
    title: dict.pages.areas.metaTitle,
    description: dict.pages.areas.metaDescription,
  });
}

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
          { name: dict.nav.areas, path: localePath(locale, "/areas") },
        ])}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.areas }]}
        title={dict.pages.areas.title}
        subtitle={dict.pages.areas.subtitle}
      />

      <section className="py-16 sm:py-24 bg-ink-50">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={localePath(locale, `/areas/${area.slug}`)}
              data-reveal
              className="group flex flex-col justify-between rounded-3xl border border-ink-100 bg-white p-6 shadow-xs hover:border-brand-500 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700 group-hover:bg-brand-500 group-hover:text-ink-950 transition-colors">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <h2 className="font-display text-xl font-extrabold text-ink-950">
                    {area.name[locale]}
                  </h2>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed">{area.note[locale]}</p>
              </div>

              <span className="mt-5 pt-4 border-t border-ink-100 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-950 group-hover:text-brand-600">
                <span>{dict.cta.learnMore}</span>
                <Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
