---
status: "Accepted"
date: 2026-05-12
deciders: "Nicola Rebola"
tags: "design, theming, accessibility, scope"
---

# Default landing theme: warm light palette (token-based), superseding dark-only presentation

## Context and Problem Statement

[ADR-0005](./0005-dark-mode-only.md) committed v1 to a **dark-only** presentation to match an early mockup and limit design QA. The UX/UI was later **redesigned** (warm light palette, revised layout and components — prototype under `landing_redisegn/` in the repo). We need a documented decision for:

- Shipping that **light** presentation as the **default** (and only) theme for the landing, replacing the previous dark-only look.
- Keeping **CSS custom properties** and Tailwind `@theme` mappings so contrast, accents, and surfaces stay centralized.
- Clarifying what is **out of scope** for now (e.g. system `prefers-color-scheme`, user toggle, or a separate “dark portfolio” variant) so scope does not creep without a new decision.

This ADR **supersedes ADR-0005 only for the “default presentation = dark” outcome**. ADR-0005 remains the historical record of the earlier trade-off; current work follows this ADR.

## Decision Drivers

* Coherence with the approved **redesign** (colors, typography rhythm, section treatments).
* Maintainability: one primary palette, tokens in `:root` / `@theme`, minimal magic hex in JSX.
* Accessibility: contrast on cream/off-white surfaces and terracotta accent.
* Simplicity: avoid dual-theme engineering until there is a concrete requirement.

## Considered Options

* **Option A** — Keep dark-only (reject redesign as default theme).
* **Option B** — Warm light as the only shipped theme, token-based; optional follow-up for dark variant or `prefers-color-scheme` (new Spec/ADR).
* **Option C** — Ship both light and dark from this change (system + or manual toggle).

## Decision Outcome

Chosen option: **Option B — Warm light palette as the single default theme**, aligned with the redesign prototype (`#FDFBF7` surface, `#1A1614` foreground, `#D67D3E` accent, supporting greens/peaches for badges and cards).

### Consequences

* Good, one visual system to maintain; matches current portfolio direction and marketing screenshots.
* Good, tokens (`--background`, `--foreground`, `--muted`, `--accent`, `--border`, `--surface`, `--card`, `--peach`, success greens, etc.) keep future theme work localized.
* Good, users who prefer light UI are no longer forced into a dark-only page for this landing.
* Neutral, users who preferred the old dark aesthetic no longer get it unless we add a variant later.
* Bad (accepted), no automatic dark mode or toggle yet — scope is explicitly deferred.

### Confirmation

Revisit this decision when:

* We want a **dark variant** (toggle or `prefers-color-scheme`) or a full **dual-theme** system — expect a new ADR for interaction model and token split.
* An accessibility audit flags contrast issues on the light surfaces or accent-on-peach combinations.

## Pros and Cons of the Options

### Option A — Keep dark-only

* Bad, conflicts with the adopted redesign and stakeholder direction.
* Bad, leaves documentation (Spec) out of sync with the shipped product.

### Option B — Warm light only (chosen)

* Good, matches redesign and reduces parallel design systems.
* Good, preserves token discipline from ADR-0005’s *technical* intent (centralized colors), even though the *palette* changed.
* Bad, single theme may not satisfy every viewer preference until a follow-up.

### Option C — Light + dark now

* Good, maximum user preference coverage.
* Bad, doubles design and QA without a stated requirement for the portfolio.
* Bad, delays shipping the redesign as the clear default.

## More Information

* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — landing scope and acceptance criteria (updated for this theme).
* [ADR-0005](./0005-dark-mode-only.md) — superseded for default presentation; retained as history.
* Implementation: `app/app/globals.css` (tokens + `@theme`), landing components under `app/app/_components/landing/`, `[lang]/layout.tsx` shell backgrounds.
