import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site, telLink, whatsappLink } from "@/lib/site";

export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const waUrl = whatsappLink(undefined, locale);

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container-x">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-ink-950 bg-grid px-6 py-12 sm:px-12 sm:py-16 shadow-2xl border border-white/10"
        >
          <div
            className="pointer-events-none absolute -end-20 -top-20 size-80 rounded-full bg-brand-500/25 blur-3xl"
            aria-hidden
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-brand-500/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-400 mb-3">
                {dict.brand.slogan.join(" • ")}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {dict.ctaBand.title}
              </h2>
              <p className="mt-3 text-base text-ink-200">{dict.ctaBand.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-whatsapp/30 transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-6 shrink-0" />
                <span>{dict.cta.whatsapp}</span>
              </a>
              <a
                href={telLink}
                dir="ltr"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-brand-500 hover:bg-brand-400 px-7 py-4 text-base font-extrabold text-ink-950 shadow-xl shadow-brand-500/25 transition-all hover:-translate-y-0.5"
              >
                <Phone className="size-5 shrink-0" aria-hidden />
                <span>{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
