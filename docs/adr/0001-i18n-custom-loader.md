---
status: "Accepted"
date: 2026-05-07
deciders: "Nicola Rebola"
tags: "i18n, dependencies, bundle-size"
---

# Use a custom JSON dictionary loader instead of next-intl

## Context and Problem Statement
The portfolio must be delivered in two languages (Spanish and English) and is built with Next.js App Router under `output: "export"`, hosted on GitHub Pages. We need a way to serve translated strings in both locales while keeping the client bundle small and the build pipeline simple. The current scope is approximately 50 strings across the landing page, with no plural rules, no date/number formatting beyond simple display, and no runtime locale switching beyond navigation between `/es/` and `/en/`. We must decide which i18n approach to adopt before scaffolding the routing layer.

## Decision Drivers
* Compatibility with `output: "export"` (no runtime server, no middleware).
* Client bundle size (every KB matters for LCP on first paint).
* Type-safety of translated strings (avoid runtime `undefined` keys).
* Simplicity for the current scope (~50 strings, no ICU pluralization).
* Future evolution path (we may need more advanced formatting later).

## Considered Options
* Option A — `next-intl`
* Option B — `react-intl` (FormatJS)
* Option C — Custom JSON dictionary loader with server-side dynamic import
* Option D — Null option: keep the site English-only

## Decision Outcome
Chosen option: "**Option C — Custom JSON dictionary loader**", because it adds zero client-side i18n runtime, gives us full TypeScript inference from the dictionary shape, and is more than enough for the current scope while leaving a clean migration path if needs grow.

### Consequences
* Good, the client bundle does not include any i18n library; dictionaries are dynamically imported per-locale on the server during static generation.
* Good, dictionary keys are typed at compile time via `typeof dictionary` inference, so missing keys fail the build.
* Good, no extra dependency to track for security advisories or major updates.
* Bad, no out-of-the-box ICU pluralization or relative date formatting; if needed, we'll have to add helpers or migrate to `next-intl`.
* Bad, the team must roll its own conventions for namespacing and key organization.

### Confirmation
This decision is reviewed if any of the following becomes true:
- The number of translated strings exceeds ~500.
- We need ICU plural rules, gender, or relative date/number formatting.
- A second contributor joins the project and the custom conventions become a friction point.
The trigger to reopen this ADR is: "we are writing the third utility on top of the loader to compensate for missing features."

## Pros and Cons of the Options

### Option A — `next-intl`
A popular i18n library tailored for Next.js App Router with full ICU support and locale-aware components.
* Good, comprehensive ICU support (plurals, ordinals, date/number formatting).
* Good, well-maintained, with first-class App Router integration.
* Neutral, requires configuration of routing and middleware patterns that we partially override anyway because of `output: "export"`.
* Bad, adds ~10-15 KB gzipped to the client bundle even for our minimal needs.
* Bad, overhead of learning its API for ~50 strings is disproportionate.

### Option B — `react-intl` (FormatJS)
A mature, framework-agnostic ICU implementation.
* Good, ICU-complete and battle-tested.
* Bad, heavier than `next-intl` for our use case and not specialized for App Router.
* Bad, requires additional wiring for static export.

### Option C — Custom JSON dictionary loader
A small `getDictionary(lang)` function that dynamically imports the JSON file matching the locale at build time.
* Good, zero client runtime overhead; dictionaries land in the server-rendered HTML.
* Good, TypeScript infers the dictionary shape, so keys are type-safe with no codegen step.
* Good, fewer than 30 lines of code to own.
* Neutral, no library to upgrade, but also no library to lean on for advanced features.
* Bad, ICU and complex formatting must be written by hand if needed later.

### Option D — Null option (English only)
Keep the site monolingual to avoid the i18n discussion entirely.
* Good, simplest possible setup.
* Bad, contradicts the explicit product requirement of bilingual delivery for ES/EN audiences.

## More Information
* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — feature that triggers this decision.
* [ADR-0002](./0002-routing-lang-segment.md) — routing strategy that consumes this loader.
* [Next.js i18n routing docs](https://nextjs.org/docs/app/building-your-application/routing/internationalization) — used as reference for the dictionary loader pattern.
