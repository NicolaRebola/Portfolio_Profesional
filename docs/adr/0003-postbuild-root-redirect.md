---
status: "Accepted"
date: 2026-05-07
deciders: "Nicola Rebola"
tags: "deploy, i18n, static-export, github-pages"
---

# Generate a root-path redirect via a postbuild Node script

## Context and Problem Statement
After adopting the `[lang]/` routing strategy ([ADR-0002](./0002-routing-lang-segment.md)), the static export does not produce a meaningful page at the root URL (`/` or, on GitHub Pages, `/Portfolio_Profesional/`). A visitor landing on the root would currently see a 404. We need to redirect them to the appropriate locale (preferring their browser language when possible, falling back to English) without introducing a server runtime, since GitHub Pages serves only static files.

## Decision Drivers
* Hosting constraint: static-only deploy on GitHub Pages.
* Minimal added complexity in the build pipeline.
* Honor user language preference when feasible (avoid forcing English on Spanish speakers).
* Crawlable behavior: search engines should still discover the locale URLs.

## Considered Options
* Option A — `app/page.tsx` with `redirect()` from `next/navigation`
* Option B — Postbuild Node.js script that writes `out/index.html` with `<meta http-equiv="refresh">` plus client-side `navigator.language` detection
* Option C — Use the GitHub Pages 404 page as a redirect host
* Option D — Move to a platform with edge functions (Cloudflare Pages, Vercel) and use a redirect rule

## Decision Outcome
Chosen option: "**Option B — Postbuild Node script generating `out/index.html`**", because it is the only option that works on a strictly static host while still letting us detect `navigator.language` for a better default experience, and it adds only a few lines of build glue.

### Consequences
* Good, works on any static host: GitHub Pages today, S3/Netlify/Cloudflare tomorrow without changes.
* Good, the generated `index.html` honors `navigator.language` and falls back to `en`, so Spanish browsers naturally land on `/es/`.
* Good, the script is isolated under `scripts/` and runs via an npm `postbuild` hook; build remains a one-command operation.
* Bad, requires owning a small Node script (~30 lines) and an npm script entry.
* Bad, search engine crawlers may not execute JavaScript, so the meta refresh and `hreflang` tags on locale pages are what they will rely on; we accept this trade-off for a personal portfolio.

### Confirmation
This decision is reviewed if:
- We migrate off GitHub Pages to a platform that supports server-side redirects natively.
- SEO audits show the root path is repeatedly indexed instead of the locale pages.
- The script grows beyond simple language detection (e.g., A/B testing, geo-routing); at that point, the redirect logic should probably move to a real runtime.

## Pros and Cons of the Options

### Option A — `app/page.tsx` with `redirect()`
Use Next.js's server-side `redirect()` helper from a root page.
* Good, idiomatic in non-static Next.js apps.
* Bad, `redirect()` requires a server runtime; it does not work with `output: "export"` (the build fails or produces a no-op page).

### Option B — Postbuild Node script with meta refresh + JS detection
Generate `out/index.html` with a `<meta http-equiv="refresh" content="0;url=/en/">` tag and an inline script that overrides the target with `/es/` if `navigator.language` starts with `es`.
* Good, host-agnostic.
* Good, allows graceful degradation: even with JS disabled, the meta refresh sends users somewhere.
* Good, fast to implement and easy to test by inspecting `out/index.html`.
* Neutral, the `postbuild` hook is a slight indirection in the build chain.
* Bad, JS-driven detection is invisible to non-JS crawlers (acceptable trade-off given the scope).

### Option C — GitHub Pages 404 page as redirect
Place the redirect logic in `404.html` and rely on GitHub Pages serving it for unknown paths.
* Good, no extra script needed.
* Bad, semantically wrong: the response status is 404, which is bad for any external link to `/`.
* Bad, fragile if GitHub Pages changes its 404 behavior.

### Option D — Edge functions on another platform
Switch hosting to Cloudflare Pages, Vercel, or similar to use server-side redirects.
* Good, the cleanest possible solution from a routing standpoint.
* Bad, out of scope: the deploy target is fixed to GitHub Pages and this is a deliberate choice for a personal portfolio.

## More Information
* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — feature that requires this redirect.
* [ADR-0002](./0002-routing-lang-segment.md) — routing strategy that leaves the root path empty.
* [MDN — `<meta http-equiv="refresh">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) — used as the no-JS fallback.
