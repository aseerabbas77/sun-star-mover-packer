import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getServices } from "@/lib/catalog";
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
    path: "/services",
    title: dict.pages.services.metaTitle,
    description: dict.pages.services.metaDescription,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const services = getServices(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.common.breadcrumbHome, path: localePath(locale, "/") },
          { name: dict.nav.services, path: localePath(locale, "/services") },
        ])}
      />

      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        crumbs={[{ label: dict.nav.services }]}
        title={dict.pages.services.title}
        subtitle={dict.pages.services.subtitle}
      />

      <section className="py-16 sm:py-24 bg-ink-50">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
