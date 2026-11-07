import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.arabicName}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/en",
    display: "standalone",
    background_color: "#0e0f14",
    theme_color: "#f9b700",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
