import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { areas, getArea } from "@/lib/areas";
import { getServices } from "@/lib/catalog";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => areas.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const area = getArea(slug);
  if (!area) return {};

  const dict = getDictionary(locale);
  const name = area.name[locale];

  return buildMetadata({
    locale,
    path: `/areas/${area.slug}`,
    title: dict.pages.area.metaTitle(name),
    description: dict.pages.area.metaDescription(name),
  });
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const area = getArea(slug);
  if (!area) notFound();

  const dict = getDictionary(locale);
  const services = getServices(locale);
  const name = area.name[locale];
  const p = dict.pages.area;
  const faqs = p.faq(name);
  const nearbyAreas = area.nearby
    .map((n) => getArea(n))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const waMsg =
    locale === "ar"
      ? `مرحباً شركة صن ستار لنقل وتغليف الأثاث! أرغب في عرض سعر لنقل الأثاث في ${name}.`
      : `Hello Sun Star Movers! I would like a moving quote in ${name}.`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
            { name: dict.nav.areas, path: localePath(locale, "/areas") },
            { name, path: localePath(locale, `/areas/${area.slug}`) },
          ]),
          serviceSchema({
            name: p.title(name),
            description: p.metaDescription(name),
            path: localePath(locale, `/areas/${area.slug}`),
            image: "/images/sun-star-google-maps-hero.jpg",
            areaName: `${area.name.en}, United Arab Emirates`,
          }),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[
          { label: dict.nav.areas, href: localePath(locale, "/areas") },
          { label: name },
        ]}
        title={p.title(name)}
        subtitle={p.subtitle(name)}
      />

      <section className="py-16 sm:py-22 bg-ink-50">
        <div className="container-x grid gap-10 lg:grid-cols-12 items-start">
          {/* Main Content */}
          <article className="lg:col-span-8 space-y-10">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink-100 shadow-xs space-y-4">
              <h2 className="font-display text-2xl font-extrabold text-ink-950">
                {p.title(name)}
              </h2>
              <p className="text-base text-ink-600 leading-relaxed">
                {p.intro(name, area.note[locale])}
              </p>
              <p className="text-base text-ink-600 leading-relaxed">{p.intro2(name)}</p>
            </div>

            {/* Services Available in Area */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink-100 shadow-xs">
              <h2 className="font-display text-2xl font-extrabold text-ink-950 mb-5">
                {p.servicesTitle(name)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {services.map((srv) => (
                  <Link
                    key={srv.slug}
                    href={localePath(locale, `/services/${srv.slug}`)}
                    className="group flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/70 p-4 hover:border-brand-500 hover:bg-white transition-all"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
                      <ServiceIcon name={srv.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-extrabold text-ink-950 group-hover:text-brand-700">
                        {srv.shortTitle}
                      </h3>
                      <p className="mt-1 text-xs text-ink-500 line-clamp-2">{srv.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Why Choose Us in Area */}
            <div className="rounded-3xl bg-ink-950 p-6 sm:p-8 text-white shadow-xl">
              <h2 className="font-display text-2xl font-extrabold mb-5">{p.whyTitle(name)}</h2>
              <ul className="grid sm:grid-cols-2 gap-3.5">
                {dict.why.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-ink-900 p-4"
                  >
                    <CheckCircle2 className="size-5 text-brand-400 shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <p className="font-display text-sm font-extrabold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-ink-300 leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Area FAQs */}
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink-950 mb-5">
                {dict.faqSection.title}
              </h2>
              <FaqAccordion items={faqs} />
            </div>

            {/* Nearby Areas */}
            {nearbyAreas.length > 0 && (
              <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink-100 shadow-xs">
                <h2 className="font-display text-xl font-extrabold text-ink-950 mb-4">
                  {p.nearby}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {nearbyAreas.map((nb) => (
                    <Link
                      key={nb.slug}
                      href={localePath(locale, `/areas/${nb.slug}`)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-ink-50 hover:border-brand-500 hover:bg-brand-50 px-4 py-2 text-sm font-bold text-ink-900 transition-colors"
                    >
                      <MapPin className="size-4 text-brand-600" aria-hidden />
                      <span>{nb.name[locale]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-ink-950 p-6 text-white shadow-xl border border-white/10">
              <h3 className="font-display text-xl font-extrabold">{p.title(name)}</h3>
              <p className="mt-1.5 text-sm text-ink-300">{dict.pages.service.sidebarText}</p>
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
              serviceOptions={services.map(({ slug, shortTitle }) => ({ slug, shortTitle }))}
              compact
            />
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
