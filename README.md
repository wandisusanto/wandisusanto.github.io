# wandisusanto.github.io

Personal profile page of **Wandi Susanto**: tech entrepreneur, Machine Learning Engineer & Data Scientist.
It's a single-page static site with a dark theme, built with Astro and hosted on GitHub Pages.

**Live:** https://wandisusanto.github.io

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro 7](https://astro.build) (static output, no server) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`, plus a few custom CSS effects (aurora, grid, glass cards) |
| Animation | CSS transitions plus a tiny inline `IntersectionObserver` script for scroll-reveal (no JS framework) |
| Language | TypeScript |
| Fonts | Google Fonts: Inter (body), Instrument Serif (accent headings) |
| Icons | Inline SVG (Simple Icons for brands, Lucide for services) with no icon dependency |
| Hosting / CI | GitHub Pages, deployed by GitHub Actions |

## Requirements

- **Node.js ≥ 22.12** (required by Astro 7; CI uses Node 24)
- **npm** (ships with Node)

## Getting started

```sh
git clone https://github.com/wandisusanto/wandisusanto.github.io.git
cd wandisusanto.github.io
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload at http://localhost:4321 |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check the production build |

## Project structure

```
.
├── .github/workflows/deploy.yml   # CI: build with Astro and deploy to GitHub Pages on push to main
├── public/
│   └── favicon.svg                # "WS" monogram favicon (copied as-is to the site root)
├── src/
│   ├── layouts/
│   │   └── Layout.astro           # <html>/<head>: title, SEO + Open Graph meta, fonts, scroll-reveal script
│   ├── pages/
│   │   └── index.astro            # The whole page: nav, about, services, projects, experience, contact
│   └── styles/
│       └── global.css             # Tailwind import, theme tokens, custom effects
├── astro.config.mjs               # Site URL, Tailwind Vite plugin
├── package.json
└── tsconfig.json
```

## Editing content

- **Page text:** all content lives in plain arrays at the top of `src/pages/index.astro`:
  - `nav`: nav bar links (anchors to section ids)
  - `socials`: LinkedIn / GitHub / X buttons. The contact section shows these too, except GitHub.
  - `services`: service cards (title, description, Lucide SVG icon markup)
  - `projects`: project cards
  - `experience`: timeline entries (`org`, `role`, optional `location`)
- **Colors and fonts:** the `@theme` block in `src/styles/global.css`
- **Title, description, social preview:** `src/layouts/Layout.astro`
- **Profile photo:** loaded from `https://github.com/wandisusanto.png`, so updating the GitHub avatar updates the site

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. `withastro/action` installs dependencies and runs `astro build` on Node 24.
2. `actions/deploy-pages` publishes `dist/` to GitHub Pages.

This only works if the repository's **Settings → Pages → Source** is set to **GitHub Actions**. The workflow can also be
run manually from the Actions tab (`workflow_dispatch`).

## License

[MIT](LICENSE) © 2026 Wandi Susanto
