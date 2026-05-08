---
status: "Approved"
owner: "Nicola Rebola"
created: 2026-05-07
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
- [ ] The page renders at `/es/` and `/en/` with content in the corresponding language; the root path (`/`) redirects to the user's preferred locale (or `/en/` as fallback).
- [ ] All seven sections of the mockup are present and visually faithful: navigation, hero, about, experience timeline, stack, blog placeholders, and footer.
- [ ] The contact email shown in the page and footer is `nicolarebola.dev@gmail.com` and is a valid `mailto:` link.
- [ ] Blog placeholders are visible but **not clickable** (they are coming-soon cards, not real posts).
- [ ] A language switcher in the navigation lets the user move between `/es/` and `/en/` while preserving the current section anchor when possible.
- [ ] On both locales, `<html lang>` matches the route, and `<link rel="alternate" hreflang>` tags point to the other locale and to `x-default`.
- [ ] Scroll-driven reveal animations play in supporting browsers and are disabled when `prefers-reduced-motion: reduce` is set.
- [ ] The page is dark-themed only; CSS tokens (custom properties) are defined under `:root` to enable a future light theme without component-level changes.
- [ ] On mobile (≤ 768 px), the navigation collapses into the same pattern shown in the mockup; all content is reachable without horizontal scroll.
- [ ] The site builds with `npm run build` and produces a static `out/` directory that, when served, behaves as described above.
- [ ] Lighthouse scores in mobile emulation for the deployed site are ≥ 90 in Performance, Accessibility, Best Practices, and SEO.
- [ ] The mockup file `nicola_rebola_portfolio_preview.html` is removed in the final commit.

## Assumptions
- Tailwind CSS v4 is already configured in the existing `app/` setup; we extend its tokens but do not migrate the framework.
- Fonts are loaded via `next/font/google` (Syne, DM Sans, DM Mono) with `display: swap`; we accept the network round-trip cost in exchange for not self-hosting font files.
- All copy (in both languages) lives in JSON dictionaries under `app/_i18n/dictionaries/` and is authored by the owner directly; no CMS.
- Portfolio data (experience, stack, social links, stats, blog entries) lives in typed TypeScript modules under `app/_data/` rather than a backing service; this is a personal site and the data changes rarely.
- The deploy URL is `https://<user>.github.io/Portfolio_Profesional/`, with `basePath` and `assetPrefix` already set in `next.config.ts`.
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
The landing page is built on Next.js App Router under `output: "export"`, hosted on GitHub Pages. Internationalization uses a dynamic `[lang]/` segment with `generateStaticParams` to produce one static HTML per locale (see [ADR-0002](../adr/0002-routing-lang-segment.md)), backed by a small custom JSON dictionary loader instead of a third-party i18n library (see [ADR-0001](../adr/0001-i18n-custom-loader.md)). Because the root path produces no page in this scheme, a postbuild Node script writes `out/index.html` with a `<meta refresh>` and a small `navigator.language` detection so visitors land on `/es/` or `/en/` (see [ADR-0003](../adr/0003-postbuild-root-redirect.md)).

Styling uses Tailwind CSS v4 with design tokens in `:root` that scope the dark palette, fonts, and motion tokens. Scroll-driven reveals and parallax effects are implemented with native CSS `animation-timeline: view()` inside `@supports` blocks and are disabled by `prefers-reduced-motion: reduce` (see [ADR-0004](../adr/0004-css-scroll-driven-animations.md)). The page is dark-only for v1, but token architecture leaves a clean migration path for a future light theme (see [ADR-0005](../adr/0005-dark-mode-only.md)).

The page is composed of nine Server Components (Nav, Hero, About, Stats, Experience, Stack, Blog, Footer, plus the page shell) and one Client Component (`LangSwitcher`, which needs `useRouter`/`usePathname`). Portfolio data lives in typed modules under `app/_data/`; component props receive plain data, keeping i18n strings and content data orthogonal.

## File Structure
```
app/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx              (created)
│   │   ├── page.tsx                (created)
│   │   └── not-found.tsx           (created)
│   ├── _i18n/
│   │   ├── config.ts               (created)
│   │   ├── getDictionary.ts        (created)
│   │   └── dictionaries/
│   │       ├── es.json             (created)
│   │       └── en.json             (created)
│   ├── _types/
│   │   ├── i18n.ts                 (created)
│   │   └── portfolio.ts            (created)
│   ├── _data/
│   │   ├── social.ts               (created)
│   │   ├── stats.ts                (created)
│   │   ├── experience.ts           (created)
│   │   ├── stack.ts                (created)
│   │   └── blog.ts                 (created)
│   ├── _components/
│   │   └── landing/
│   │       ├── Nav.tsx             (created)
│   │       ├── LangSwitcher.tsx    (created, "use client")
│   │       ├── Hero.tsx            (created)
│   │       ├── About.tsx           (created)
│   │       ├── Stats.tsx           (created)
│   │       ├── Experience.tsx     (created)
│   │       ├── Stack.tsx           (created)
│   │       ├── Blog.tsx            (created)
│   │       └── Footer.tsx          (created)
│   ├── globals.css                 (modified — tokens, fonts, motion CSS)
│   ├── layout.tsx                  (deleted — replaced by [lang]/layout.tsx)
│   ├── page.tsx                    (deleted — replaced by [lang]/page.tsx)
│   ├── sitemap.ts                  (created)
│   └── robots.ts                   (created)
├── public/
│   ├── next.svg                    (deleted)
│   ├── vercel.svg                  (deleted)
│   ├── file.svg                    (deleted)
│   ├── globe.svg                   (deleted)
│   └── window.svg                  (deleted)
├── scripts/
│   └── generate-root-redirect.mjs  (created)
└── package.json                    (modified — postbuild script)

nicola_rebola_portfolio_preview.html (deleted in final commit)
```

## Data Model / Contracts
```ts
export type Locale = "es" | "en";

export type Dictionary = {
  nav: { about: string; experience: string; stack: string; blog: string; contact: string };
  hero: { eyebrow: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  about: { heading: string; paragraphs: string[] };
  stats: { years: string; projects: string; companies: string };
  experience: { heading: string };
  stack: { heading: string };
  blog: { heading: string; comingSoon: string };
  footer: { rights: string; contactCta: string };
};

export type SocialLink = { id: string; label: string; href: string; icon: "github" | "linkedin" | "email" };

export type Stat = { id: string; value: string; labelKey: keyof Dictionary["stats"] };

export type ExperienceItem = {
  id: string;
  company: string;
  role: { es: string; en: string };
  period: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
};

export type StackItem = { id: string; name: string; category: "frontend" | "backend" | "tooling" | "cloud" };

export type BlogPlaceholder = {
  id: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
};
```

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| `animation-timeline: view()` is unsupported on older Safari/Firefox; visitors see no animation | Low | Wrap effects in `@supports`; the static layout renders correctly without the effect. |
| GitHub Pages serves under the `/Portfolio_Profesional/` subpath, breaking absolute asset URLs | High | `basePath` and `assetPrefix` are already configured; verify with a smoke test in the deploy workflow. |
| Root URL hits a 404 because `[lang]/` produces no page at `/` | High | Postbuild script writes `out/index.html` with meta refresh + `navigator.language` detection ([ADR-0003](../adr/0003-postbuild-root-redirect.md)). |
| Fonts load late and trigger FOUT or LCP regressions | Medium | Use `next/font/google` with `display: swap` and preload only the hero typefaces; verify LCP in Lighthouse. |
| Translation strings drift between dictionaries (a key exists in `es.json` but not in `en.json`) | Medium | TypeScript infers the `Dictionary` type from the dictionary shape; mismatched keys fail the build. |
| Lighthouse SEO score drops because of missing `hreflang` or canonical URLs | Medium | `generateMetadata` emits `alternates.languages` and a canonical URL per locale; verified manually before merge. |

## Commit Plan
1. **docs(scaffolding): add docs/, ADR (MADR 4.0) and Spec templates** — done in Commit 1.
2. **docs(landing): add SPEC-0001 and ADRs 0001-0005** — this commit; verify by opening each file and checking front matter and links.
3. **chore(setup): add Syne/DM Sans/DM Mono via next/font, define design tokens, remove Geist and SVG boilerplate** — verify the existing page still builds with `npm run build` and the new tokens are visible in `:root`.
4. **feat(i18n): add `[lang]/` routing, ES/EN dictionaries and postbuild root redirect script** — verify `/es/` and `/en/` render the placeholder layout and the root URL redirects correctly after `npm run build`.
5. **feat(data): add typed portfolio data modules (experience, stack, social, stats, blog)** — verify types compile and dummy values render correctly when imported in a Server Component.
6. **feat(landing): scaffold the nine landing components and wire them in `[lang]/page.tsx`** — verify each section appears in order on `/es/` and `/en/` even if visually unfinished.
7. **feat(hero): build the hero (gradients, masked grid, CTAs, scroll indicator, pulse, bounce)** — verify the hero matches the mockup at desktop and mobile breakpoints.
8. **feat(nav): build the fixed nav with backdrop blur and `LangSwitcher` Client Component, including `hreflang`** — verify language switching navigates between locales without losing the current section.
9. **feat(about): build the About section with two columns and stats grid** — verify content renders from the dictionary and stats values come from `_data/stats.ts`.
10. **feat(experience): build the vertical timeline with gradient rail and dots with halo** — verify all experience items from `_data/experience.ts` render in order.
11. **feat(stack-blog-footer): build stack grid, non-clickable blog placeholders and footer with the correct email** — verify the email link opens a `mailto:` to `nicolarebola.dev@gmail.com`.
12. **feat(motion): add scroll-driven reveal animations with `@supports` and `prefers-reduced-motion` fallbacks** — verify animations play in Chrome and the page is fully readable with reduced motion enabled.
13. **feat(seo): add bilingual `generateMetadata`, `sitemap.ts`, and `robots.ts`** — verify the built `sitemap.xml` lists both locales and the metadata includes proper `hreflang` links.
14. **chore(docs): remove the mockup HTML and update SPEC-0001 to `Status: Done`** — verify `nicola_rebola_portfolio_preview.html` no longer exists and the Spec front matter reflects the merged PR URL.

## Links
- [ADR-0001](../adr/0001-i18n-custom-loader.md) — i18n loader.
- [ADR-0002](../adr/0002-routing-lang-segment.md) — routing strategy.
- [ADR-0003](../adr/0003-postbuild-root-redirect.md) — root redirect.
- [ADR-0004](../adr/0004-css-scroll-driven-animations.md) — animation strategy.
- [ADR-0005](../adr/0005-dark-mode-only.md) — theming scope.
- `nicola_rebola_portfolio_preview.html` — design mockup (removed in commit 14).
- PR — to be linked once the feature is merged and Status changes to Done.
