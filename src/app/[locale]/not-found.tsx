import Link from "next/link";
import { Home } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32 bg-ink-50">
      <div className="container-x text-center max-w-xl">
        <p className="font-display text-7xl sm:text-8xl font-black text-brand-500">404</p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-ink-950">
          Page Not Found — الصفحة غير موجودة
        </h1>
        <p className="mt-3 text-base text-ink-600">
          Sorry, the page you are looking for has moved — just like our happy customers!
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 rounded-xl bg-ink-950 hover:bg-ink-800 px-6 py-3.5 text-sm font-extrabold text-white transition-colors"
          >
            <Home className="size-4 text-brand-400" aria-hidden />
            <span>English Home</span>
          </Link>
          <Link
            href="/ar"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 px-6 py-3.5 text-sm font-extrabold text-ink-950 transition-colors"
          >
            <Home className="size-4" aria-hidden />
            <span>الرئيسية العربية</span>
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-dark px-6 py-3.5 text-sm font-extrabold text-white transition-colors"
          >
            <WhatsAppIcon className="size-4.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
