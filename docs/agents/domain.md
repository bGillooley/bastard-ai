# Domain docs

Layout: single-context.

- `CONTEXT.md` (repo root): the domain glossary. Terms and rules only, no
  implementation details.
- `docs/adr/`: architecture decision records, numbered `NNNN-<slug>.md`.
  Create the folder when the first ADR is written.

## Rules for consumers

- Read `CONTEXT.md` before planning or writing code, and use its terms (Question,
  Subject, Retort, Threat, Insult, Fallback Retort, …) in code, issues and specs.
- If a request or the code contradicts the glossary, point out the conflict
  instead of quietly picking one side.
- Respect any ADR covering the area you're touching. To go against one, propose
  a new ADR that supersedes it.
