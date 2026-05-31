---
status: "Superseded by [ADR-0006](./0006-warm-light-theme-default.md)"
date: 2026-05-07
deciders: "Nicola Rebola"
tags: "design, theming, scope"
---

# Ship dark mode only for v1, with tokens that allow a future light mode

## Context and Problem Statement
The landing page mockup is designed in a single dark palette. Supporting both dark and light themes from day one would multiply visual decisions (color tokens, contrast checks, asset variants), expand QA, and delay the launch of v1. At the same time, some users have a strong preference for light themes and may set `prefers-color-scheme: light`. We need to decide how much theming surface to commit to in v1 without closing the door to light mode later.

## Decision Drivers
* Time-to-launch for v1 of the portfolio.
* Visual coherence with the existing mockup.
* Future extensibility: light mode is a likely follow-up.
* Maintainability of styles (avoid hard-coded color hex values scattered across components).
* Accessibility (sufficient contrast in the chosen palette).

## Considered Options
* Option A — Dark + light + `prefers-color-scheme` system detection from day one
* Option B — Dark only for v1, with design tokens (CSS custom properties) that make a future light mode an additive change
* Option C — Light only

## Decision Outcome
Chosen option: "**Option B — Dark only with token-based architecture**", because it lets us launch v1 quickly with the mockup as-is while keeping the migration to dual themes a localized change (add a `[data-theme="light"]` token layer) rather than a refactor.

### Consequences
* Good, half the visual decisions to make and verify for v1 (one palette, one set of contrast checks).
* Good, the page is consistent with the design we agreed on with the mockup.
* Good, design tokens (CSS custom properties under `:root`) leave a clean migration path: a future Spec can add a `[data-theme="light"] { --bg: ...; }` block without touching components.
* Bad, users with a system preference for light themes are not honored in v1; we accept this as a known limitation.
* Bad, marketing/SEO screenshots are all dark-themed for now, which may feel dated to some viewers; an acceptable trade-off for a personal portfolio.

### Confirmation
This decision is reviewed when:
- A follow-up Spec is opened to add light mode (expected near-term follow-up).
- Accessibility feedback or audits indicate contrast issues for low-vision users that a light mode would mitigate.
- Analytics show a meaningful share of visitors arriving with `prefers-color-scheme: light` and bouncing.

## Pros and Cons of the Options

### Option A — Dark + light + system preference
Ship both themes from v1 with `prefers-color-scheme` detection and an explicit toggle.
* Good, honors user preference out of the box.
* Good, signals product maturity.
* Bad, doubles the design and QA workload before any feedback from real users.
* Bad, delays v1 launch with no clear evidence that visitors strongly demand light mode for a portfolio.

### Option B — Dark only with tokens
Single theme, but architected with CSS custom properties so adding a second theme is additive.
* Good, fastest path to v1 without locking out light mode.
* Good, encourages disciplined token usage from day one.
* Neutral, requires light upfront work to define the token vocabulary.
* Bad, partial solution for users with light-mode preference.

### Option C — Light only
Use a light palette instead of the mockup's dark palette.
* Bad, contradicts the agreed mockup.
* Bad, no advantage over Option B and loses the dark aesthetic the mockup was designed around.

## More Information
* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — feature that scopes this decision.
* The follow-up "light mode" Spec is expected to reference and supersede the scoping of this ADR rather than its choice (the choice for v1 stays Accepted; light mode will be an additive change).
