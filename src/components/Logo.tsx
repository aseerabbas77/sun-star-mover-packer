import Image from "next/image";

type LogoProps = {
  className?: string;
  title: string;
  subtitle: string;
  dark?: boolean;
};

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-sm shrink-0 ${className}`}
    >
      <svg viewBox="0 0 40 40" className="size-6 text-slate-950" fill="currentColor">
        <circle cx="20" cy="20" r="7" className="fill-slate-950" />
        <polygon points="20,15 21.5,18.5 25,20 21.5,21.5 20,25 18.5,21.5 15,20 18.5,18.5" className="fill-amber-300" />
        <line x1="20" y1="5" x2="20" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="30" x2="20" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9.4" y1="9.4" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="27" x2="30.6" y2="30.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="9.4" y1="30.6" x2="13" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="13" x2="30.6" y2="9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Logo({ className = "", title, subtitle, dark = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`}>
      <LogoMark className="size-9 xl:size-10" />
      <span className="flex flex-col leading-tight whitespace-nowrap">
        <span
          className={`font-display text-base xl:text-lg font-black tracking-tight ${
            dark ? "text-slate-900" : "text-white"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider ${
            dark ? "text-amber-600" : "text-amber-400"
          }`}
        >
          {subtitle}
        </span>
      </span>
    </span>
  );
}
