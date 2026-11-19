# Implementation Plan — portfolio-redesign-spec.md

Source: `portfolio-redesign-spec.md` (untracked, authored with Antigravity).
Analyzed against the live codebase at `c00ed3b` (retro-pixel site, all work pushed).
Plan version: 1.0 — 2026-11-19.

## 0. How to use this plan (read this first, both agents)

1. **One task = one session = one commit.** Copy the task block + the referenced
   spec section into the agent prompt. Do not batch tasks.
2. **Rules every agent follows** (spec §0, plus corrections from §1 below):
   - Inspect before changing; update `handoff.md` (≤30 lines) at the end.
   - Do not invent facts, metrics, links, screenshots. Use `TODO(owner):` markers.
   - Do not rewrite copy marked **KEEP** in the spec.
   - No new dependencies. One data source (`portfolioData.js`), rendered everywhere.
   - The plan's §1 corrections override the spec where they conflict — several
     spec claims are stale (§1.1) and several removals reverse decisions the
     owner already made (§1.2, gated behind decision gates D1–D8).
3. **Verify after every task:** `npm run lint` + `npm run build` in `client/`,
   visual check at 375 / 768 / 1440px, then commit. Push only on owner request.

---

## 1. Spec analysis

### 1.1 What the spec gets right (verified against the codebase)

- Content quality claim (9/10) — the case-study copy is the strongest asset. Agreed.
- Visual dominance of retro styling — real; the site signals "game" before it reads.
- Positioning inconsistency — real: `profile.role` says "Software Developer", the
  ticker cycles Researcher/AI Engineer, `<title>` says "Software Developer", the
  target audience is AI engineering roles.
- "Owned" vs "contributed" calibration — real and important; reviewers cross-check.
- Duplicate Experience (Home + About) — real.
- Eyebrow labels (INDEX/ABOUT/RESUME/CONTACT) — real, all four pages have them.
- Skills empty rows — reported by the spec; **verify in the browser first** (it may
  be a transient reveal artifact). Real or not, it becomes a task.
- Text below 12px (pixel-font labels at 0.55–0.65rem ≈ 9–10px) — real.
- Missing: OG image, JSON-LD depth, skip-to-content link, copy-to-clipboard email,
  timezone, custom 404 page, per-page titles — all real gaps.

### 1.2 Stale or wrong claims — do NOT let an agent "fix" these

| Spec claim | Reality |
|---|---|
| §5.2 "Case study pages (new, highest-impact addition)... Verify whether cards link anywhere. If not, build these pages." | **They exist and are linked.** All 8 products + 2 research render full case studies at `/projects/:slug` (Context → Decisions → Bugs fixed → Outcome → Stack). Task T18 is an *upgrade* to the new template, not a build-from-zero. |
| §7 "sitemap.xml, robots.txt" missing | **Both exist** in `client/public/`. Verify contents instead of creating. |
| §1 "Resume page is a heading plus a download button" | True — but that is **exactly what the owner asked for**. See D6. |
| §5.3 "Humach Lab currently has one sentence" | True in `experience[]`; the Bangla *case study* has full detail. The gap is only the About summary. |
| §8.11 "Empty rows above Skills Backend" | Unverified — could be a transient reveal artifact. Task T13 starts with a reproduction check. |

### 1.3 Conflicts with decisions the owner already made (decision gates D1–D8)

The spec's §3 Remove list reverses several things the owner personally requested
during earlier sessions. Each becomes a decision gate — **do not execute a gated
task before the owner answers.**

| Gate | Spec says | Owner earlier said | Recommendation |
|---|---|---|---|
| **D1 Identity** | Primary identity "AI Engineer"; `<title>` and Resume header say AI Engineer; job titles stay truthful | Owner removed "AI Engineer" from the header and set identity to "Software Developer" (CV-accurate) | Adopt the spec (AI Engineer) — the audience is AI-engineering roles and job titles in Experience stay truthful either way. **Owner confirm.** |
| **D2 Role ticker** | Remove `> RESEARCHER` label + cursor | Owner requested the sequential role animation explicitly | Lean remove (it is the loudest game cue), but offer a compromise: keep the ticker, drop the `>` prompt and cursor. **Owner pick.** |
| **D3 Pixel card banners** | Remove; replace with architecture diagrams | Owner requested per-card pixel visuals + unique colors | Adopt the spec — the diagrams are the better "signature". The 8-color palette dies with the banners. **Owner confirm.** |
| **D4 Grid layout** | Uniform 2-column grid, equal heights, one full-width ORA | Owner approved the asymmetric bento ("boxes are good") | Try spec layout only *after* banners are removed — the "cut-off banners / uneven rows" complaint may vanish. Re-evaluate then. **Owner pick after T10.** |
| **D5 Mosaic strips / scroll bot / hero icons** | Remove strips + bot (→ 2px top progress line) + icons; or keep one static monochrome footer strip | Owner requested all three | Split decision: strips → keep one static footer strip; bot → replace with the 2px line (spec) or keep the bot; icons → remove. **Owner picks each.** |
| **D6 Resume** | Option A: remove page, nav downloads PDF; Option B: real one-pager | Owner stripped the page to "download + short intro" on purpose | **Option A matches the owner's own prior instruction** — but it requires an actual PDF file. Option B reverses the owner's request. Recommend A once `Hamday_Rabby_Hossain_Resume.pdf` exists. **Owner pick + PDF needed.** |
| **D7 Contact form** | Netlify Forms + honeypot | EmailJS is wired and working | Either works on Netlify. Recommend keeping EmailJS + adding a honeypot field manually (no migration risk); switch to Netlify Forms only if EmailJS quotas bite. **Owner pick.** |
| **D8 Pixel font scope** | Drop everywhere except the wordmark (convert wordmark to SVG) | Pixel font is the retro signature across loader, filters, labels | Recommend: keep pixel font **only** in the wordmark + the boot loader; nav/tags/labels/eyebrows move to body font at ≥12px. Convert the wordmark to SVG last (phase 5). **Owner confirm.** |

Also note: the spec changes the accent hex `#bced12` → `#b8e62e` (nearly identical
lime). Adopt the spec's full token block in T06 to avoid two limes.

---

## 2. Decision gates — answer these before the gated tasks

| Gate | Blocks tasks | Options |
|---|---|---|
| D1 Identity | T02, T17, T23 | (a) AI Engineer (spec) · (b) keep Software Developer |
| D2 Ticker | T07 | (a) remove · (b) keep, drop prompt/cursor |
| D3 Card banners | T10, T19–T22 | (a) remove → diagrams · (b) keep pixel art |
| D4 Grid shape | T10 | (a) uniform 2-col (spec) · (b) keep bento, flat cards |
| D5 Strips / bot / icons | T08 | strips: (a) all removed (b) one static footer strip · bot: (a) 2px top line (b) keep bot · icons: (a) remove (b) keep |
| D6 Resume | T17 | (a) remove page, direct PDF · (b) real one-pager |
| D7 Forms | T23 | (a) keep EmailJS + honeypot · (b) Netlify Forms |
| D8 Pixel font | T09, T26 | (a) wordmark + loader only · (b) fully SVG wordmark, no pixel font |

Recommended answers: D1=a, D2=a (or b), D3=a, D4=defer to after T10, D5=strips-b / bot-b / icons-a, D6=a once PDF exists, D7=a, D8=a.

---

## 3. Task breakdown

Sizes: S ≤ 1h · M ≤ half session · L full session. "Needs" = decision gate or
owner input. Every task ends with lint + build + 375/768/1440 check + commit.

### Phase 1 — Identity and copy (quick wins)

- **T01 · Seed `handoff.md`** — S.
  Write the codebase map: stack (React 19 + Vite 8 + RRDv7 BrowserRouter), routes,
  data source `client/src/data/portfolioData.js` (single source: profile, roles,
  experience, leadership, projects[8], research[2], archive[9], skills, education,
  awards, certifications), CSS tokens in `client/src/index.css`, components list
  (Loader, PixelImage, PixelMosaic, RoleTicker, ScrollBot, WorkCard, WorkRow,
  RichText, SiteHeader, SiteFooter), asset inventory.
  Done when: `handoff.md` ≤ 30 lines at repo root, committed.

- **T02 · Per-page titles/meta + identity swap** — M. Needs **D1**.
  Add a small `usePageMeta(title, description)` hook (no dependency) called by each
  page; unique titles/descriptions per spec §7. Update `index.html` defaults.
  Done when: every route has a unique title + description; identity strings match D1.

- **T03 · Claim calibration** — S. Needs owner wording sign-off.
  Replace "owned" in `profile.intro` and the Resume intro with the specific-verb
  version from spec §2 ("Designed the ORA Machine API... and consolidated the
  realtime voice gateways behind one authenticated proxy").
  Done when: no "owned" claim anywhere; wording committed as approved.

- **T04 · About paragraph 3 rewrite** — S.
  Spec §5.3: B.Sc. CGPA 3.399/4.00 + current M.Sc. + competitive programming + two
  research projects. Done when: About bio paragraph 3 mentions the M.Sc.

- **T05 · Contact copy** — S. Needs owner (response-time promise; PhD-openness line).
  Button "Send message", "Sending…" disabled state, success "Sent. I'll reply within
  2 working days." (pending owner), error with mailto fallback.

### Phase 2 — Visual cleanup

- **T06 · Token swap + type scale** — M.
  Adopt the spec token block (`--bg #121212, --surface #181818, --border #262626,
  --border-strong #3a3a3a, --text #ededed, --text-muted #a3a3a3, --accent #b8e62e,
  --radius 6px`) into `index.css`, remap the legacy token names to it, one radius
  everywhere, type scale per spec (body 16–17px/1.65, 68ch, H1 clamp, nothing <12px).
  Verify `--text-muted` ≥ 4.5:1 on `--bg`.
  Done when: zero hardcoded old colors outside tokens; radius uniform.

- **T07 · Removal pass 1** — M. Needs **D2, D3**.
  Remove: pixel card banners (replace with a neutral `--surface` 16:9 placeholder
  area ready for diagrams), the 8-color per-card theme system, hero pixel icons,
  photo corner brackets (if D-owner agrees), ticker per D2.
  Done when: no pixel art outside the wordmark/loader; grid renders neutral cards.

- **T08 · Removal pass 2** — S. Needs **D5**.
  Mosaic strips per D5, scroll bot vs 2px lime top progress line per D5, all
  ALL-CAPS eyebrows (Index/About/Resume/Contact), footer pixel icon → plain year.
  Done when: spec §8 items 6/7/9/10 cleared.

- **T09 · Typography pass** — M. Needs **D8**.
  Nav, tags, labels, filter buttons off the pixel font; sentence-case small labels;
  data labels 13–14px muted; monospace only for tech tags and inline code, ≥12px;
  pixel font retained only per D8.
  Done when: no text below 12px; pixel font appears only where D8 allows.

- **T10 · Card redesign** — M. Needs **D3, D4**.
  New card anatomy: visual area (placeholder until diagrams), title, one-line
  outcome, ≤4 tags, access label ("Private codebase, walkthrough on request" /
  Live / GitHub). Entire card links through. Hover = border-color change only.
  Grid shape per D4. Done when: equal heights (if D4=a), no lift/shadow/scale hover.

- **T11 · Nav, footer, favicon** — M.
  Nav: wordmark left, links right, lime active underline, menu ≤640px, tap targets
  ≥44px. Footer: keep links + availability line, plain year. Favicon: "HR" monogram
  SVG on dark (replaces the pixel favicon). Done when: nav + footer match spec §4.

- **T12 · Motion pass** — S.
  Remove per-section scroll reveals site-wide (keep the boot loader + at most one
  hero page-load reveal). Audit `prefers-reduced-motion` still disables everything.
  Done when: no scroll-triggered fade-ins on sections; reduced-motion clean.

- **T13 · Skills fixes** — S.
  Reproduce the "two empty rows above Backend" bug (check the `dl` rendering and the
  reveal system), fix, reorder groups AI → Backend → Data → Frontend → Infrastructure,
  trim noise items (PyPI, Netlify — pending owner).
  Done when: no empty rows; AI group first; trimmed list approved.

### Phase 3 — Structure

- **T14 · Home slim-down** — M.
  Section order per 5.1: Hero, Selected work (6 picks — owner to-do), Research
  (KEEP text), Experience compact (2 rows + "Full experience on About"), Skills
  compact, CTA. Remove Home experience bullets (they stay on About).
  Done when: Home ≈ 4 screens; no content block duplicated with About.

- **T15 · Projects index** — S.
  Remove INDEX eyebrow, fix the "10 entries" count alignment, archive font sizes up,
  GradeSync/coursework into a collapsed "Earlier work" group or dropped (owner pick),
  consistent access labels.
  Done when: index matches 5.2; archive readable at 375px.

- **T16 · About reorder** — M. Needs owner (Humach outcomes, paper links).
  Section order: Intro, Experience, Education (thesis line visible), **Research and
  publications** (new — venue, year, role, link), Recognition, Leadership,
  Certifications (compressed). Add 2–3 Humach bullets when the owner supplies them.
  Done when: no duplication with Home; research section present.

- **T17 · Resume decision** — M. Needs **D6** + PDF file.
  A: delete `/resume` route, nav "Resume/CV" becomes a direct link to
  `/resume.pdf` (add the `_redirect`), About holds all content.
  B: rebuild the page from `portfolioData.js` (single source), print stylesheet,
  "Last updated" stamp. Done when: no half-empty page; PDF matches the site claims.

- **T18 · Case-study template upgrade** — M.
  Extend the existing case studies (they exist — see §1.1) with the new sections:
  At a glance (role/timeframe/stack/status/links), Constraints, What shipped,
  What I'd change. Data model: add optional `constraints`, `shipped`, `improve`
  arrays to `portfolioData.js`. Fill for ORA, Adcut, Axo first from existing
  verified copy; others follow.
  Done when: all 8 case studies render the full template without placeholder text.

### Phase 4 — Diagrams and visuals (owner verification required)

- **T19 · Diagram component + ORA** — L. Needs owner sign-off on the sketch.
  Static inline SVG component (no library): 1px strokes `--border-strong`, rounded
  rect nodes, sentence-case labels, `--accent` once per diagram, text alternative,
  legible at 360px. Build the ORA diagram from spec §5.2.
  Done when: ORA diagram renders in the case study + its card slot, verified by owner.

- **T20 · Adcut + Axo diagrams** — M each, same component. Owner verifies.

- **T21 · Quorum diagram + screenshots** — M. Needs owner screenshots for
  non-private projects (Let's Cook, Spendly, Knotic-Sense).
  Done when: every Home/Projects card has either a diagram or a real screenshot.

- **T22 · Wire visuals into cards + case studies** — S.
  Replace placeholder areas; 16:9 crop; lazy-load below the fold; alt text.
  Done when: no neutral placeholders remain.

### Phase 5 — Contact, technical, QA

- **T23 · Contact rebuild** — M. Needs **D7** + owner promises.
  Copy-to-clipboard email, location, timezone UTC+6, links, status, optional PhD
  line; form: labels, required marks, inline validation, states per spec.
  Done when: form tested end to end (success, validation error, failure + fallback).

- **T24 · OG image + structured data** — M. Needs a designed 1200×630 card.
  Name, "AI Engineer", three keywords, dark + lime. JSON-LD `Person` on Home.
  Done when: OG image renders in a validator; JSON-LD passes.

- **T25 · Netlify headers + PDF redirect** — S. Needs the PDF.
  `_headers` (security + caching), `/resume.pdf` redirect.
  Done when: headers live; PDF downloads with the right filename.

- **T26 · 404 + images + fonts** — M. Needs **D8**.
  Custom 404 page, WebP for the photo, explicit width/height everywhere, font
  subsetting, wordmark-to-SVG if D8=b.
  Done when: no layout shift from images; 404 renders branded.

- **T27 · Final QA** — M.
  Spec §11 checklist end to end + Lighthouse mobile targets (≥95/95/95/100) +
  keyboard-only navigation pass + link check + "no TODO text in production" grep.
  Done when: every box ticked; then a release push.

---

## 4. Execution order and parallelism

- Strict order: T01 → Phase 1 (T02–T05) → Phase 2 (T06–T13) → Phase 3 (T14–T18)
  → Phase 4 (T19–T22) → Phase 5 (T23–T27).
- Parallel-safe pairs (different files, if two agents work the same day):
  (T03, T04) copy-only · (T11, T13) · (T15, T16) · (T24, T25).
- Longest poles: T18 (template across 8 case studies) and T19–T22 (diagrams) —
  start owner verification early, they gate phase 4.
- Smallest visible wins first: T02 + T07 already change how the site reads.

## 5. Owner to-dos (gates — from spec §10, deduplicated)

1. Confirm Hype Corporation allows public architecture-level descriptions. *(gates T19–T22)*
2. Reword sign-off for the "owned" claim. *(gates T03)*
3. Humach Lab concrete outcomes (2–3 bullets). *(gates T16)*
4. Paper / DOI / poster links for both research entries. *(gates T16)*
5. Create ORCID + Google Scholar profiles. *(gates T16 links row)*
6. Verify each diagram against the real architecture. *(gates T19–T21)*
7. Screenshots for non-private projects. *(gates T21)*
8. Pick the 6 Home projects. *(gates T14)*
9. Resume: Option A or B, and the PDF file itself. *(gates T17, T25)*
10. Contact: response-time promise; PhD/research-openness line. *(gates T05, T23)*
11. Answers to decision gates D1–D8. *(gates T02, T07–T10, T17, T23, T26)*

## 6. Definition of done

Spec §11 checklist, verbatim, every box ticked — plus: zero TODO(owner) strings in
the built bundle (`grep -r "TODO(owner)" client/dist/` returns nothing), Lighthouse
mobile ≥95 across the board, and `handoff.md` reflecting the final state.
