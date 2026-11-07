"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, Phone, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon, ServiceIcon } from "./icons";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Service } from "@/lib/service-types";
import { navLinks, site, telLink, whatsappLink } from "@/lib/site";

type HeaderDict = Pick<Dictionary, "switchTo" | "brand" | "nav" | "cta" | "common">;

type HeaderProps = {
  locale: Locale;
  dict: HeaderDict;
  services: Pick<Service, "slug" | "shortTitle" | "excerpt" | "icon">[];
};

export function Header({ locale, dict, services }: HeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const strippedPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const switchHref = localePath(otherLocale, strippedPath);

  const handleLocaleCookie = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    if (href === "/") return pathname === full || pathname === `${full}/`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const waUrl = whatsappLink(undefined, locale);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Sleek, Single-Bar Premium Header (Deep Midnight Navy with Amber Sun Accents) */}
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-200 border-b ${
          scrolled
            ? "bg-[#0b1324]/98 backdrop-blur-xl shadow-lg shadow-black/30 border-slate-800"
            : "bg-[#0c162d]/95 backdrop-blur-md border-slate-800/80"
        }`}
      >
        <div className="w-full max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 xl:gap-6">
          {/* Brand Logo */}
          <Link
            href={localePath(locale, "/")}
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg py-1"
            aria-label={dict.brand.name}
          >
            <Logo title={dict.brand.short} subtitle={dict.brand.sub} />
          </Link>

          {/* Desktop Nav Links - Single Line, Clean Spacing, Never Wraps */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {navLinks.map((item) => {
              const label = dict.nav[item.key];
              const active = isActive(item.href);

              if (item.key === "services") {
                return (
                  <div key={item.key} className="relative group">
                    <Link
                      href={localePath(locale, item.href)}
                      className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-[13px] xl:text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                        active
                          ? "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/25"
                          : "text-slate-200 hover:text-amber-400 hover:bg-slate-800/60"
                      }`}
                    >
                      <span className="whitespace-nowrap">{label}</span>
                      <ChevronDown
                        className="size-3.5 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-200"
                        aria-hidden
                      />
                    </Link>

                    {/* Mega Dropdown */}
                    <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 transition-all duration-200 absolute start-0 top-full pt-2 w-[34rem] z-50">
                      <div className="rounded-2xl bg-[#0c162d] border border-slate-700/80 p-3.5 shadow-2xl shadow-black/60 grid grid-cols-2 gap-2">
                        {services.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={localePath(locale, `/services/${srv.slug}`)}
                            className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/70 transition-colors group/item"
                          >
                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-400 group-hover/item:bg-amber-400 group-hover/item:text-slate-950 transition-colors">
                              <ServiceIcon name={srv.icon} className="size-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-xs xl:text-sm font-bold text-white group-hover/item:text-amber-400 transition-colors truncate">
                                {srv.shortTitle}
                              </span>
                              <span className="block text-[11px] text-slate-400 line-clamp-1">
                                {srv.excerpt}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={localePath(locale, item.href)}
                  className={`inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-[13px] xl:text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/25"
                      : "text-slate-200 hover:text-amber-400 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions - All Single-Line Pills, Zero Wrapping */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Language Switcher */}
            <Link
              href={switchHref}
              hrefLang={otherLocale === "ar" ? "ar-AE" : "en-AE"}
              onClick={handleLocaleCookie}
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:border-slate-600 px-2.5 py-1.5 text-xs font-bold text-slate-200 transition-all"
              aria-label={`Switch language to ${dict.switchTo}`}
            >
              <Globe className="size-3.5 text-amber-400" aria-hidden />
              <span className="whitespace-nowrap">{dict.switchTo}</span>
            </Link>

            {/* Direct Phone Call */}
            <a
              href={telLink}
              dir="ltr"
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400 px-3 py-1.5 text-xs xl:text-sm font-bold text-amber-300 transition-all"
            >
              <Phone className="size-3.5 text-amber-400 shrink-0" aria-hidden />
              <span className="whitespace-nowrap">{site.phoneDisplay}</span>
            </a>

            {/* WhatsApp CTA Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3.5 py-1.5 text-xs xl:text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/35"
            >
              <WhatsAppIcon className="size-4 shrink-0" />
              <span className="whitespace-nowrap">{dict.cta.whatsapp}</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <Link
              href={switchHref}
              hrefLang={otherLocale === "ar" ? "ar-AE" : "en-AE"}
              onClick={handleLocaleCookie}
              aria-label={`Switch language to ${dict.switchTo}`}
              className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800/70 px-2 text-xs font-bold text-slate-200"
            >
              <Globe className="size-3.5 text-amber-400" aria-hidden />
              <span>{dict.switchTo}</span>
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.cta.whatsapp}
              className="inline-flex size-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
            >
              <WhatsAppIcon className="size-4.5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? dict.nav.close : dict.nav.menu}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/70 text-white hover:bg-slate-700"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0c162d]/98 backdrop-blur-2xl">
          <div className="max-w-md mx-auto px-4 py-4 space-y-3">
            <nav aria-label="Mobile Navigation" className="grid gap-1">
              {navLinks.map((item) => {
                const label = dict.nav[item.key];
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.key}
                    href={localePath(locale, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/20"
                        : "text-slate-200 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <span className="whitespace-nowrap">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
              <a
                href={telLink}
                dir="ltr"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Phone className="size-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">{site.phoneDisplay}</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/25"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span className="whitespace-nowrap">{dict.cta.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
