# Issue tracker: local markdown

Issues live in this repo as markdown files. There is no remote tracker.

## Layout

- One folder per feature or topic: `.scratch/<feature-slug>/`
- One file per issue: `.scratch/<feature-slug>/<NNN>-<issue-slug>.md`, numbered
  from 001 within each folder.

## Issue file format

    ---
    title: <short title>
    status: open | closed
    labels: [<label>, ...]
    created: YYYY-MM-DD
    ---

    <body: problem, solution, details>

## Operations

- **Create:** write a new file in the right feature folder (create the folder if
  needed), using the next free number.
- **Read:** read the file.
- **List:** list the files under `.scratch/`, and filter on `status` or `labels`
  in the frontmatter.
- **Update / comment:** edit the body. To comment, add a dated entry under a
  `## Comments` heading at the end.
- **Close:** set `status: closed`. Never delete issue files.
- **Labels:** apply a label by adding it to `labels`, e.g. `ready-for-agent`.
