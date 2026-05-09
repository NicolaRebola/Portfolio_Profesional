import type { MetadataRoute } from "next";
import {
  SITE_BASE_PATH,
  SITE_ORIGIN,
} from "@/app/_constants/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const prefix = `${SITE_ORIGIN}${SITE_BASE_PATH}`;
  const locales = ["en", "es"] as const;

  return locales.map((lang) => ({
    url: `${prefix}/${lang}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
  }));
}
