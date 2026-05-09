---
status: "Accepted"
date: 2026-05-07
deciders: "Nicola Rebola"
tags: "i18n, routing, seo, static-export"
---

# Route i18n via `[lang]/` segment with `generateStaticParams`

## Context and Problem Statement
The portfolio is bilingual (ES/EN) and must be statically exported to GitHub Pages, which means there is no server runtime to inspect headers (`Accept-Language`) or rewrite URLs. Search engines and external links must be able to address each locale by URL, and recruiters frequently share links over LinkedIn or messaging apps where preview metadata depends on the URL itself. We need a routing structure that produces one static HTML file per locale, supports `hreflang` annotations, and is compatible with `output: "export"`.

## Decision Drivers
* Compatibility with `output: "export"` (no middleware, no server-side detection).
* SEO: each locale must have a canonical URL and proper `hreflang` linkage.
* Crawlability for search engines and link-preview bots.
* Predictable URL structure (`/es/about`, `/en/about`).
* Minimal code duplication between locales.

## Considered Options
* Option A — Subdomains per locale (`es.example.com`, `en.example.com`)
* Option B — Single page with client-side language switch (e.g., `?lang=es` query string)
* Option C — `[lang]/` dynamic segment + `generateStaticParams`, one HTML per locale
* Option D — Two separate Next.js apps, one per locale

## Decision Outcome
Chosen option: "**Option C — `[lang]/` segment + `generateStaticParams`**", because it is the only option that produces a clean, crawlable URL per locale on a static host without duplicating the entire app, and it integrates natively with the App Router's static-export pipeline.

### Consequences
* Good, every locale is a real, indexable URL (`/es/`, `/en/`); we can attach proper `<link rel="alternate" hreflang="...">` tags via `generateMetadata`.
* Good, page logic lives in a single tree under `app/[lang]/`; locale is resolved from the URL segment, no global state needed.
* Good, integrates cleanly with the custom dictionary loader from [ADR-0001](./0001-i18n-custom-loader.md).
* Bad, the root URL (`/`) does not render anything by itself; we need a separate redirect strategy (see [ADR-0003](./0003-postbuild-root-redirect.md)).
* Bad, build time grows linearly with the number of locales because pages are duplicated; acceptable for ES/EN, may need revisiting beyond ~3 locales.

### Confirmation
This decision is reviewed if:
- A third locale is added and the build time becomes painful.
- We move to a host with a server runtime (Vercel, Cloudflare Pages with functions) that allows runtime locale negotiation.
- SEO audits show that locales are not being properly indexed despite the `[lang]/` setup.

## Pros and Cons of the Options

### Option A — Subdomains per locale
Host `es.example.com` and `en.example.com` as separate origins.
* Good, the strongest SEO signal for locale separation.
* Bad, GitHub Pages does not support per-subdomain locale routing for project pages without DNS gymnastics.
* Bad, requires duplicating the deploy pipeline.

### Option B — Single page with `?lang=es` switch
Render once and swap strings on the client based on a query parameter or `localStorage` value.
* Good, the simplest possible routing.
* Bad, search engines see one URL with mixed content; bad for SEO and link previews.
* Bad, locale is not part of the canonical URL; sharing a Spanish link to an English-default page would render English first.

### Option C — `[lang]/` segment + `generateStaticParams`
Use Next.js dynamic segments to generate one static page per locale at build time.
* Good, native to App Router and `output: "export"`; well-documented pattern.
* Good, each locale has a real canonical URL.
* Good, easy to wire `hreflang` metadata.
* Neutral, requires a small adjustment to the file tree (everything under `app/[lang]/`).
* Bad, root path needs a separate handler (covered in [ADR-0003](./0003-postbuild-root-redirect.md)).

### Option D — Two separate apps, one per locale
Build two independent Next.js apps and deploy them to different paths.
* Good, total isolation between locales.
* Bad, full duplication of components, build pipeline, dependencies — clearly disproportionate for the scope.

## More Information
* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — feature that drives this routing decision.
* [ADR-0001](./0001-i18n-custom-loader.md) — i18n loader consumed by these routes.
* [ADR-0003](./0003-postbuild-root-redirect.md) — handles the root path that this routing leaves empty.
* [Next.js — Internationalization with App Router](https://nextjs.org/docs/app/building-your-application/routing/internationalization).
