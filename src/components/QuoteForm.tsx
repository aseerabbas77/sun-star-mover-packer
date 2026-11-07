"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/site";

type QuoteFormProps = {
  form: Dictionary["form"];
  serviceOptions: { slug: string; shortTitle: string }[];
  defaultService?: string;
  compact?: boolean;
};

export function QuoteForm({
  form,
  serviceOptions,
  defaultService = "",
  compact = false,
}: QuoteFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [size, setSize] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(form.required);
      return;
    }
    setError("");

    const lines = [
      form.waIntro,
      "",
      `• ${form.name}: ${name.trim()}`,
      `• ${form.phone}: ${phone.trim()}`,
      service ? `• ${form.service}: ${service}` : "",
      size ? `• ${form.size}: ${size}` : "",
      from.trim() ? `• ${form.from}: ${from.trim()}` : "",
      to.trim() ? `• ${form.to}: ${to.trim()}` : "",
      date ? `• ${form.date}: ${date}` : "",
      message.trim() ? `• ${form.message}: ${message.trim()}` : "",
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-xl border border-ink-200 bg-ink-50/70 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl shadow-ink-950/15 border border-ink-100"
      noValidate
    >
      <div className="mb-5">
        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-ink-950">
          {form.title}
        </h3>
        <p className="mt-1 text-sm text-ink-500">{form.subtitle}</p>
      </div>

      <div className={`grid gap-3.5 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.name} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.name}
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.phone} *
          </label>
          <input
            type="tel"
            dir="ltr"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="050 123 4567"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.service}
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputCls}
          >
            <option value="">{form.selectPlaceholder}</option>
            {serviceOptions.map((s) => (
              <option key={s.slug} value={s.shortTitle}>
                {s.shortTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.size}
          </label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={inputCls}>
            <option value="">{form.selectPlaceholder}</option>
            {form.sizes.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.from}
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Khalifa City, Al Reem…"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.to}
          </label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Yas Island, Dubai…"
            className={inputCls}
          />
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-ink-700 mb-1">
              {form.date}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </div>
        )}

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="block text-xs font-bold text-ink-700 mb-1">
            {form.message}
          </label>
          <textarea
            rows={compact ? 2 : 3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={form.message}
            className={inputCls}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-whatsapp/30 transition-all hover:-translate-y-0.5 cursor-pointer"
      >
        <WhatsAppIcon className="size-5" />
        <span>{form.submit}</span>
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-500">
        <CheckCircle2 className="size-3.5 text-whatsapp shrink-0" aria-hidden />
        <span>{form.note}</span>
      </p>
    </form>
  );
}
