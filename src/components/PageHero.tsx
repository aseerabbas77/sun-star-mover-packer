import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";

type Crumb = { label: string; href?: string };

export function PageHero({
  locale,
  homeLabel,
  crumbs,
  title,
  subtitle,
}: {
  locale: Locale;
  homeLabel: string;
  crumbs: Crumb[];
  title: string;
  subtitle: string;
}) {
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;

  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid py-16 sm:py-22 border-b border-white/10">
      <div
        className="pointer-events-none absolute -top-24 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 h-72 w-[42rem] rounded-full bg-brand-500/15 blur-3xl"
        aria-hidden
      />

      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-ink-300">
            <li>
              <Link
                href={localePath(locale, "/")}
                className="hover:text-brand-400 transition-colors"
              >
                {homeLabel}
              </Link>
            </li>
            {crumbs.map((c, idx) => (
              <li key={idx} className="inline-flex items-center gap-1.5">
                <Chevron className="size-3.5 text-ink-500" aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand-400 transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-brand-400" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-200 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
