import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getService, getServices, serviceSlugs } from "@/lib/catalog";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const srv = getService(locale, slug);
  if (!srv) return {};

  return buildMetadata({
    locale,
    path: `/services/${srv.slug}`,
    title: srv.metaTitle,
    description: srv.metaDescription,
    image: srv.image,
    imageAlt: srv.imageAlt,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const srv = getService(locale, slug);
  if (!srv) notFound();

  const dict = getDictionary(locale);
  const allServices = getServices(locale);
  const p = dict.pages.service;
  const waMsg =
    locale === "ar"
      ? `مرحباً شركة صن ستار لنقل وتغليف الأثاث! أرغب في عرض سعر لخدمة: ${srv.title}`
      : `Hello Sun Star Movers! I would like a quote for: ${srv.title}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
            { name: dict.nav.services, path: localePath(locale, "/services") },
            { name: srv.title, path: localePath(locale, `/services/${srv.slug}`) },
          ]),
          serviceSchema({
            name: srv.title,
            description: srv.metaDescription,
            path: localePath(locale, `/services/${srv.slug}`),
            image: srv.image,
          }),
          faqSchema(srv.faqs),
        ]}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[
          { label: dict.nav.services, href: localePath(locale, "/services") },
          { label: srv.shortTitle },
        ]}
        title={srv.title}
        subtitle={srv.excerpt}
      />

      <section className="py-16 sm:py-22 bg-ink-50">
        <div className="container-x grid gap-10 lg:grid-cols-12 items-start">
          {/* Main Article */}
          <article className="lg:col-span-8 space-y-10">
            <div className="relative aspect-16/10 overflow-hidden rounded-3xl shadow-xl border border-ink-100 bg-ink-200">
              <Image
                src={srv.image}
                alt={srv.imageAlt}
                width={1200}
                height={750}
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink-100 shadow-xs space-y-4">
              <h2 className="font-display text-2xl font-extrabold text-ink-950">{p.overview}</h2>
              {srv.intro.map((para, idx) => (
                <p key={idx} className="text-base text-ink-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Included Features */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink-100 shadow-xs">
              <h2 className="font-display text-2xl font-extrabold text-ink-950 mb-5">
                {p.included}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3.5">
                {srv.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 rounded-2xl bg-ink-50 p-3.5 text-sm font-semibold text-ink-800"
                  >
                    <CheckCircle2 className="size-5 text-whatsapp shrink-0 mt-0.5" aria-hidden />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4-Step Process */}
            <div className="rounded-3xl bg-ink-950 p-6 sm:p-8 text-white shadow-xl">
              <h2 className="font-display text-2xl font-extrabold mb-6">{p.process}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {srv.process.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-ink-900 p-5"
                  >
                    <span
                      dir="ltr"
                      className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-500 font-display text-sm font-black text-ink-950 mb-3"
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-base font-extrabold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-300 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink-950 mb-5">{p.faq}</h2>
              <FaqAccordion items={srv.faqs} />
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Call/WhatsApp Box */}
            <div className="rounded-3xl bg-ink-950 p-6 text-white shadow-xl border border-white/10">
              <h3 className="font-display text-xl font-extrabold">{p.sidebarTitle}</h3>
              <p className="mt-1.5 text-sm text-ink-300">{p.sidebarText}</p>
              <div className="mt-5 grid gap-3">
                <a
                  href={whatsappLink(waMsg, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-5 py-3.5 text-sm font-extrabold text-white transition-colors"
                >
                  <WhatsAppIcon className="size-5" />
                  <span>{dict.cta.whatsapp}</span>
                </a>
                <a
                  href={telLink}
                  dir="ltr"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 px-5 py-3.5 text-sm font-extrabold text-ink-950 transition-colors"
                >
                  <Phone className="size-4" aria-hidden />
                  <span>{site.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <QuoteForm
              form={dict.form}
              serviceOptions={allServices.map(({ slug, shortTitle }) => ({ slug, shortTitle }))}
              defaultService={srv.shortTitle}
              compact
            />

            {/* Other Services Navigation */}
            <div className="rounded-3xl bg-white p-6 border border-ink-100 shadow-xs">
              <h3 className="font-display text-base font-extrabold text-ink-950 mb-3.5">
                {p.other}
              </h3>
              <ul className="space-y-1.5">
                {allServices.map((other) => {
                  const current = other.slug === srv.slug;
                  return (
                    <li key={other.slug}>
                      <Link
                        href={localePath(locale, `/services/${other.slug}`)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                          current
                            ? "bg-brand-500 text-ink-950"
                            : "text-ink-700 hover:bg-ink-50 hover:text-brand-700"
                        }`}
                      >
                        <ServiceIcon name={other.icon} className="size-4 shrink-0" />
                        <span className="truncate">{other.shortTitle}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
