---
status: "In progress"
owner: "Nicola Rebola"
created: 2026-05-07
updated: 2026-05-08
branch: "feature/landing-page"
related_adrs:
  - "ADR-0001: Custom JSON dictionary loader for i18n"
  - "ADR-0002: i18n routing via [lang]/ segment"
  - "ADR-0003: Postbuild root redirect"
  - "ADR-0004: CSS-only scroll-driven animations"
  - "ADR-0005: Dark mode only for v1"
pr: ""
---

# SPEC-0001: Bilingual landing page (ES/EN)

## Objective
Deliver a bilingual (Spanish and English) landing page that introduces Nicola Rebola as a software engineer to recruiters, tech leads, and CEOs. The page is the entry point of the portfolio and must communicate, at a glance, who he is, his experience, his stack, and how to contact him. It is hosted on GitHub Pages as a fully static site.

## Acceptance Criteria
- [x] The page renders at `/es/` and `/en/` with content in the corresponding language; the root path (`/`) redirects to **`/en/`** by default. *(`output: "export"` **disallows middleware** in Next.js 16; **`app/page.tsx`** is a small client redirect for `next dev`; **`postbuild`** overwrites `out/index.html` with meta refresh + link — see [ADR-0003](../adr/0003-postbuild-root-redirect.md). Browser locale detection for `/es/` is intentionally **not** implemented.)*
- [x] All seven sections of the mockup are present: navigation, hero, about (including pillar tabs and stats), experience timeline, stack, blog placeholder, and footer.
- [x] The contact email shown in the page and footer is `nicolarebola.dev@gmail.com` and is a valid `mailto:` link (via social/contact data).
- [x] Blog area is a single non-navigating placeholder (coming-soon messaging), not clickable post cards.
- [x] A language switcher in the navigation lets the user move between `/es/` and `/en/` using real navigations (`next/link`). *(Preserving the current hash/section anchor on switch is **not** implemented yet.)*
- [x] On both locales, `<html lang>` matches the route, and `<link rel="alternate" hreflang>` tags point to the other locale and to `x-default`. *(`[lang]/layout.tsx` uses `generateMetadata` with `alternates.canonical` and `alternates.languages` via `absoluteLocaleUrl`; `HtmlLang` syncs `document.documentElement.lang`.)*
- [x] Scroll-driven reveal animations run when blocks enter the viewport and respect **`prefers-reduced-motion`**. *Implementation: client **`Reveal`** (`IntersectionObserver` ~70 LOC) + CSS transitions (`.reveal-fade` / `.reveal-rail` in `globals.css`). Pure `animation-timeline: view()` was dropped as unreliable in practice — motion stays CSS-driven per [ADR-0004](../adr/0004-css-scroll-driven-animations.md) intent.*
- [~] The page is dark-themed only; CSS tokens (custom properties) exist under `:root` for fonts/colors. *(Landing is visually dark; full token architecture for a future light theme may still evolve.)*
- [~] On mobile (≤ 768 px), all content is reachable without horizontal scroll; About pillars and stats grids wrap/stack. *(Responsive fixes applied: `min-w-0`, `overflow-x-hidden`, wrapping tabs.) Nav links are hidden until `md` — hamburger pattern from mockup **not** implemented.*
- [x] The site builds with `npm run build` inside `app/` and produces a static `out/` directory suitable for static hosting.
- [ ] Lighthouse scores in mobile emulation for the **deployed** site are ≥ 90 in Performance, Accessibility, Best Practices, and SEO. *(SEO-oriented plumbing is in place: `robots.ts`, `sitemap.ts`, OG/Twitter metadata, JSON-LD (`SeoJsonLd`), `seo` copy in dictionaries. **Validate manually** on the live GitHub Pages URL with Chrome DevTools Lighthouse, mobile preset. In CI / production build, set **`NEXT_PUBLIC_SITE_URL`** to `https://<user>.github.io` so canonicals, `hreflang`, sitemap, and `robots.txt` use the real origin — omit path; `basePath` is appended in code.)*
- [ ] The mockup file `nicola_rebola_portfolio_preview.html` is removed in the final commit *(file may still exist at repo root for reference — remove when closing the feature).*

## Implementation notes (current codebase)
These choices are intentionally **not** full ADRs; they follow from static export + reliability on slow mobile networks:

1. **`LangSwitcher`** is a **Server Component** using **`next/link`** to `/${locale}/`. No `"use client"` and no `router.push`, so changing language works **without waiting for React hydration**.
2. **`Nav`** receives **`lang`** from `[lang]/page.tsx` for active styling and accessibility (`aria-current`).
3. **`AboutPillarsTabs`** uses native **radio inputs + labels** and Tailwind **`group-has-[#id:checked]`** to toggle panels. Tab switching works **without JavaScript**, avoiding “dead clicks” before hydration.
4. **Layout shell** (`[lang]/layout.tsx`): outer wrapper uses **`overflow-x-hidden`** (not `overflow-hidden`) so vertical scroll is not clipped while reducing horizontal bleed on small viewports.
5. **Stats**: pillar-aligned stats render **inside `About`**; `Stats.tsx` may exist as a reusable section but the home page wires stats through `About` props.
6. **Root `/` → `/en/`**: **`app/layout.tsx`** provides the shared `<html>` / `<body>` shell (middleware is **not** compatible with `output: "export"`). **`app/page.tsx`** (`"use client"`) redirects via `location.replace` in dev and after hydration on static preview. **`npm run postbuild`** → **`scripts/generate-root-redirect.mjs`** overwrites **`out/index.html`** with **meta refresh** to `en/` for hosts without relying on JS. **`[lang]/layout.tsx`** mounts **`HtmlLang`** (`useLayoutEffect`) so **`document.documentElement.lang`** matches the route without a raw `<script>` inside the React tree (avoids hydration warnings). Default locale in **`_i18n/config.ts`** is **`en`**.

## Assumptions
- Tailwind CSS v4 is already configured in the existing `app/` setup; we extend its tokens but do not migrate the framework.
- Fonts are loaded via `next/font/google` (Syne, DM Sans, DM Mono) with `display: swap`; we accept the network round-trip cost in exchange for not self-hosting font files.
- All copy (in both languages) lives in JSON dictionaries under `app/app/_i18n/dictionaries/` and is authored by the owner directly; no CMS.
- Portfolio data (experience, stack, social links, stats, blog entries) lives in typed TypeScript modules under `app/app/_data/` rather than a backing service; this is a personal site and the data changes rarely.
- The deploy URL is `https://<user>.github.io/Portfolio_Profesional/`, with `basePath` and `assetPrefix` already set in `app/next.config.ts`.
- Videos are explicitly out of scope for this Spec (deferred to a later one); animations stay CSS-only.

## Out of Scope
- Light mode (will be addressed in a separate Spec; see [ADR-0005](../adr/0005-dark-mode-only.md)).
- Real blog posts and blog routing (placeholders only in v1).
- Animations driven by Framer Motion or any JS animation runtime (CSS-only for v1; see [ADR-0004](../adr/0004-css-scroll-driven-animations.md)).
- Self-hosted presentation videos (deferred to a future Spec).
- Analytics, A/B testing, or third-party tracking.
- Contact form with backend submission (the email link is enough for v1).
- Additional locales beyond ES/EN.

## Architecture
The landing page is built on Next.js App Router under `output: "export"`, hosted on GitHub Pages. Internationalization uses a dynamic `[lang]/` segment with `generateStaticParams` to produce one static HTML per locale (see [ADR-0002](../adr/0002-routing-lang-segment.md)), backed by a small custom JSON dictionary loader instead of a third-party i18n library (see [ADR-0001](../adr/0001-i18n-custom-loader.md)). Because static export does not emit a locale bundle at `/`, **`npm run postbuild`** runs `scripts/generate-root-redirect.mjs`, which writes **`out/index.html`** so the site root redirects to **`en/`** (relative URL; works under the `Portfolio_Profesional` GitHub Pages subpath). This **supersedes** the browser-locale detection described historically in [ADR-0003](../adr/0003-postbuild-root-redirect.md) for v1; Spanish remains available at `/es/`. **`app/page.tsx`** handles **`/`** in **`next dev`** (middleware cannot be used with **`output: "export"`**).

Styling uses Tailwind CSS v4 with tokens in `:root` / `@theme`. Scroll reveals use **`Reveal.tsx`** + **`globals.css`** transition classes; **`prefers-reduced-motion`** and **`@media (scripting: none)`** disable or bypass motion ([ADR-0004](../adr/0004-css-scroll-driven-animations.md)). The page targets a dark presentation for v1 (see [ADR-0005](../adr/0005-dark-mode-only.md)).

Landing sections are implemented as **Server Components** where possible: **Nav**, **Hero**, **About** (including embedded stats grid), **Experience**, **Stack**, **Blog**, **Footer**, and **`LangSwitcher`** (links only). **AboutPillarsTabs** is also a Server Component (progressive enhancement). Portfolio data lives in typed modules under `app/app/_data/`; props carry resolved strings from `getDictionary(lang)`.

## File Structure
```
app/
├── app/
│   ├── layout.tsx                   (root `<html>` / fonts / globals.css; `metadataBase`)
│   ├── page.tsx                     (client redirect `/` → `en/`)
│   ├── sitemap.ts                   (static routes; uses `SITE_ORIGIN` + base path)
│   ├── robots.ts                    (`allow` + sitemap URL)
│   ├── [lang]/
│   │   ├── layout.tsx               (visual shell + `<HtmlLang />` + `generateMetadata` + `<SeoJsonLd />`)
│   │   ├── page.tsx
│   │   └── not-found.tsx (if present)
│   ├── _i18n/
│   │   ├── config.ts
│   │   ├── getDictionary.ts
│   │   └── dictionaries/
│   │       ├── es.json
│   │       └── en.json
│   ├── _types/
│   │   ├── i18n.ts
│   │   └── portfolio.ts
│   ├── _data/
│   │   ├── social.ts
│   │   ├── stats.ts
│   │   ├── experience.ts
│   │   ├── stack.ts
│   │   └── blog.ts (optional / legacy if unused by page)
│   ├── _constants/
│   │   └── site.ts                 (`SITE_ORIGIN`, `absoluteLocaleUrl`, base path helpers)
│   ├── _components/
│   │   ├── HtmlLang.tsx           (client — sync `<html lang>` via layoutEffect)
│   │   ├── SeoJsonLd.tsx           (JSON-LD WebSite + Person)
│   │   └── landing/
│   │       ├── Nav.tsx
│   │       ├── LangSwitcher.tsx      (Server Component — next/link)
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── AboutPillarsTabs.tsx (radio + label tabs; no "use client")
│   │       ├── Stats.tsx            (optional standalone section)
│   │       ├── Experience.tsx
│   │       ├── Stack.tsx
│   │       ├── Blog.tsx
│   │       └── Footer.tsx
│   └── globals.css
├── next.config.ts
├── package.json                   (includes postbuild hook)
├── scripts/
│   └── generate-root-redirect.mjs  (writes out/index.html → en/)
└── public/

nicola_rebola_portfolio_preview.html (repo root — remove when feature closed)
```

## Data Model / Contracts
Authoritative TypeScript types and shapes live in **`app/app/_types/portfolio.ts`** (and related imports). Dictionary keys and nesting match **`getDictionary`** and **`es.json` / `en.json`**; keep locales in sync so the build fails fast on missing keys.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| `animation-timeline: view()` is unsupported on older Safari/Firefox; visitors see no animation | Low | Wrap effects in `@supports`; the static layout renders correctly without the effect. |
| GitHub Pages serves under the `/Portfolio_Profesional/` subpath, breaking absolute asset URLs | High | `basePath` and `assetPrefix` are already configured; verify with a smoke test in the deploy workflow. |
| Root URL hits a 404 because `[lang]/` produces no page at `/` | High | `postbuild` writes `out/index.html` with meta refresh to `en/`; ensure CI runs `npm run build` (includes `postbuild`). |
| Fonts load late and trigger FOUT or LCP regressions | Medium | Use `next/font/google` with `display: swap` and preload only the hero typefaces; verify LCP in Lighthouse. |
| Translation strings drift between dictionaries | Medium | Type-check dictionary consumption; align keys across `es.json` and `en.json`. |
| Lighthouse SEO score drops because of missing `hreflang` or canonical URLs | Medium | **Mitigated** with `generateMetadata` + `alternates`; verify absolute URLs in **`out/`** or deploy with **`NEXT_PUBLIC_SITE_URL`** set. |
| Mobile users tap UI before hydration; client-only handlers feel broken | Medium | Prefer `<a>` / `<Link>` and native form controls for critical navigation (language switch, pillar tabs). |

## Commit Plan
1. **docs(scaffolding): add docs/, ADR (MADR 4.0) and Spec templates** — done in Commit 1.
2. **docs(landing): add SPEC-0001 and ADRs 0001-0005** — baseline spec.
3. **chore(setup): add Syne/DM Sans/DM Mono via next/font, define design tokens, remove Geist and SVG boilerplate** — verify `npm run build`.
4. **feat(i18n): add `[lang]/` routing, ES/EN dictionaries and postbuild root redirect** — verify `/es/` and `/en/`; verify **`/`** in **`next dev`** (`app/page.tsx`) and **`out/index.html`** after **`postbuild`**.
5. **feat(data): add typed portfolio data modules** — verify types compile.
6. **feat(landing): scaffold landing components and wire `[lang]/page.tsx`** — verify section order on both locales.
7. **feat(hero): build the hero** — verify desktop and mobile breakpoints.
8. **feat(nav): build fixed nav + language switch** — **implemented with `next/link` + server `LangSwitcher`**; optional follow-up: preserve `#hash` on locale change; mobile nav pattern per mockup.
9. **feat(about): About + pillar tabs + stats grid** — **tabs via radios + `group-has`; responsive overflow fixes.**
10. **feat(experience): vertical timeline** — verify items from `_data/experience.ts`.
11. **feat(stack-blog-footer): stack, blog placeholder, footer** — verify `mailto:` target.
12. **feat(motion): scroll-driven reveals + `prefers-reduced-motion`** — `Reveal` + `.reveal-fade` / `.reveal-rail` in `globals.css`; wired in Hero, About, Experience, Stack, Blog, Footer.
13. **feat(seo): bilingual `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD** — implemented; Lighthouse ≥ 90 on deploy remains a manual check (step tied to acceptance criterion above).
14. **chore(docs): remove mockup HTML, set Spec `Status: Done`, link PR** — final cleanup.

## Links
- [ADR-0001](../adr/0001-i18n-custom-loader.md) — i18n loader.
- [ADR-0002](../adr/0002-routing-lang-segment.md) — routing strategy.
- [ADR-0003](../adr/0003-postbuild-root-redirect.md) — root redirect.
- [ADR-0004](../adr/0004-css-scroll-driven-animations.md) — animation strategy.
- [ADR-0005](../adr/0005-dark-mode-only.md) — theming scope.
- Repository [`README.md`](../../README.md) — overview of this repo and how to run the app.
- PR — to be linked once the feature is merged and Status changes to Done.
