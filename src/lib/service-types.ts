export type IconName =
  | "home"
  | "building"
  | "briefcase"
  | "package"
  | "wrench"
  | "warehouse"
  | "truck"
  | "route"
  | "calendar";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  intro: string[];
  features: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};
