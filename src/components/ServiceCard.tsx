import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceIcon, WhatsAppIcon } from "./icons";
import { localePath, type Locale } from "@/i18n/config";
import type { Service } from "@/lib/service-types";
import { whatsappLink } from "@/lib/site";

export function ServiceCard({
  service,
  locale,
  learnMoreLabel,
  whatsappLabel,
}: {
  service: Service;
  locale: Locale;
  learnMoreLabel: string;
  whatsappLabel: string;
}) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const href = localePath(locale, `/services/${service.slug}`);
  const waMsg =
    locale === "ar"
      ? `مرحباً السهم لنقل الأثاث! أرغب في عرض سعر لخدمة: ${service.title}`
      : `Hello Al Saham Movers! I would like a quote for: ${service.title}`;

  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm hover:shadow-2xl hover:border-brand-400/60 transition-all duration-300 hover:-translate-y-1"
    >
      <Link href={href} className="relative aspect-16/10 overflow-hidden bg-ink-100 block">
        <Image
          src={service.image}
          alt={service.imageAlt}
          width={800}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 start-3 flex size-11 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-lg">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-extrabold text-ink-950 group-hover:text-brand-600 transition-colors">
          <Link href={href}>{service.shortTitle}</Link>
        </h3>
        <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">
          {service.excerpt}
        </p>

        <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-950 hover:text-brand-600 transition-colors"
          >
            <span>{learnMoreLabel}</span>
            <Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
          </Link>

          <a
            href={whatsappLink(waMsg, locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${whatsappLabel} — ${service.shortTitle}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp/10 hover:bg-whatsapp hover:text-white px-3 py-1.5 text-xs font-extrabold text-whatsapp-dark transition-colors"
          >
            <WhatsAppIcon className="size-4" />
            <span>{whatsappLabel}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
