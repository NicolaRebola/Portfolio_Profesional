# Specs - Feature Specifications

This folder contains the project's **feature specifications**: documents that describe, both before and during the implementation, what will be built, the acceptance criteria, the assumptions we are making, and the commit plan to achieve the goal.

Unlike an ADR (which captures a **technical decision** involving trade-offs and is **immutable**), a Spec describes **a complete feature** and is a **living document**: it's updated during the implementation as new insights are gained, and upon closure, it changes to `Status: Done` with a link to the merged PR.

A typical feature generates **a Spec** and **one or more ADRs** referenced from it.

## When to write a Spec

Write it when:

- You're starting a **new feature** with a significant scope (more than 2-3 commits).
- You perform a **major refactor** that affects multiple files or changes architectural patterns.
- You're going to make **product or scope decisions** that should be documented before coding (what is included, what is left out, what is assumed).
- You want to leave a trace of how you got from the requirement to the final PR.


DO NOT write one when:

- It's a **one-off fix** or a trivial change (a single commit with no alternatives to evaluate).
- It's an operational task (updating dependencies, adjusting configuration, moving a file).
- The change is already covered by a broader spec that's still active.

Simple rule: if it would help to have a conversation with yourself (or with a reviewer) about scope, criteria, or a plan **before** you start coding, that's a Spec.

## Spec Format

Each Spec follows the format of the template [`SPEC-template.md`](./SPEC-template.md). The mandatory sections are:

- **Front matter** (YAML): `Status`, `Owner`, `Created`, `Branch`, `Related ADRs`.
- **Objective**: a clear sentence that describes what will be built and for whom.
- **Acceptance Criteria**: list of testable checkboxes (each one can be verified manually or with commands).
- **Assumptions**: minor decisions that are assumed without an ADR (style, defaults, minor dependencies).
- **Out of scope**: what is explicitly decided NOT to include, to prevent scope creep.
- **Architecture**: a summary of the technical vision; the in-depth details of each decision are covered in their own ADRs.
- **File structure**: the exact directory tree of files to be created, modified, and deleted.
- **Data model / contracts**: TypeScript types, schemas, prop shapes.
- **Risks and mitigations**: what could go wrong and how it is controlled.
- **Commit plan**: numbered list of atomic commits with done criteria.
- **Links**: related ADRs, mockups, designs, PRs.

## Statuses (Lifecycle)

| Status | Meaning |
|---|---|
| `Draft` | Initial draft, a work in progress. Not yet approved. |
| `Approved` | Approved and ready for implementation. The feature has not yet been launched. |
| `In Progress` | Implementation in progress. The spec is updated as we learn. |
| `Done` | Feature merged. The spec reflects the final state with a link to the PR. |
| `Archived` | Feature canceled or postponed indefinitely. Kept for historical reference. |

## Numbering

- 4 digits with the prefix `SPEC-` (e.g., `SPEC-0001`, `SPEC-0002`).
- **Immutable**: once assigned, that number is not reused, even if the Spec is archived.
- The filename follows the pattern `SPEC-NNNN-title-in-kebab-case.md`.

## Living Document

Unlike ADRs (which are immutable once approved), Specs **are updated during implementation**. If during development it is discovered that an assumption was incorrect, that a criterion has changed, or that the commit plan needs to be reworked, the Spec is updated — the history of the ADRs is not rewritten.

This makes the Spec the **living source of truth** for the feature: at any point in the cycle, opening the Spec tells you exactly what is being built, what has been decided, and how much remains to be done.

## List of Specs

| # | Title | Status | Created | Owner | Branch |
|---|---|---|---|---|---|
| [SPEC-0001](./SPEC-0001-landing-page.md) | Bilingual landing page (ES/EN) | Approved | 2026-05-07 | Nicolás Rebola | `feature/landing-page` |

Specs are added here as they are created.

## References

- [`SPEC-template.md`](./SPEC-template.md) — live template for creating a new Spec.
- [`../README.md`](../README.md) — general documentation index.
- [`../adr/README.md`](../adr/README.md) — ADRs (technical decisions referenced from the Specs).