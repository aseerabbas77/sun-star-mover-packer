import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
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
    path: "/faq",
    title: dict.pages.faq.metaTitle,
    description: dict.pages.faq.metaDescription,
  });
}

export default async function FaqPage({
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
        data={[
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
            { name: dict.nav.faq, path: localePath(locale, "/faq") },
          ]),
          faqSchema(dict.faqSection.items),
        ]}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.faq }]}
        title={dict.pages.faq.title}
        subtitle={dict.pages.faq.subtitle}
      />

      <section className="py-16 sm:py-24 bg-ink-50">
        <div className="container-x max-w-4xl space-y-12">
          <FaqAccordion items={dict.faqSection.items} />

          <div className="rounded-3xl bg-white p-8 border border-ink-100 shadow-sm text-center">
            <h2 className="font-display text-2xl font-extrabold text-ink-950">
              {dict.pages.faq.stillTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600">{dict.pages.faq.stillText}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={whatsappLink(undefined, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-6 py-3.5 text-sm font-extrabold text-white transition-colors"
              >
                <WhatsAppIcon className="size-5" />
                <span>{dict.cta.whatsapp}</span>
              </a>
              <a
                href={telLink}
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-xl bg-ink-950 hover:bg-ink-800 px-6 py-3.5 text-sm font-extrabold text-white transition-colors"
              >
                <Phone className="size-4 text-brand-400" aria-hidden />
                <span>{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
