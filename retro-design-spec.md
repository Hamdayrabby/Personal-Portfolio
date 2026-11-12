# Retro design spec — reverse-engineered from https://jld2nd.dev/

Evidence: REA browser capture `ev_f12a65f93ee9d362bfd9c619eeb86572c997a99d9eebaddbf24b4b9fd294a817`
(headless Chromium 157, 1280x900, light scheme) + measured pixel swatches
from rendered screenshots. Colors below are measured, not guessed.

## Measured palette
- Page background: `#121212` (from `<meta name="theme-color">` and the flat dark canvas)
- Text: `#FFFFFF`; secondary text can use warm grey `#A8A29E`
- Primary accent (lime): `#BCED12` — logo, highlights, mosaic squares
- Highlight lime: `#CEFF00` — brightest accents, hover states
- Dimmed mosaic shades (background pixel squares): `#566912`, `#5B7012`, `#617812`
- Secondary accent (gold): `#F6C53A` — retro-game icons, scroll dots, secondary details
- Buttons: black text on lime fill (measured `buttonColor: rgb(0,0,0)`)

Contrast on `#121212`: lime ≈ 13.7:1, gold ≈ 11:1 — both fine for text.

## Typography
- Reference uses **Mozilla Headline** (variable, self-hosted) for big white
  headlines and body. Not on Google Fonts — substitute **Archivo**
  (weights 400–900; 700–900 for display) — closest grotesque on Google Fonts.
- Reference uses **Minecraft** (pixel font) for the logo and pixel accents.
  Substitute **Press Start 2P** (Google Fonts) for logo, eyebrows, meta
  labels, filter buttons — use sparingly and at small sizes (10–12px),
  with letter-spacing.
- Headlines: big, bold, white, tight leading, sentence case.

## Signature elements (from the capture)
1. **Pixel-art portrait** of the site owner beside the hero text — the
   portrait is pre-generated at `client/public/assets/profile-pixel.png`
   (576x720, 72px-wide pixel grid, backdrop keyed to #121212). Render with
   `image-rendering: pixelated` and `object-fit: cover`.
2. **Pixel mosaic transitions** — squares of 23px in lime + dimmed olive
   that cluster at section edges and disperse. Implement as a decorative
   CSS grid of absolutely-positioned squares (or an inline SVG); animate
   opacity/transform subtly; MUST collapse to a static pattern under
   `prefers-reduced-motion: reduce`.
3. **Text scramble/decode** on hero text — random glyphs resolving into
   real text. Optional; if implemented, keep it ≤1.2s, skip entirely under
   reduced motion, and never re-trigger on scroll.
4. **Retro-game iconography** in gold: Pac-Man-style dots, gamepad, folder.
   Inline SVG only (no emoji, no icon packages).
5. **Square everything**: no rounded corners, no blur, no soft shadows,
   no gradients. Hard 2px borders; flat fills. Scrollbar can be blocky.
6. White section statements ("It all starts with the pixels.") in bold
   white — used as section openers.

## Projects grid (class contract — markup by agent A, styles by agent B)
`.projects-filter` · `.filter-btn` (+ `.is-active`) · `.projects-grid` ·
`.project-card` · `.card-type` · `.card-title` · `.card-sub` ·
`.card-tags` · `.tag` · `.card-links`

Look: bordered flat cards on #121212, lime hover state (border + title
color), pixel-corner accents, Press Start 2P for the type label.

## Rules carried over (non-negotiable)
- Accessibility: `aria-pressed` on filter buttons, visible `:focus-visible`
  outlines (lime), labelled form fields, print stylesheet for /resume.
- No emoji icons, no npm dependencies, no dev servers, no commits by agents.
- prefers-reduced-motion kills all decorative motion.
- Every existing page keeps working: `/`, `/projects`, `/projects/:slug`
  (case study: Context → numbered Decisions → Bugs fixed → Outcome →
  Stack → prev/next), `/about`, `/resume`, `/contact`.
