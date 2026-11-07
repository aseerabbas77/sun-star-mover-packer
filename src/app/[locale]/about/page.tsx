import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Compass, Eye, HeartHandshake, ShieldCheck, Timer, Zap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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
    path: "/about",
    title: dict.pages.about.metaTitle,
    description: dict.pages.about.metaDescription,
  });
}

const valIcons = [ShieldCheck, Zap, Timer, HeartHandshake];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const p = dict.pages.about;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
          { name: dict.nav.about, path: localePath(locale, "/about") },
        ])}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.about }]}
        title={p.title}
        subtitle={p.subtitle}
      />

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-6 space-y-5">
            <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
              {p.storyEyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
              {p.storyTitle}
            </h2>
            {p.story.map((para, i) => (
              <p key={i} className="text-base text-ink-600 leading-relaxed">
                {para}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="rounded-2xl bg-ink-50 p-4 border border-ink-100">
                <p className="font-display text-2xl font-black text-ink-950" dir="ltr">
                  {site.stats.moves}
                </p>
                <p className="text-xs font-semibold text-ink-500 mt-1">{dict.stats.moves}</p>
              </div>
              <div className="rounded-2xl bg-ink-50 p-4 border border-ink-100">
                <p className="font-display text-2xl font-black text-ink-950" dir="ltr">
                  {site.stats.years}
                </p>
                <p className="text-xs font-semibold text-ink-500 mt-1">{dict.stats.years}</p>
              </div>
              <div className="rounded-2xl bg-ink-50 p-4 border border-ink-100">
                <p className="font-display text-2xl font-black text-brand-600" dir="ltr">
                  {site.stats.rating}★
                </p>
                <p className="text-xs font-semibold text-ink-500 mt-1">{dict.stats.rating}</p>
              </div>
            </div>
          </div>

          <div data-reveal className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 relative aspect-16/9 overflow-hidden rounded-3xl shadow-xl border border-ink-100">
              <Image
                src="/images/sun-star-real-move-1.jpg"
                alt={dict.galleryItems["sun-star-real-move-1"] || "Sun Star Movers truck and packing crew"}
                width={800}
                height={493}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-md border border-ink-100">
              <Image
                src="/images/professional-furniture-packing-uae.jpg"
                alt={dict.galleryItems["professional-furniture-packing-uae"] || "Professional furniture packing"}
                width={1448}
                height={1086}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-md border border-ink-100">
              <Image
                src="/images/movers-loading-boxes-building-elevator.jpg"
                alt={dict.galleryItems["movers-loading-boxes-building-elevator"] || "Movers loading boxes"}
                width={1080}
                height={1080}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-ink-50 border-y border-ink-100">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <div data-reveal className="rounded-3xl bg-white p-8 border border-ink-100 shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 mb-4">
              <Compass className="size-6" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-extrabold text-ink-950">{p.missionTitle}</h2>
            <p className="mt-3 text-base text-ink-600 leading-relaxed">{p.mission}</p>
          </div>

          <div data-reveal className="rounded-3xl bg-ink-950 p-8 border border-white/10 shadow-xl text-white">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 mb-4">
              <Eye className="size-6" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-extrabold">{p.visionTitle}</h2>
            <p className="mt-3 text-base text-ink-200 leading-relaxed">{p.vision}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 text-center mb-12">
            {p.valuesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.values.map((v, idx) => {
              const Icon = valIcons[idx % valIcons.length];
              return (
                <div
                  key={v.title}
                  data-reveal
                  className="rounded-3xl border border-ink-100 bg-ink-50/60 p-6 text-center hover:border-brand-500 hover:bg-white hover:shadow-xl transition-all"
                >
                  <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 mb-4">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-ink-950">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
