# Portfolio — Hamday Rabby Hossain

An editorial, typographic portfolio for an AI engineer. React + Vite, no UI
framework, no backend.

The site is built around case studies: each major project has a page that
documents the context, the architectural decisions, the tradeoffs, and the
outcome — rather than a feature list. Work done inside company codebases is
described at architecture level with no links and is labelled
**Private codebase — walkthrough on request**.

## Pages

| Route         | Purpose                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `/`           | Hero, selected work, experience, research, tools                       |
| `/work`       | Full index: products, research, and an archive of older builds         |
| `/work/:slug` | Case study (context → decisions → bugs → outcome)                      |
| `/about`      | Longer bio, experience, education, recognition, certifications         |
| `/resume`     | Printable resume (`Print / Save as PDF` uses `window.print()`)         |
| `/contact`    | Contact form (EmailJS) and direct details                              |

## Stack

- React 19 + Vite 8, `react-router-dom` v7 (`BrowserRouter`)
- Hand-written CSS design system in `client/src/index.css`
  - Editorial tokens: `Instrument Serif` display, `IBM Plex Sans` body,
    `IBM Plex Mono` meta; single oxblood accent
  - Automatic light **and** dark mode via `prefers-color-scheme`
  - No gradients, glow, glassmorphism, particles, or loading screens
- Netlify (SPA redirect in `netlify.toml`)

## Editing content

All copy lives in `client/src/data/portfolioData.js`:

- `profile` — name, links, hero copy (`**text**` renders italic)
- `experience`, `education`, `awards`, `certifications`
- `projects` — entries with a case-study page (`featured: true`)
- `research` — research case studies
- `archive` — compact rows without a dedicated page
- `skills`

Two rules for that file, stated in its header: every claim must be
substantiated by the repo or code, and company work is described without
links or internal detail.

## Develop

```bash
cd client
npm install
npm run dev      # local dev server
npm run build    # production build to client/dist
npm run lint     # eslint
```

## Deployment

Deploys to Netlify from the repo root (`netlify.toml` sets `base = client`,
build `npm run build`, publish `dist`). Deployments are manual.

MIT © Hamday Rabby Hossain
