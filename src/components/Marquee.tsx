import type { Locale } from "@/i18n/config";

export function Marquee({ items, locale }: { items: string[]; locale: Locale }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-brand-500 py-3.5 border-y-2 border-ink-950 select-none">
      <div
        className={`flex w-max items-center gap-8 ${
          locale === "ar" ? "animate-marquee-rtl" : "animate-marquee"
        }`}
      >
        {repeated.map((text, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-8 font-display text-sm sm:text-base font-black uppercase tracking-wider text-ink-950"
          >
            <span>{text}</span>
            <span className="size-2 rounded-full bg-ink-950" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
