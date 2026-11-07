import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Headphones,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ServiceCard } from "@/components/ServiceCard";
import { VideoShowcase } from "@/components/VideoShowcase";
import { GalleryGrid } from "@/components/GalleryGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { areas } from "@/lib/areas";
import { getServices } from "@/lib/catalog";
import { galleryImages, videos } from "@/lib/media";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

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
    path: "/",
    title: dict.pages.home.metaTitle,
    description: dict.pages.home.metaDescription,
    imageAlt: dict.hero.imageAlt,
  });
}

const whyIcons = [ShieldCheck, Clock, Award, Wrench, Truck, Headphones];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const services = getServices(locale);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const waUrl = whatsappLink(undefined, locale);

  return (
    <>
      <JsonLd data={faqSchema(dict.faqSection.items)} />

      {/* 1. Hero */}
      <Hero locale={locale} dict={dict} />

      {/* 2. Infinite Marquee */}
      <Marquee items={dict.marquee} locale={locale} />

      {/* 3. Trust Metrics + Instant WhatsApp Quote Form */}
      <section id="quote" className="py-16 sm:py-24 bg-ink-50 bg-dots scroll-mt-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-6 space-y-6">
            <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
              {dict.brand.tagline}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight leading-tight">
              {dict.why.title}
            </h2>
            <p className="text-base text-ink-600 leading-relaxed">{dict.why.subtitle}</p>

            {/* 4 Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-2xl bg-white p-4 border border-ink-100 shadow-xs">
                <p className="font-display text-2xl sm:text-3xl font-black text-ink-950" dir="ltr">
                  {site.stats.moves}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-500">{dict.stats.moves}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 border border-ink-100 shadow-xs">
                <p className="font-display text-2xl sm:text-3xl font-black text-ink-950" dir="ltr">
                  {site.stats.years}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-500">{dict.stats.years}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 border border-ink-100 shadow-xs">
                <p className="font-display text-2xl sm:text-3xl font-black text-brand-600" dir="ltr">
                  {site.stats.rating}★
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-500">{dict.stats.rating}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 border border-ink-100 shadow-xs">
                <p className="font-display text-2xl sm:text-3xl font-black text-ink-950" dir="ltr">
                  24/7
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-500">{dict.stats.support}</p>
              </div>
            </div>

            {/* Real Action Photo Collage */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-ink-200 shadow-md">
                <Image
                  src="/images/professional-furniture-packing-uae.jpg"
                  alt={dict.galleryItems["professional-furniture-packing-uae"] || "Professional furniture packing"}
                  width={1448}
                  height={1086}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-ink-200 shadow-md">
                <Image
                  src="/images/bed-assembly-furniture-installation-uae.jpg"
                  alt={dict.galleryItems["bed-assembly-furniture-installation-uae"] || "Bed assembly and carpentry"}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Direct Call/WhatsApp Box */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-5 py-3 text-sm font-extrabold text-white shadow-md transition-colors"
              >
                <WhatsAppIcon className="size-5" />
                <span>{dict.cta.chat}</span>
              </a>
              <a
                href={telLink}
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-xl bg-ink-950 hover:bg-ink-800 px-5 py-3 text-sm font-extrabold text-white transition-colors"
              >
                <Phone className="size-4 text-brand-400" aria-hidden />
                <span>{site.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-6">
            <QuoteForm
              form={dict.form}
              serviceOptions={services.map(({ slug, shortTitle }) => ({ slug, shortTitle }))}
            />
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x">
          <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
                {dict.servicesSection.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
                {dict.servicesSection.title}
              </h2>
              <p className="mt-3 text-base text-ink-500">{dict.servicesSection.subtitle}</p>
            </div>

            <Link
              href={localePath(locale, "/services")}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 hover:border-brand-500 hover:bg-brand-50 px-5 py-3 text-sm font-extrabold text-ink-950 transition-colors self-start md:self-auto"
            >
              <span>{dict.cta.viewAll}</span>
              <Arrow className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <ServiceCard
                key={srv.slug}
                service={srv}
                locale={locale}
                learnMoreLabel={dict.cta.learnMore}
                whatsappLabel={dict.common.whatsapp}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 sm:py-24 bg-ink-50 border-y border-ink-100">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white aspect-3/4 max-w-md mx-auto">
              <Image
                src="/images/wardrobe-installation-uae.jpg"
                alt={dict.galleryItems["wardrobe-installation-uae"] || "Wardrobe installation"}
                width={1200}
                height={1600}
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink-950/90 backdrop-blur p-4 border border-white/10">
                <p className="font-display text-2xl font-black text-brand-400" dir="ltr">
                  {site.stats.years}
                </p>
                <p className="text-sm font-bold text-white">{dict.why.experience}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div data-reveal className="max-w-2xl mb-8">
              <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
                {dict.why.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
                {dict.why.title}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {dict.why.items.map((item, idx) => {
                const Icon = whyIcons[idx % whyIcons.length];
                return (
                  <div
                    key={item.title}
                    data-reveal
                    className="rounded-2xl bg-white p-5 border border-ink-100 shadow-xs hover:shadow-lg hover:border-brand-400/60 transition-all"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700 mb-3.5">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-base font-extrabold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. 4-Step Moving Process + Real Work Videos (Dark Asphalt Showcase) */}
      <section className="py-16 sm:py-24 bg-ink-950 bg-grid text-white">
        <div className="container-x space-y-20">
          {/* Process Steps */}
          <div>
            <div data-reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block rounded-full bg-brand-500/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-400">
                {dict.process.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {dict.process.title}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dict.process.steps.map((step, i) => (
                <div
                  key={step.title}
                  data-reveal
                  className="relative rounded-2xl border border-white/10 bg-ink-900/80 p-6 hover:border-brand-400/50 transition-colors"
                >
                  <span
                    dir="ltr"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-500 font-display text-lg font-black text-ink-950 mb-4 shadow-lg shadow-brand-500/20"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-300 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Work Video Reels */}
          {videos.length > 0 && (
            <div>
              <div data-reveal className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-block rounded-full bg-brand-500/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-400">
                  {dict.videos.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {dict.videos.title}
                </h2>
                <p className="mt-3 text-base text-ink-300">{dict.videos.subtitle}</p>
              </div>

              <VideoShowcase labelPrefix={dict.videos.label} />
            </div>
          )}
        </div>
      </section>

      {/* 7. Real Photo Gallery Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x">
          <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
                {dict.galleryPreview.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
                {dict.galleryPreview.title}
              </h2>
              <p className="mt-3 text-base text-ink-500">{dict.galleryPreview.subtitle}</p>
            </div>

            <Link
              href={localePath(locale, "/gallery")}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 hover:border-brand-500 hover:bg-brand-50 px-5 py-3 text-sm font-extrabold text-ink-950 transition-colors self-start md:self-auto"
            >
              <span>{dict.cta.fullGallery}</span>
              <Arrow className="size-4" aria-hidden />
            </Link>
          </div>

          <GalleryGrid images={galleryImages.slice(0, 6)} captions={dict.galleryItems} />
        </div>
      </section>

      {/* 8. Areas We Serve Across Abu Dhabi */}
      <section className="py-16 sm:py-24 bg-ink-50 border-y border-ink-100">
        <div className="container-x">
          <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
                {dict.areasSection.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
                {dict.areasSection.title}
              </h2>
              <p className="mt-3 text-base text-ink-500">{dict.areasSection.subtitle}</p>
            </div>

            <Link
              href={localePath(locale, "/areas")}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white hover:border-brand-500 px-5 py-3 text-sm font-extrabold text-ink-950 transition-colors self-start md:self-auto"
            >
              <span>{dict.cta.allAreas}</span>
              <Arrow className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={localePath(locale, `/areas/${area.slug}`)}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-ink-200/80 bg-white p-4 shadow-xs hover:border-brand-500 hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700 group-hover:bg-brand-500 group-hover:text-ink-950 transition-colors">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <span className="font-display text-sm font-extrabold text-ink-950 truncate">
                    {area.name[locale]}
                  </span>
                </span>
                <Arrow className="size-4 text-ink-400 group-hover:text-brand-600 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials (8 to 10 Verified Google Reviews) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
              {dict.testimonials.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
              {dict.testimonials.title}
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1 text-brand-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-brand-500" aria-hidden />
                ))}
              </div>
              <span className="text-sm font-black text-ink-950">4.9 / 5.0</span>
              <span className="text-sm text-ink-500">•</span>
              <span className="text-sm font-semibold text-ink-600">
                {locale === "ar" ? "أكثر من 1,240 تقييم معتمد على خرائط جوجل" : "Based on 1,240+ verified Google Reviews"}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.testimonials.items.map((t, index) => (
              <figure
                key={t.name + index}
                data-reveal
                className="flex flex-col justify-between rounded-3xl border border-ink-100 bg-ink-50/70 p-6 shadow-xs hover:shadow-xl hover:border-brand-400/50 hover:bg-white transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5 text-brand-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-brand-500" aria-hidden />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="size-3 text-emerald-600" aria-hidden />
                      <span>{locale === "ar" ? "تقييم معتمد" : "Verified"}</span>
                    </span>
                  </div>
                  <blockquote className="text-sm text-ink-700 leading-relaxed font-normal">
                    “{t.text}”
                  </blockquote>
                </div>

                <figcaption className="mt-5 pt-4 border-t border-ink-200/70 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ink-900 to-ink-950 text-sm font-extrabold text-brand-400 shadow-xs">
                    {t.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-ink-950 truncate">{t.name}</p>
                    <p className="text-xs text-ink-500 flex items-center gap-1 truncate">
                      <MapPin className="size-3 text-brand-600 shrink-0" aria-hidden />
                      <span className="truncate">{t.place}</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <section className="py-16 sm:py-24 bg-ink-50 border-t border-ink-100">
        <div className="container-x max-w-4xl">
          <div data-reveal className="text-center mb-10">
            <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700">
              {dict.faqSection.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
              {dict.faqSection.title}
            </h2>
            <p className="mt-3 text-base text-ink-500">{dict.faqSection.subtitle}</p>
          </div>

          <FaqAccordion items={dict.faqSection.items} />
        </div>
      </section>

      {/* 11. Final CTA Band */}
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
