# handoff.md — codebase map (every agent updates this after its session, ≤30 lines)

- Stack: React 19 + Vite 8, react-router-dom v7 (BrowserRouter), `@emailjs/browser`, Netlify (`netlify.toml` + `_headers` + `_redirects`).
- Routes (App.jsx): `/` Home · `/projects` filter grid + Archive · `/projects/:slug` case studies · `/about` · `/resume` (Option B: full print-ready CV) · `/contact` (EmailJS + honeypot) · `*` NotFound (custom 404). `/work` redirects to `/projects`.
- Data Source: `client/src/data/portfolioData.js` (single source of truth: profile, experience[2], leadership[2], projects[8], research[2], archive[8], skills[5], education[2], awards, certifications[3]).
- Components: ArchitectureDiagram (inline SVG for 10 project architectures), WorkCard (equal-height, featured ORA full-width, 16:9 diagram slot, access labels), WorkRow, PixelMosaic (footer only), PixelImage, SiteHeader (skip link, brand, nav), SiteFooter.
- CSS: `client/src/index.css`. Tokens: `--bg: #121212`, `--surface: #181818`, `--border: #262626`, `--border-strong: #3a3a3a`, `--text: #ededed`, `--text-muted: #a3a3a3`, `--accent: #b8e62e`, `--radius: 6px`. Archivo typeface everywhere (pixel font on `.brand` only, >=12px). Card hover is border-color change only. Scroll-triggered reveal removed; hero load animation only. Reduced motion respected. Full print stylesheet for `/resume`.
- Assets: `profile.png`, `favicon.svg` ("HR" vector monogram), `og-card.png` (1200x630 social card), `og-card.svg`.
- SEO & Compliance: Schema.org `Person` JSON-LD, Twitter cards, Open Graph, dynamic `usePageMeta`, `sitemap.xml` (all 15 routes), `robots.txt`, security headers.
- Redesign Status: Tasks T01–T27 COMPLETED. Reviewed and verified against `portfolio-redesign-spec.md`. Zero TODO(owner) strings in production bundle.
- Verification: `npm run lint` + `npm run build` in `client/` pass cleanly.
