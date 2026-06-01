---
status: "Draft"
owner: "{name of who leads the implementation}"
branch: "feature/{short-feature-name}"
related_adrs:
  - "ADR-XXXX: {short title}"
  - "ADR-YYYY: {short title}"
pr: "{optional — URL of the merged PR, filled when Status: Done}"
---

<!--
Quick guide for the front matter:
- status: Draft | Approved | In Progress | Done | Archived.
  Draft while writing the spec, Approved once it is ready to be implemented, In Progress while coding,
  Done when the PR is merged, Archived if it is canceled or postponed indefinitely.
- owner: who is accountable for moving this Spec forward (not necessarily the only contributor).
- created: ISO 8601 (YYYY-MM-DD). Date the Spec was first written.
- branch: name of the feature branch, created from `develop` (never from `main`).
- related_adrs: list of ADRs that originated from or are referenced by this Spec.
  If there are none yet, leave the list empty and add them as decisions emerge.
- pr: filled when Status changes to Done.
-->

# SPEC-NNNN: {Feature title in plain language}

<!--
Title pattern: "SPEC-NNNN: clear, descriptive name in plain language".
- Good: "SPEC-0001: Bilingual landing page (ES/EN)".
- Bad:  "SPEC-0001: Landing".
The title should give context without needing to open the document.
-->

## Objective
{One or two sentences that explain what will be built and for whom. No implementation details, no jargon: a person without technical context should understand the value.}

<!--
Examples:
- Good: "Deliver a bilingual (ES/EN) landing page that introduces the developer to recruiters and tech leads, with a clear hero, experience timeline, and contact email."
- Bad:  "Implement a Next.js page with i18n routing and a hero component."  ← describes the how, not the what.
-->

## Acceptance Criteria
- [ ] {Criterion 1 — testable: it is clear how to verify it.}
- [ ] {Criterion 2 — observable: it does not depend on internal interpretation.}
- [ ] {Criterion 3 — completable: it has a clear "done" state.}
- [ ] {Criterion N}

<!--
Each criterion should be:
- Testable: can be verified manually, with a command, or with an automated check.
- Observable from the outside: framed in terms of user/visitor behavior, not internal implementation.
- Atomic: one criterion per checkbox; do not pack multiple things in one bullet.

Examples:
- Good: "[ ] The page loads at /es and /en with content in the corresponding language."
- Good: "[ ] The Lighthouse score for Performance, Accessibility, Best Practices, and SEO is >= 90 in mobile emulation."
- Bad:  "[ ] The page works correctly."  ← what does "correctly" mean?
-->

## Assumptions
- {Assumption 1 — minor decision that is taken without writing an ADR (e.g., "We use the existing Tailwind config without changes").}
- {Assumption 2}
- {Assumption N}

<!--
Assumptions are decisions that:
- Don't have significant trade-offs (otherwise they should be an ADR).
- Could be questioned in the future, so they are documented to make them explicit.
If an assumption turns out to be wrong during implementation, update this section
and, if the change is large enough, open a related ADR.
-->

## Out of Scope
- {Item 1 — what is explicitly NOT going to be built in this Spec.}
- {Item 2}
- {Item N}

<!--
"Out of Scope" prevents scope creep. List things that:
- Could reasonably be expected as part of the feature, but are deferred.
- Have already been discussed and rejected for this iteration.
Each item ideally points to a future Spec or to a backlog reference.

Examples:
- "Light mode (will be addressed in a separate Spec)."
- "Animations driven by Framer Motion (we use CSS-only for now)."
-->

## Architecture
{Summary of the technical vision in 2-4 paragraphs or a small bullet list. Mention the building blocks
(routing, state, data, styling, animations, deploy) and how they connect at a high level.
Do NOT explain the rationale of each decision: that goes in the corresponding ADRs.}

<!--
Architecture in a Spec is a map, not a manual:
- Good: "We use Next.js App Router with [lang]/ routing for i18n (see ADR-0002)
  and a custom JSON dictionary loader (see ADR-0001). Styles use Tailwind v4 with semantic tokens (see ADR-0006 for the current warm light theme)."
- Bad:  Re-explaining why next-intl was discarded — that already lives in the ADR.

Always link the related ADRs in the relevant places.
-->

## File Structure
```
{repo-root}/
├── {file or folder created} (created)
├── {file modified}          (modified)
└── {file deleted}           (deleted)
```

<!--
Show only the files involved in this Spec, not the entire tree of the repo.
Mark each entry with one of: (created), (modified), (deleted).
This makes the diff predictable and helps reviewers anticipate the change.
-->

## Data Model / Contracts
```ts
// TypeScript types, prop shapes, schemas, or relevant interfaces.
// Keep it minimal: only the contracts that matter for this Spec.

export type ExampleEntity = {
  id: string;
  title: string;
  // ...
};
```

<!--
This section is the "contract" between modules.
- Include public types (data shapes, component props, function signatures).
- Do NOT include internal implementation: that is decided during coding.
- If the Spec is not code-heavy (e.g., a pure docs change), this section can be removed.
-->

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| {Risk 1 — what could go wrong} | {low / medium / high} | {how it is detected or contained} |
| {Risk 2} | {...} | {...} |

<!--
Risks are concrete, not hypothetical:
- Good: "GitHub Pages serves the site under a subpath, so absolute asset URLs would break."
  Mitigation: "Use basePath/assetPrefix and verify with a smoke test in CI."
- Bad:  "The feature could fail."  ← non-actionable.
If a risk is large enough, it usually requires its own ADR.
-->

## Commit Plan
1. **{commit type(scope): short summary}** — {what this commit delivers and how to verify it.}
2. **{commit type(scope): short summary}** — {what this commit delivers and how to verify it.}
3. ...

<!--
Each commit must be:
- Atomic: a single concern per commit.
- Testable: with a clear way to verify it (build passes, page renders, tests green).
- Reversible: if it is reverted, the rest still makes sense.

Use Conventional Commits for the title:
  type(scope): subject
where type ∈ { feat, fix, chore, docs, refactor, style, test, perf, ci }.

Examples:
- "feat(i18n): add [lang]/ routing and ES/EN dictionaries — verify /es and /en render correctly."
- "chore(setup): replace Geist with Syne/DM Sans/DM Mono — verify fonts load and there is no FOUT."
-->

## Links
- {Related ADRs (e.g., [ADR-0001](../adr/0001-i18n-loader.md)).}
- {Mockups, designs, reference HTML.}
- {External documentation that influenced the Spec.}
- {PR that closes this Spec, when Status: Done.}

<!--
"Links" closes the Spec and connects it to its ecosystem.
When the Spec changes to Status: Done, add the URL of the merged PR
in the front matter (`pr: ...`) and in this section.
-->
