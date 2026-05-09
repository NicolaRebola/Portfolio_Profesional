# Professional portfolio — Nicola Rebola

Public **bilingual landing page** (Spanish / English): professional profile, experience, tech stack, a “coming soon” blog block, and contact. Built for **static hosting** on **GitHub Pages** using Next.js **`output: "export"`**.

## Repository layout

| Path | Description |
|------|-------------|
| [`app/`](./app/) | **Next.js 16** app (App Router), React 19, Tailwind CSS v4. Source, build output config, and dependencies (`package.json`). |
| [`docs/`](./docs/) | Project documentation: feature **specs** and **ADRs** (architecture decisions). Start with [`docs/README.md`](./docs/README.md). |

The active landing specification is [`docs/specs/SPEC-0001-landing-page.md`](./docs/specs/SPEC-0001-landing-page.md).

## Tech stack (summary)

- **Next.js** with routes under `app/[lang]/` (`es` / `en`), copy loaded from JSON in `app/app/_i18n/dictionaries/`.
- **Static export** (`npm run build` → `app/out/`), with `basePath` / `assetPrefix` set for the `Portfolio_Profesional` subpath in production.
- **Typed data** in TypeScript modules under `app/app/_data/` (experience, stack, social links, stats, etc.).

## Requirements

- **Node.js** LTS (20+ recommended) and **npm**.

## Local development

The application lives in the `app/` directory:

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Visiting **`/`** loads a tiny client redirect to **`/en/`** (middleware cannot be used with **`output: "export"`**). Locale routes use the `[lang]` segment (`/es/` and `/en/`).

## Production build

```bash
cd app
npm run build
```

Static artifacts are written to `app/out/`. A **`postbuild`** step generates **`out/index.html`**, which redirects the site root to **`en/`** (English by default). For GitHub Pages, confirm `next.config.ts` (`basePath`, `assetPrefix`, `trailingSlash`) matches your Pages setup.

### Environment variables

| Variable | When | Purpose |
|----------|------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production / CI build | Public site **origin only** (e.g. `https://username.github.io`). Used for canonical URLs, `hreflang`, Open Graph `url`, `sitemap.xml`, and `robots.txt`. Do **not** append the repo path; the app adds `basePath` where needed. If unset, builds fall back to `http://localhost:3000` (fine for local `out/` inspection only). |

## Documentation conventions

- **Spec** — feature scope and acceptance criteria ([`docs/specs/`](./docs/specs/)).
- **ADR** — architecture decision with alternatives and trade-offs ([`docs/adr/`](./docs/adr/)).

When extending the project, update the relevant spec or add a new one following [`docs/README.md`](./docs/README.md).