import Link from "next/link";
import { Clock, Globe, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Service } from "@/lib/service-types";
import { areas } from "@/lib/areas";
import { navLinks, site, telLink, whatsappLink } from "@/lib/site";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
  services: Service[];
};

export function Footer({ locale, dict, services }: FooterProps) {
  const year = new Date().getFullYear();
  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const waUrl = whatsappLink(undefined, locale);

  return (
    <footer className="bg-ink-950 text-ink-200 pb-20 md:pb-0">
      {/* Warning / Highway Stripe Band */}
      <div className="stripe-band h-2.5 w-full" aria-hidden />

      {/* Areas SEO Strip */}
      <div className="border-b border-white/10 bg-ink-900/60">
        <div className="container-x py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">
            {dict.areasSection.eyebrow} — {dict.brand.city}
          </p>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={localePath(locale, `/areas/${area.slug}`)}
                className="rounded-full border border-white/10 bg-white/5 hover:border-brand-400/50 hover:bg-brand-500/15 hover:text-brand-300 px-3 py-1 text-xs font-medium text-ink-200 transition-colors"
              >
                {area.name[locale]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="container-x py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-5">
          <Link href={localePath(locale, "/")} className="inline-block">
            <Logo title={dict.brand.short} subtitle={dict.brand.sub} />
          </Link>
          <p className="text-sm leading-relaxed text-ink-300">{dict.footer.about}</p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-brand-500/25 bg-brand-500/10 px-3.5 py-2 text-xs font-bold text-brand-300">
            <ShieldCheck className="size-4 text-brand-400 shrink-0" aria-hidden />
            <span>{dict.brand.slogan.join(" • ")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-4 py-2.5 text-sm font-extrabold text-white transition-colors"
            >
              <WhatsAppIcon className="size-4.5" />
              <span>{dict.cta.whatsapp}</span>
            </a>
            <Link
              href={localePath(otherLocale, "/")}
              hrefLang={otherLocale === "ar" ? "ar-AE" : "en-AE"}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition-colors"
            >
              <Globe className="size-4 text-brand-400" aria-hidden />
              <span>{dict.switchTo}</span>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-white mb-4">
            {dict.footer.quickLinks}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  className="text-ink-300 hover:text-brand-400 transition-colors"
                >
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-white mb-4">
            {dict.footer.ourServices}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {services.map((srv) => (
              <li key={srv.slug}>
                <Link
                  href={localePath(locale, `/services/${srv.slug}`)}
                  className="text-ink-300 hover:text-brand-400 transition-colors"
                >
                  {srv.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-white mb-4">
            {dict.footer.contact}
          </h2>
          <ul className="space-y-3.5 text-sm">
            <li>
              <a
                href={telLink}
                dir="ltr"
                className="flex items-center gap-3 text-white font-bold hover:text-brand-400 transition-colors"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                  <Phone className="size-4" aria-hidden />
                </span>
                <span>{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white font-bold hover:text-whatsapp transition-colors"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-whatsapp/15 text-whatsapp">
                  <WhatsAppIcon className="size-4.5" />
                </span>
                <span dir="ltr">{site.phoneIntl}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-ink-300 hover:text-brand-400 transition-colors"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400">
                  <Mail className="size-4" aria-hidden />
                </span>
                <span dir="ltr">{site.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-ink-300">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400">
                <MapPin className="size-4" aria-hidden />
              </span>
              <span>{dict.common.servingAll}</span>
            </li>
            <li className="flex items-center gap-3 text-ink-300">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400">
                <Clock className="size-4" aria-hidden />
              </span>
              <span>{dict.common.open247}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p className="font-semibold text-brand-400">{dict.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
