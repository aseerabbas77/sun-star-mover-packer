import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function detectPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }
  const acceptLang = request.headers.get("accept-language") || "";
  if (/^ar\b|,\s*ar\b/i.test(acceptLang)) {
    return "ar";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = detectPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next|api|images|videos|favicon.ico|icon.svg|sitemap.xml|robots.txt|manifest.webmanifest).*)"],
};
