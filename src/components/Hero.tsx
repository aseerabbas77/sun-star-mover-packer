import Image from "next/image";
import { CheckCircle2, Phone, ShieldCheck, Star, Truck } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { heroImage } from "@/lib/media";
import { site, telLink, whatsappLink } from "@/lib/site";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const waUrl = whatsappLink(undefined, locale);

  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Ambient Gold Spotlights */}
      <div
        className="pointer-events-none absolute -top-32 start-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 end-0 h-[28rem] w-[28rem] rounded-full bg-brand-400/10 blur-3xl"
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Copy Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-brand-300">
            <span className="size-2 rounded-full bg-brand-400 animate-ping" aria-hidden />
            <span>{dict.hero.badge}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            {dict.hero.titleA}{" "}
            <span className="text-gradient">{dict.hero.titleHighlight}</span>{" "}
            {dict.hero.titleB}
          </h1>

          <p className="text-base sm:text-lg text-ink-200 leading-relaxed max-w-xl">
            {dict.hero.subtitle}
          </p>

          {/* Key Checkmarks */}
          <ul className="grid sm:grid-cols-3 gap-2.5 pt-1">
            {dict.hero.points.map((pt) => (
              <li
                key={pt}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm font-semibold text-ink-100"
              >
                <CheckCircle2 className="size-4 text-brand-400 shrink-0" aria-hidden />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-2.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-whatsapp/30 transition-all hover:-translate-y-0.5"
            >
              <span
                className="pointer-events-none absolute inset-y-0 w-16 bg-white/25 animate-shine"
                aria-hidden
              />
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

            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-4 text-sm font-bold text-white transition-colors"
            >
              <span>{dict.cta.quote}</span>
            </a>
          </div>

          {/* Customer Rating Strip */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-0.5 text-brand-400" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-brand-400" aria-hidden />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-ink-300 font-medium">
              {dict.hero.ratingText}
            </p>
          </div>
        </div>

        {/* Visual Column — Real Branded Al Saham Truck */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl border border-white/15 bg-ink-900 p-2.5 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl aspect-16/10 bg-ink-800">
              <Image
                src={heroImage.src}
                alt={dict.hero.imageAlt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />

              {/* Bottom Overlay Tagline */}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-xl bg-ink-950/90 backdrop-blur px-3.5 py-2 text-xs font-extrabold text-brand-400 border border-brand-400/30">
                  <ShieldCheck className="size-4 shrink-0" aria-hidden />
                  <span>{dict.brand.slogan.join(" • ")}</span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-extrabold text-ink-950 shadow-lg">
                  <Truck className="size-4 shrink-0" aria-hidden />
                  <span>{dict.brand.city} • UAE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Floating Bilingual Brand Badge */}
          <div className="hidden sm:flex items-center gap-3 absolute -top-5 -end-3 rounded-2xl bg-white px-4 py-3 shadow-2xl border border-ink-100 animate-float">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-ink-950 font-display font-black text-sm">
              24/7
            </span>
            <div>
              <p className="text-xs font-extrabold text-ink-950">{site.arabicName}</p>
              <p className="text-[11px] font-semibold text-ink-500" dir="ltr">
                {site.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
