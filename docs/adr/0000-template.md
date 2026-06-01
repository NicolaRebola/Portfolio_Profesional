---
status: "Proposed"
deciders: "{name(s) of who is making the decision}"
consulted: "{optional — people consulted with relevant expertise}"
informed: "{optional — people who receive the decision}"
tags: "{tag1, tag2, tag3}"
---

<!--
Quick guide for front matter:
- status: Proposed | Accepted | Rejected | Deprecated | Superseded by [ADR-XXXX](./XXXX-title.md).
  Under review, "Proposed". Once approved, "Accepted". If it is replaced later, status changes to "Superseded by ..." and its original content is preserved.
- date: ISO 8601 (YYYY-MM-DD). Date of approval.
- deciders: name(s) of who makes the decision.
- consulted: optional. Remove this line if it doesn't apply.
- informed: optional. Remove this line if it doesn't apply.
- tags: domain or area. Helps to find or group ADRs (e.g., "i18n, routing", "performance, accessibility").
-->

# {Short title, written as a decision, not as a question}
<!--
e.g.,
- "Use a custom i18n loader instead of next-intl"  ← good, clear decision.
- "Should we use next-intl?"                       ← bad, an ADR resolves, doesn't ask.
- "i18n strategy"                                  ← ambiguous, doesn't say what the decision is.
-->

## Context and Problem Statement
{Describe in 2-4 sentences the reason for the decision. Keep it neutral: don't anticipate the conclusion, present the problem as someone would experience it if they arrive at the project without context.}
<!--
Good practices:
- Start with the symptom or need ("We need to deliver the content in 2 languages...").
- Mention real constraints of the project (output: "export", static deploy, basePath, etc.).
- Finish with an implicit question that the ADR answers.
-->
## Decision Drivers
* {driver 1 — e.g., "compatibility with output: \"export\""}
* {driver 2 — e.g., "Bundle size of client"}
* {driver 3 — e.g., "type-safety of translated strings"}
* {driver N}
<!--
Decision Drivers are the criteria that influenced the decision, not the options.
List them before evaluating them, so the subsequent comparison is honest and not adjusted to the selected option.
3-6 drivers is reasonable. If you have more than 8, you are probably mixing criteria with details.
-->

## Considered Options
* {Option A — short name}
* {Option B — short name}
* {Option C — short name}
<!--
At least 2 options. An ADR with a single option is an announcement.
List them briefly; explain the pros and cons below in "Pros and Cons of the Options".
Always include the "Null option" if it applies (e.g., "don't implement i18n and keep English only").
-->

## Decision Outcome
Chosen option: "**{Chosen option}**", because {short justification — 1-2 sentences that connect the choice with the most important Decision Driver}.

### Consequences
* Good, {concrete positive outcome of having chosen the option}.
* Good, {another positive consequence}.
* Bad, {trade-off or accepted cost/risk of having chosen the option}.
* Bad, {another trade-off}.
<!--
Consequences describe what changes in the project once we make the decision.
Don't repeat the options' abstract pros/cons; describe a concrete impact:
"the bundle is reduced by ~30 KB", "a build script is added", "the team needs to learn X".
-->

### Confirmation
{How the decision is confirmed in the future. It could be an automated test, observable metrics, a periodic review, or an explicit trigger that invalidates the decision.}
<!--
Confirmation examples:
- "We validate on every release that the client bundle remains < X KB."
- "This decision is reviewed if we need ICU pluralization or dynamic date formatting."
- "A replacement is considered if the number of strings reaches ~500."
Confirmation ISN'T 'how we test it', it's 'which event would cause us to reopen the decision'.
-->

## Pros and Cons of the Options
### {Option A}
{Brief description, 1-2 sentences.}
* Good, {concrete advantage}.
* Good, {another advantage}.
* Neutral, {detail that is neither pro nor con, depending on the context}.
* Bad, {concrete disadvantage}.
* Bad, {another disadvantage}.

### {Option B}
{Brief description.}
* Good, {advantage}.
* Neutral, {detail that is neither pro nor con, depending on the context}.
* Bad, {concrete disadvantage}.

### {Option C}
{Brief description.}
* Good, {advantage}.
* Bad, {concrete disadvantage}.
<!--
The labels Good / Neutral / Bad are official MADR 4.0 labels. Keep them as is.
Every bullet starts with one of these labels, followed by a comma, allowing a visual scan.
"Neutral" is used for details that depend on the context (e.g., "adds a new dependency" — good or bad depending on the project's context).
-->

## More Information
* {Link to the Spec that triggers this ADR — e.g., [SPEC-NNNN](../specs/SPEC-NNNN-title.md).}
* {Links to related ADRs.}
* {Links to external docs, RFCs, or relevant articles that were consulted.}
* {Extra notes that don't fit into any previous section.}
<!--
"More Information" closes the ADR. If there is nothing to link, you can remove it.
Keep previous sections short; "More Information" is the only truly optional one.
-->