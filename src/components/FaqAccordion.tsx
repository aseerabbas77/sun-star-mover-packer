import { Plus } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => (
        <details
          key={idx}
          open={idx === 0}
          className="group rounded-2xl border border-ink-200/80 bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-xs open:border-brand-500 open:shadow-md transition-all"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base sm:text-lg font-extrabold text-ink-950">
            <span>{item.q}</span>
            <span className="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-700 transition-transform duration-200">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 pt-3 border-t border-ink-100 text-sm sm:text-base leading-relaxed text-ink-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
