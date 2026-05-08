# Project Docs
This folder contains the documentation of this project.

## Structure
```
docs/
├── README.md            # this file
├── adr/                 # Architecture Decision Records
│   ├── README.md        # ADRs & MADR format index
│   ├── 0000-template.md # template
│   └── NNNN-*.md        # real and numbered decisions
└── specs/               # feature specs
    ├── README.md        # Specs & format index
    ├── SPEC-template.md # template
    └── SPEC-NNNN-*.md   # real and numbered specs
```

## What goes where?
| If you want... | Go to... |
|---|---|
| Understand **an architectural decision** and why that option was selected | [`adr/`](./adr/README.md) |
| Understand **the scope, criteria and plan** of a specific feature | [`specs/`](./specs/README.md) |
| Know the **current status** of each decision or feature | Front matter of each file (`Status: ...`) |

### Quick Rule
- **ADR** = technical decision including significant trade-offs and alternatives evaluated. Immutable: if the decision changes, a new ADR is created that **supersedes** the previous one, without editing the original.
- **Spec** = description of what will be implemented in a feature, with acceptance criteria and a plan with commits. Live document: it is updated during the implementation, and when it is finished, the status is changed to `Status: Done`.

A typical feature creates **a Spec** and **one or more ADRs** referenced from the Spec.

## General Conventions
- **Numbering**: 4 digits, assigned in creation order (`0001`, `0002`, ...). Once assigned, never reuse it, even if the document is rejected or deprecated.
- **Language**: English for the content and for the technical standard terms (`Status`, `Context`, `Pull Request`, etc.).
- **Front matter**: each document starts with a YAML block that defines its status and key metadata. See READMEs of each folder for more details.
- **Links**: relative to the repo (`../adr/0001-foo.md`), not absolute. This way, they survive remote renames and they work offline.
- **Immutability of ADRs**: the content of an `Accepted` ADR isn't rewritten. If the reality changes, its `Status` changes (to `Deprecated` or `Superseded by ADR-XXXX`) and a new one is created.
- **Live Specs**: the specs are updated during the implementation. They reflect the real status of the feature.

## Typical Flow

1. A new feature emerges → A **Spec** is drafted with status `Draft`.
2. The spec identifies architecture decisions with trade-offs → Each decision creates **a new ADR**, with status `Proposed`.
3. They are approved: Spec status changed to `Approved`, and ADRs status changes to `Accepted`.
4. It is implemented. If any change emerges, the Spec is updated; if an architectural decision changes, a new superseding ADR is created.
5. When the final PR is merged, the Spec changes to status `Done` with a link to the PR.

## For more details
- [Index & formats - ADRs](./adr/README.md)
- [Index & formats - Specs](./specs/README.md)