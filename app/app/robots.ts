import type { MetadataRoute } from "next";
import { SITE_BASE_PATH, SITE_ORIGIN } from "@/app/_constants/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
