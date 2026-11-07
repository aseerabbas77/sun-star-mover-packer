"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site, telLink, whatsappLink } from "@/lib/site";

export function FloatingActions({
  locale,
  cta,
}: {
  locale: Locale;
  cta: Dictionary["cta"];
}) {
  const [showTop, setShowTop] = useState(false);
  const waUrl = whatsappLink(undefined, locale);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp + Call + Scroll-to-Top Dock */}
      <div className="hidden md:flex fixed bottom-6 end-6 z-50 flex-col items-end gap-3">
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={cta.backToTop}
            className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-ink-900/90 text-white shadow-lg backdrop-blur hover:bg-brand-500 hover:text-ink-950 transition-all"
          >
            <ArrowUp className="size-5" />
          </button>
        )}

        <a
          href={telLink}
          aria-label={`${cta.call}: ${site.phoneDisplay}`}
          className="group flex items-center gap-2.5 rounded-full bg-ink-950 border border-brand-500/40 px-4 py-3 text-white shadow-xl hover:bg-brand-500 hover:text-ink-950 transition-all"
        >
          <Phone className="size-5 text-brand-400 group-hover:text-ink-950 transition-colors" aria-hidden />
          <span dir="ltr" className="text-sm font-extrabold">
            {site.phoneDisplay}
          </span>
        </a>

        {/* Signature Pulsing WhatsApp Button with Tooltip */}
        <div className="group relative flex items-center">
          <span className="pointer-events-none me-3 whitespace-nowrap rounded-xl bg-ink-950 px-3.5 py-2 text-xs font-bold text-white shadow-xl border border-white/10 opacity-0 translate-x-2 rtl:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            {cta.whatsappTooltip}
          </span>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cta.whatsapp}
            className="relative flex size-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl shadow-whatsapp/40 hover:scale-105 hover:bg-whatsapp-dark transition-transform"
          >
            <span
              className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring"
              aria-hidden
            />
            <span
              className="absolute top-0.5 end-0.5 size-3.5 rounded-full bg-emerald-300 ring-2 ring-ink-950"
              aria-hidden
            />
            <WhatsAppIcon className="relative size-9" />
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar (Thumb-Friendly Call + WhatsApp) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-ink-950/95 backdrop-blur-xl px-3 py-2.5 shadow-2xl">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={telLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-extrabold text-ink-950 shadow-md"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span dir="ltr">{site.phoneDisplay}</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-extrabold text-white shadow-md shadow-whatsapp/30"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            <span>{cta.whatsapp}</span>
          </a>
        </div>
      </div>
    </>
  );
}
