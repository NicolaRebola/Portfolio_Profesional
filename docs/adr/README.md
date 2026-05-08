# ADRs - Architecture Decision Records

This folder contains the project **Architecture Decision Records**: short documents that capture the significant technical decisions, the evaluated alternatives and why one is chosen over others.

Each ADR is **immutable**: once approved, its content isn't rewritten. If reality changes, a new ADR is created, and it supersedes the previous one by updating its `Status`. This immutability turns the folder into a historical record of the reasoning in the project, not just the current status.

## When to write an ADR

When:

- You choose between 2 or more options with **significant trade-offs** (e.g., library A vs library B vs manual solution).
- You define an **architectural pattern** that will be applied repeatedly (e.g., how to organize modules, which component types are used).
- **You explicitly reject** an option and you want to document why, so that no one reopens the discussion without new information.
- You make a decision **hard to revert** (e.g., routing structure, data structure, key dependencies).

Don't write one when:

- The change is about naming or code style (that would be written in a style guide, not in an ADR).
- The decision is **easily reversible** (rename a variable, move a file).
- It is an **implementation detail** without real alternatives to evaluate.
- It is covered by a more general decision that already has an ADR.

Simple rule: if someone asks you within 6 months "why is this implemented this way?" and the answer requires an explanation about trade-offs, that should have been an ADR.

## MADR Format

We use [MADR (Markdown Architectural Decision Records)](https://adr.github.io/madr/), a standard and compact format.
Each ADR has the following sections:

- **Front matter**: `Status`, `Date`, `Deciders`, `Tags`.
- **Context and Problem Statement**: the issue that led to the decision, in neutral language.
- **Decision Drivers**: factors that influenced the decision (performance, maintainability, simplicity, costs, etc.).
- **Considered Options**: the alternatives evaluated, listed briefly.
- **Decision Outcome**: the selected option, with `Consequences` (what happens because of this decision) and `Confirmation` (how we'll confirm the decision still holds).
- **Pros and Cons of the Options**: comparative analysis between alternatives.
- **Links**: related ADRs, Specs that reference this ADR, external sources.

The living template is in [`0000-template.md`](./0000-template.md). Copy it and edit it when you need to create a new ADR.

## Statuses (Lifecycle)

| Status | Meaning |
|---|---|
| `Proposed` | Draft for review, without approval. |
| `Accepted` | Approved and current. This decision is active. |
| `Rejected` | Evaluated but discarded. We preserve it so that no one can reopen the discussion without new information. |
| `Deprecated` | Previously in effect, no longer applies. The decision lost its relevance (e.g., the technology was removed) and it wasn't replaced by another. |
| `Superseded` | Replaced by a newer ADR. It must link to the successor ADR: `Status: Superseded by [ADR-XXXX](./XXXX-title.md)`. |

## Numbering

- 4 digits, assigned in order of creation (`0001`, `0002`, ...).
- **Immutable**: once assigned, this number isn't reused, even if the ADR is rejected or deprecated.
- `0000` is reserved for the template.
- The file name follows the pattern `NNNN-title-in-kebab-case.md`.

## Index of ADRs

| # | Title | Status | Date |
|---|---|---|---|
| [0000](./0000-template.md) | MADR Template | — | — |
| [0001](./0001-i18n-custom-loader.md) | Use a custom JSON dictionary loader instead of next-intl | Accepted | 2026-05-07 |
| [0002](./0002-routing-lang-segment.md) | Route i18n via `[lang]/` segment with `generateStaticParams` | Accepted | 2026-05-07 |
| [0003](./0003-postbuild-root-redirect.md) | Generate a root-path redirect via a postbuild Node script | Accepted | 2026-05-07 |
| [0004](./0004-css-scroll-driven-animations.md) | Use CSS-only scroll-driven animations with progressive enhancement | Accepted | 2026-05-07 |
| [0005](./0005-dark-mode-only.md) | Ship dark mode only for v1, with tokens for a future light mode | Accepted | 2026-05-07 |

New ADRs are added here as they are created.

## References

- [MADR (official site)](https://adr.github.io/madr/) — formats and examples.
- [Documenting Architecture Decisions (Michael Nygard, 2011)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — the original article which popularized the practice of ADRs.
- [`../README.md`](../README.md) — general documentation index.
- [`../specs/README.md`](../specs/README.md) — feature specs (where the ADRs are referenced).