/**
 * Public site origin for canonical URLs, Open Graph, sitemap, and robots.
 * Set in CI: `NEXT_PUBLIC_SITE_URL=https://<user>.github.io` (no trailing slash, **no** repo path).
 * Path under that origin is `SITE_BASE_PATH` (must match `next.config.ts` `basePath` in production).
 * CI sets `NEXT_PUBLIC_SITE_BASE_PATH` to `/Portfolio_Profesional` (main) or `/Portfolio_Profesional/uat` (develop).
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const SITE_METADATA_BASE = new URL(SITE_ORIGIN);

const defaultProdSiteBase = "/Portfolio_Profesional";

/** Mirrors `basePath` in `next.config.ts` when `NODE_ENV === "production"`. */
export const SITE_BASE_PATH =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/$/, "") ??
      defaultProdSiteBase)
    : "";

export function absoluteLocaleUrl(locale: "es" | "en"): string {
  return `${SITE_ORIGIN}${SITE_BASE_PATH}/${locale}/`;
}
