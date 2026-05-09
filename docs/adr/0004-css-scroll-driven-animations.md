---
status: "Accepted"
date: 2026-05-07
deciders: "Nicola Rebola"
tags: "animations, performance, accessibility, bundle-size"
---

# Use CSS-only scroll-driven animations with progressive enhancement

## Context and Problem Statement
The landing page mockup includes scroll-triggered effects (fade-in on enter, gentle parallax on the hero, reveal on the experience timeline). We need to deliver these effects without compromising the LCP on first paint or shipping a heavy animation runtime to a portfolio that should feel snappy on mid-range mobile. We also need to honor `prefers-reduced-motion` for accessibility. Future Specs may introduce more elaborate, sequenced animations that go beyond scroll-driven primitives.

## Decision Drivers
* Client bundle size — every KB hurts LCP on mobile.
* Initial render performance (no JS for above-the-fold animations).
* Accessibility: respect `prefers-reduced-motion` automatically.
* Browser support for the chosen approach (modern evergreen baseline acceptable).
* Future flexibility: we should not paint ourselves into a corner if richer motion is needed later.

## Considered Options
* Option A — Framer Motion (~30 KB gzipped client runtime)
* Option B — Native CSS `animation-timeline: view()` + `@keyframes` (zero JS)
* Option C — Intersection Observer + plain CSS classes toggled via small JS
* Option D — GSAP

## Decision Outcome
Chosen option: "**Option B — Native CSS scroll-driven animations**", because it ships zero animation JavaScript, integrates naturally with `prefers-reduced-motion`, and is sufficient for the reveals and parallax in the current mockup. We treat it as progressive enhancement: a `@supports (animation-timeline: view())` block gates the effect, and unsupported browsers see the final state without animation.

### Consequences
* Good, no animation runtime is added to the client bundle; all effects live in the existing CSS pipeline.
* Good, `@media (prefers-reduced-motion: reduce)` disables animations with one rule, satisfying accessibility requirements out of the box.
* Good, the CSS is colocated with the components, so each section owns its motion rules.
* Bad, `animation-timeline: view()` is not yet supported in older Safari (< 17.5) and older Firefox; users on those browsers see the static layout. We accept this because the page still renders correctly without the effect.
* Bad, complex sequenced animations (state machine-like, chained transitions across components) are awkward in pure CSS; if future Specs need them, we will reopen this decision.

### Confirmation
This decision is reviewed if any of the following becomes true:
- A future Spec requires sequenced or interactive animations (drag, gesture, exit animations) that CSS cannot express cleanly.
- Browser usage telemetry (or feedback) indicates a meaningful share of visitors miss the effect on unsupported browsers and the page feels static for them.
- The CSS animation code becomes unmaintainable due to volume.

## Pros and Cons of the Options

### Option A — Framer Motion
A React animation library with declarative motion primitives, gestures, and orchestration.
* Good, expressive API for sequenced animations and gestures.
* Good, very widely used and documented.
* Bad, ~30 KB gzipped of client JavaScript for animations alone, on a page where every KB hurts LCP.
* Bad, overkill for the scroll-driven reveals in the current mockup.

### Option B — Native CSS scroll-driven animations
Use `animation-timeline: view()` (or `scroll()`) + `@keyframes` to bind animations to scroll position.
* Good, zero JavaScript cost.
* Good, integrates natively with `prefers-reduced-motion`.
* Good, declarative and colocated with component styles.
* Neutral, requires a `@supports` gate for older browsers.
* Bad, limited to scroll/view-driven effects; complex orchestration is hard.
* Bad, browser support is recent (Chromium-based browsers and modern Safari/Firefox).

### Option C — Intersection Observer + CSS classes
Observe element visibility from a small JS hook and toggle CSS classes that play `@keyframes`.
* Good, broad browser support.
* Good, lightweight (~1 KB of JS for a generic helper).
* Neutral, more JS than Option B, less than Option A.
* Bad, parallax-style effects that depend on scroll progress (not a binary in-view flag) are harder to express.

### Option D — GSAP
A mature, high-performance animation library.
* Good, the most powerful option for complex motion.
* Bad, license considerations for some plugins.
* Bad, even larger bundle than Framer Motion for our needs; clearly out of proportion.

## More Information
* [SPEC-0001](../specs/SPEC-0001-landing-page.md) — feature that drives this decision.
* [MDN — `animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) — primary reference.
* [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — accessibility hook.
* [Can I use — `animation-timeline`](https://caniuse.com/mdn-css_properties_animation-timeline) — used to define the supported baseline.
