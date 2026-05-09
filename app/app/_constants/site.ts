/**
 * Public site origin for canonical URLs, Open Graph, sitemap, and robots.
 * Set in CI / Pages: `NEXT_PUBLIC_SITE_URL=https://<user>.github.io` (no trailing slash, **no** repo path).
 * The repo subpath is appended via `SITE_BASE_PATH` in production (must match `next.config.ts` basePath).
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const SITE_METADATA_BASE = new URL(SITE_ORIGIN);

/** Mirrors `basePath` in `next.config.ts` when `NODE_ENV === "production"`. */
export const SITE_BASE_PATH =
  process.env.NODE_ENV === "production" ? "/Portfolio_Profesional" : "";

export function absoluteLocaleUrl(locale: "es" | "en"): string {
  return `${SITE_ORIGIN}${SITE_BASE_PATH}/${locale}/`;
}
