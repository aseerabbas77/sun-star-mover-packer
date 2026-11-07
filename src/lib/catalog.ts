import type { Locale } from "@/i18n/config";
import type { Service } from "./service-types";
import { servicesEn } from "./services";
import { servicesAr } from "./services.ar";

export const getServices = (locale: Locale): Service[] =>
  locale === "ar" ? servicesAr : servicesEn;

export const getService = (locale: Locale, slug: string) =>
  getServices(locale).find((s) => s.slug === slug);

export const serviceSlugs = servicesEn.map((s) => s.slug);
