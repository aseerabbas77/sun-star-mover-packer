import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getServices } from "@/lib/catalog";
import { breadcrumbSchema } from "@/lib/schema";
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
    path: "/contact",
    title: dict.pages.contact.metaTitle,
    description: dict.pages.contact.metaDescription,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const services = getServices(locale);
  const p = dict.pages.contact;
  const waUrl = whatsappLink(undefined, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
          { name: dict.nav.contact, path: localePath(locale, "/contact") },
        ])}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.contact }]}
        title={p.title}
        subtitle={p.subtitle}
      />

      <section className="py-16 sm:py-24 bg-ink-50">
        <div className="container-x grid gap-12 lg:grid-cols-12 items-start">
          {/* Contact Details + Map */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-950">
                {p.infoTitle}
              </h2>
              <p className="mt-2 text-base text-ink-600 leading-relaxed">{p.infoText}</p>
            </div>

            <div className="grid gap-3.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-whatsapp p-5 text-white shadow-lg shadow-whatsapp/25 hover:bg-whatsapp-dark transition-colors"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <WhatsAppIcon className="size-7" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/85">
                    {dict.common.whatsapp}
                  </p>
                  <p className="font-display text-xl font-black" dir="ltr">
                    {site.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={telLink}
                className="flex items-center gap-4 rounded-2xl bg-ink-950 p-5 text-white shadow-lg hover:bg-ink-800 transition-colors"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
                  <Phone className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-400">
                    {dict.common.phone}
                  </p>
                  <p className="font-display text-xl font-black" dir="ltr">
                    {site.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-ink-100 shadow-xs hover:border-brand-500 transition-colors"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700">
                  <Mail className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
                    {dict.common.email}
                  </p>
                  <p className="font-display text-base font-extrabold text-ink-950" dir="ltr">
                    {site.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-ink-100 shadow-xs">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700">
                  <MapPin className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
                    {dict.common.location}
                  </p>
                  <p className="font-display text-base font-extrabold text-ink-950">
                    {dict.common.servingAll}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-ink-100 shadow-xs">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700">
                  <Clock className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
                    {dict.common.hours}
                  </p>
                  <p className="font-display text-base font-extrabold text-ink-950">
                    {dict.common.open247}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map + Link */}
            <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-sm bg-ink-100 flex flex-col">
              <div className="aspect-16/10 w-full">
                <iframe
                  title="Sun Star Movers and Packers Google Maps Location"
                  src="https://maps.google.com/maps?q=25.3082781,55.4524904&hl=en&z=13&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <div className="p-4 bg-white border-t border-ink-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-700">
                  <MapPin className="size-4 text-brand-600 shrink-0" aria-hidden />
                  <span>Sun Star Movers and Packers All UAE</span>
                </div>
                <a
                  href={site.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 px-3.5 py-1.5 text-xs font-extrabold text-ink-950 transition-colors shrink-0"
                >
                  <span>{locale === "ar" ? "فتح في خرائط جوجل" : "Open in Google Maps"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-7">
            <QuoteForm
              form={dict.form}
              serviceOptions={services.map(({ slug, shortTitle }) => ({ slug, shortTitle }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
