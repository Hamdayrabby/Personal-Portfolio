# Portfolio Redesign Spec: hamday-rabby.netlify.app

Owner: Hamday Rabby Hossain. Pages: Home, Projects, About, Resume, Contact.
Goal: make the site read as a serious AI engineer's portfolio, without losing personality.

---

## 0. Agent protocol (read first)

1. Inspect the codebase before changing anything: stack, routes, where project/experience data lives, where CSS tokens live. Write findings to `handoff.md` (max 30 lines).
2. Work phase by phase (section 9). One commit per phase. After each phase: build, check 375px / 768px / 1440px, run Lighthouse, update `handoff.md`.
3. Do not invent facts, metrics, links, or screenshots. When something needs info only the owner has, leave a `TODO(owner):` comment and do not render placeholder text in production.
4. Do not rewrite copy marked **KEEP**. The writing is the strongest part of the site.
5. Add no new dependencies unless there is no reasonable alternative.
6. Prefer one data source (project data, experience data) rendered in many places over duplicated markup.

---

## 1. Diagnosis

- **Content: 9/10.** Case-study framing, decision-and-tradeoff language, and specific bullets (OAuth 2.0 + per-tenant rate limits, FCPXML behind a CI fidelity gate, silent date-drop bug in the job warehouse).
- **Visuals: 6.5/10.** Retro/pixel styling dominates and signals "game dev" before the content is read. Someone has already said this.
- **Positioning: inconsistent.** Hero says "Researcher", tagline says "production AI systems", page title says "Software Developer", target is AI engineering roles.
- **Structure: redundant.** Experience appears on Home and About. Resume page is a heading plus a download button with half the screen empty.
- **Missing:** project detail pages (the site promises "case studies" but cards show summaries), visible publications for PhD applications, form states, per-page meta.

The audience decides in about 10 seconds: (1) hiring managers for remote AI/backend roles, (2) PhD supervisors and admissions. Every change below serves those two readers.

---

## 2. Positioning rules

- **Primary identity:** AI Engineer. **Secondary:** researcher (M.Sc. thesis, Bangla fake news, IEEE symposium paper).
- Hero label, `<title>`, meta description, Resume header: use **AI Engineer**.
- Job titles inside Experience stay truthful: **Junior Software Developer**, **Research Assistant**. Do not retitle them.
- **Claim calibration.** The Resume hero says "I owned voice infrastructure, multi-tenant auth, and LLM tooling across six products", while the Experience entry says "contributed". Reviewers cross-check. Replace "owned" with a specific verb tied to a deliverable, for example: "Designed the ORA Machine API (OAuth 2.0, per-tenant rate limiting) and consolidated the realtime voice gateways behind one authenticated proxy." `TODO(owner): confirm wording.`

---

## 3. Design direction

### Keep
- Dark base, grid, spacing, generous whitespace
- Heading typeface (the bold grotesk)
- Lime as the single accent
- Photo (professional)
- All writing voice
- The pixel wordmark in the nav (the one retro signature, see "Remove" for the rest)

### Remove
- Pixel-art banners on project cards (biggest "game level select" signal)
- Multicolor category palette (pink, orange, purple, red, green, cyan)
- Pixel icons above the hero (3 small icons)
- Viewfinder corner brackets around the photo
- Blinking cursor / typed-style `> RESEARCHER` label
- Pixel-block divider strips between sections and in the footer (or keep one static monochrome strip in the footer only)
- Side scroll indicator with the pixel character on the right edge (replace with a 2px lime progress line at the top, or nothing)
- Pixel font for nav items, tags, and labels (unreadable at 10-11px)

### Change
- ALL-CAPS tracked eyebrow labels ("INDEX", "ABOUT", "RESUME", "CONTACT", "PRODUCT") become nothing. The H1 already says what the page is. Category on cards becomes small sentence-case text, and only research items get a badge.
- Small data labels: sentence case, body font, 13-14px, muted. Monospace only for tech tags and inline code, never below 12px.
- Meta strings with middle dots ("Hype Corporation · Dhaka · 2026") become separate spans or line breaks (low priority).
- Hover on cards: border color change only. No lift, no shadow, no scale.

### Tokens

```css
:root {
  --bg: #121212;
  --surface: #181818;
  --border: #262626;
  --border-strong: #3a3a3a;
  --text: #ededed;
  --text-muted: #a3a3a3;   /* verify contrast >= 4.5:1 on --bg */
  --accent: #b8e62e;       /* ONLY: links, active nav, primary button, focus ring, one diagram highlight */
  --radius: 6px;           /* one radius everywhere */
}
```

Type scale: body 16-17px / 1.65, max line length 68ch. H1 `clamp(2.25rem, 5vw, 4rem)`. No text below 12px anywhere, no body copy below 15px.

### The one memorable thing
Replace pixel banners with **architecture diagrams** (section 5.2). This is the signature of the site: it makes private-codebase work visible and proves the "decisions, not features" claim. Everything else stays quiet.

Honest note: near-black plus lime accent is a common look. The differentiator is the diagrams and the writing, not the color. If you want a distinct palette later, swap `--accent` in one place.

---

## 4. Global changes (all pages)

- [ ] **Nav:** wordmark left (pixel font OK here only), links right: Projects, About, Resume (or CV, see 5.4), Contact. Active state = lime text + 2px underline. Collapse to a menu at <= 640px. Tap targets >= 44px.
- [ ] **Footer:** keep email / GitHub / LinkedIn / Codeforces / LeetCode, plus "Open to AI engineering and backend roles" (**KEEP**). Remove the pixel icon next to "2026". Plain text year.
- [ ] **Scroll indicator / pixel character:** remove (see above).
- [ ] **Favicon:** simple monogram "HR" on dark with lime. Not a pixel sprite.
- [ ] **Per-page `<title>` and meta description** (section 7).
- [ ] **Accessibility:** visible `:focus-visible` ring in `--accent`, skip-to-content link, `prefers-reduced-motion` respected, alt text on photo, one `<h1>` per page, contrast >= 4.5:1.
- [ ] **Motion:** no scroll-triggered fade-ins on every section. If any motion remains, one page-load reveal on Home hero only.

---

## 5. Per page

### 5.1 Home (`/`)

**Section order:** Hero, Selected work, Research, Experience (compact), Skills (compact), Contact CTA.

**Hero**
- H1 (promote the current tagline): **"I build production AI systems."**
- Subline: "Real-time voice, retrieval, and agent infrastructure. Junior Software Developer at Hype Corporation; M.Sc. thesis on graph-tabular fraud detection at HSTU." `TODO(owner): approve wording.`
- Status line with a small lime dot: "Open to AI engineering and backend roles" (**KEEP**)
- CTAs: primary **View projects**, secondary **Download CV** (**KEEP** both)
- Remove: `RESEARCHER` label + cursor, 3 pixel icons, photo corner brackets, pixel divider strip under hero
- Photo: right column, 1px `--border`, radius `--radius`, proper alt text. On mobile, photo goes below the CTAs, smaller.

**Selected work**
- 6 cards. Default picks, ranked for AI engineering relevance: **ORA, Adcut, Axo, Hubble CLI, Quorum, manygpt-v2**. Anoura and Knotic-Sense live on the Projects page. `TODO(owner): confirm picks.`
- Layout: one featured card (ORA) full width, then a uniform 2-column grid. **Equal card heights.** The current mixed-size layout leaves cut-off banners and uneven rows.
- Card anatomy, top to bottom:
  1. Diagram or screenshot (16:9, see 5.2)
  2. Title
  3. One-line outcome (reuse the existing blurbs, they are good)
  4. Max 4 tech tags
  5. Access label: "Private codebase, walkthrough on request" / Live / GitHub
- Entire card is a link to the case study (or to Live/GitHub if no case study exists yet).
- Link below grid: "All projects and archive" (**KEEP**)

**Research** (keep on Home: it matters for PhD readers)
- Two entries as they are now (**KEEP** text). Add a link to the paper/DOI when available. `TODO(owner): links.`

**Experience (compact)**
- Two rows only: title, company, dates, one-line summary. Link: "Full experience on About".
- Remove the 4 bullets from Home (they live on About).

**Skills (compact)**
- Keep the grouped list, reorder groups: **AI, Backend, Data, Frontend, Infrastructure** (AI first for target roles).
- Fix: two empty bordered rows above "Backend" (render bug or an unfinished animation). Remove them.
- Trim items that add noise (PyPI, Netlify). Keep what you would be comfortable being interviewed on.

**CTA block**
- "Get in touch" block (**KEEP** copy: "the architecture notes are deliberately specific enough to argue with").

---

### 5.2 Projects (`/projects`) and case studies (`/projects/[slug]`)

**Projects index**
- H1 "Everything I've built that is worth explaining." (**KEEP**) and the intro paragraph (**KEEP**). Remove the "INDEX" eyebrow.
- Filter chips All / Products / Research: keep. Fix alignment of the "10 entries" count (currently floats next to the chips).
- Grid uses the same card as Home, with diagrams.
- **Archive list:** keep the content. Raise font sizes (descriptions currently very small, tags in pixel font). Consider dropping **GradeSync** (Java Swing coursework dilutes the AI/backend story) or moving the coursework items under a collapsed "Earlier work" group.
- Consistent access labels everywhere: Private codebase / Live / GitHub / Write-up.

**Case study pages (new, highest-impact addition)**
The site says "case studies cover the decision and the tradeoff" but cards do not lead to one. Verify whether they link anywhere. If not, build these pages, in this order: **ORA, Adcut, Axo**, then Hubble CLI, manygpt-v2, Quorum.

Template (600-900 words, no invented metrics):

```
Title + one-line outcome
At a glance: role, timeframe, stack, status, links
Problem: what had to work and why it was hard
Constraints: latency, security, multi-tenancy, correctness, team size
Decisions (2-4): decision / alternatives considered / why / tradeoff accepted
Architecture: diagram + 3-5 sentences
What shipped: verifiable facts only
What I'd change: one honest paragraph
```

Rules:
- Private-codebase projects are described at architecture level only: no secrets, client data, endpoints, or internal names. `TODO(owner): confirm Hype Corporation allows public architecture descriptions.`
- Use the existing site copy as the source of truth for facts. Anything else needs the owner.

**Architecture diagrams (the signature element)**
- Static inline SVG, no library. 1px strokes in `--border-strong`, rounded-rect nodes with sentence-case labels, `--text-muted` for secondary text.
- `--accent` used once per diagram, to mark the single most important thing (a trust boundary or the gate).
- Must be legible at 360px wide (simplify, do not shrink text below 12px) and have a text alternative.
- Starter sketches, built only from facts already on the site. `TODO(owner): verify each against the real architecture before publishing.`
  - **ORA:** Browser mic → single authenticated realtime proxy (accent) → Gemini Live. Side path: Machine API (OAuth 2.0, secret-key auth, per-tenant and per-IP rate limits) → NestJS → MongoDB / Redis.
  - **Adcut:** Timeline model → exporters (FCPXML, OpenTimelineIO, Premiere XML) → CI fidelity gate (accent) → pass / fail.
  - **Axo:** Product plan → DAG package planner → builder-aware prompt compiler → validated implementation package → coding agent. Persistent state handoff as a side arrow.
  - **Quorum:** Question → staged model instances → researcher (must cite) → answer with evidence.
  - **Others:** a clean screenshot on the dark background, 1px border, no device frame.

---

### 5.3 About (`/about`)

This page becomes the single home for full Experience, Education, and everything credential-like.

**Section order:** Intro, Experience, Education, Research and publications, Recognition, Leadership, Certifications.

- **Intro:** H1 "How I got here, and what I actually care about." (**KEEP**). Paragraphs 1-2 (**KEEP**, these are excellent). Remove the "ABOUT" eyebrow.
- **Intro paragraph 3:** currently says "a Computer Science degree from HSTU", which omits the M.Sc. Rewrite: "B.Sc. in CSE from HSTU (CGPA 3.399/4.00), now doing my M.Sc. there, with competitive programming and two research projects: one on synthetic misinformation, one an interpretable ensemble presented at an IEEE symposium."
- **Links row:** Email, GitHub, LinkedIn, LeetCode (**KEEP**). Add Google Scholar and ORCID once they exist. `TODO(owner): create ORCID + Google Scholar.`
- **Experience:** keep all Hype Corporation bullets (**KEEP**). Humach Lab currently has one sentence and no outcomes. Add 2-3 bullets with concrete results (dataset size, models evaluated, key finding). `TODO(owner): provide.`
- **Education:** M.Sc. (2026-present) and B.Sc. (2020-2023, CGPA 3.399/4.00). Show the thesis line fully: "Hybrid graph-tabular credit card fraud detection".
- **Research and publications (new):** the two research projects with venue, year, role, and a link (paper, DOI, or poster). This is what PhD readers look for first.
- **Recognition:** keep as is.
- **Leadership:** move below Recognition. Lower relevance for AI engineering roles.
- **Certifications:** compress to a single compact list. Keep AWS AI Practitioner and Kaggle/Google Agents. Consider dropping or demoting the MERN course.
- Remove duplicate "Full resume" link if the Resume page is removed (see 5.4).

---

### 5.4 Resume (`/resume`)

Problem: the page is a heading, three lines, and a download button, with about half the viewport empty. It duplicates About.

**Option A (recommended): remove the page.** Nav item becomes "Resume" and downloads the PDF directly (or opens it in a new tab). About holds all the content. Less to maintain.

**Option B: keep the page, but make it real.** Render a compact one-page CV from the same data source as About (no copy-paste), with a "Download PDF" button and "Last updated Nov 2026". Add a print stylesheet so Ctrl+P gives a clean one-pager.

Either way:
- Header "Software Developer · Dhaka, Bangladesh" becomes **"AI Engineer · Dhaka, Bangladesh"**.
- Fix the "owned" sentence (section 2).
- The PDF must match the site: same title, same dates, same claims. File name: `Hamday_Rabby_Hossain_Resume.pdf`.

---

### 5.5 Contact (`/contact`)

- H1: keep the idea ("Write to me about a role, a system, or a decision you'd have made differently.") but cap font size so it fits in **3 lines max** at 1440px. At the current size it takes 5 lines and pushes the form down. Remove the "CONTACT" eyebrow.
- **Left column:** email with a copy-to-clipboard button, location, links (LinkedIn, GitHub, Codeforces), status ("Open to AI engineering and backend roles", **KEEP**). Add timezone: UTC+6. Optional, if true: "Also open to research collaboration and PhD opportunities." `TODO(owner): decide.`
- **Form:** visible labels, required fields marked, inline validation, button label **"Send message"**, disabled with "Sending..." while submitting.
  - Success: "Sent. I'll reply within 2 working days." `TODO(owner): confirm timeframe.`
  - Error: say what failed and give the `mailto:` fallback.
  - Spam: Netlify Forms with a honeypot field.
- Inputs: 1px `--border`, `--surface` fill, accent focus ring.

---

## 6. Copy changes (before → after)

| Where | Before | After |
|---|---|---|
| `<title>` (all pages) | Hamday Rabby Hossain — Software Developer | Hamday Rabby Hossain — AI Engineer |
| Home hero label | `> RESEARCHER` | removed |
| Home H1 | (none; tagline in small text) | I build production AI systems. |
| Resume header | Software Developer · Dhaka, Bangladesh | AI Engineer · Dhaka, Bangladesh |
| Resume paragraph | "...where I owned voice infrastructure..." | specific verb + deliverable (section 2) |
| About paragraph 3 | "a Computer Science degree from HSTU" | B.Sc. + current M.Sc. (section 5.3) |
| Page eyebrows | INDEX / ABOUT / RESUME / CONTACT | removed |
| Card category label | PRODUCT in caps on every card | removed; "Research" badge only on research items |
| Contact button | Send | Send message |

Everything not listed: **KEEP**.

---

## 7. Technical, SEO, performance

- **Meta per page:** unique `<title>` and description. Home: "AI engineer building production systems in real-time voice, retrieval, and agent infrastructure. Case studies, research, and resume." (current description is good, **KEEP**.)
- **OG image (1200x630):** replace the profile photo with a designed card: name, "AI Engineer", three keywords (real-time voice, retrieval, agents), dark background, lime accent.
- **Structured data:** `Person` JSON-LD on Home (name, jobTitle, url, sameAs: LinkedIn, GitHub, ORCID/Scholar when available).
- **Files:** `sitemap.xml`, `robots.txt`, canonical URLs, custom 404 page.
- **Images:** WebP/AVIF, explicit width/height (no layout shift), lazy-load below the fold, preload the hero photo.
- **Fonts:** `font-display: swap`, subset, max 2 families. Drop the pixel font if only the wordmark uses it (convert wordmark to SVG).
- **Netlify:** `_headers` for security and caching; direct `/resume.pdf` redirect.
- **Optional:** privacy-friendly analytics (Plausible or Netlify Analytics) to see which pages recruiters actually open.
- **Lighthouse targets (mobile):** Performance >= 95, Accessibility >= 95, Best Practices >= 95, SEO 100.
- **Mobile checks (375px):** nav menu works, cards single column, hero photo and CTAs visible without horizontal scroll, diagrams legible, form usable, tap targets >= 44px.

---

## 8. Explicit remove list (quick reference for the agent)

1. Pixel-art card banners
2. Multicolor category colors
3. Hero pixel icons (3)
4. Photo corner brackets
5. `> RESEARCHER` label and blinking cursor
6. Pixel divider strips (all, or keep one static monochrome strip in footer)
7. Right-edge scroll indicator with pixel character
8. Pixel font on nav, tags, labels
9. ALL-CAPS tracked eyebrow labels
10. Pixel icon in footer next to the year
11. Empty rows above Skills "Backend"
12. Full Experience bullets on Home (kept on About)
13. Duplicate Resume content (if Option A)

---

## 9. Phases and acceptance criteria

### Phase 1: Identity and copy (quick win, do first)
- Apply section 6 copy changes, per-page titles and meta.
- **Done when:** no "Software Developer" or "Researcher" appears as the primary identity; Resume claim reworded; About paragraph 3 mentions the M.Sc.

### Phase 2: Visual cleanup
- Tokens, typography, removals (section 8), new card without banners (neutral placeholder area until diagrams exist), nav and footer.
- **Done when:** only one accent color visible; no pixel font except the wordmark; no text below 12px; screenshot passes the "does not look like a game site" test with a friend or peer.

### Phase 3: Structure
- Slim Home, About reorder, Research/Publications section, Resume decision (A or B), compact Skills with empty rows fixed, Projects page alignment and archive sizing.
- **Done when:** no content block appears in two places; every page has one H1; Home fits the story in about 4 screens.

### Phase 4: Case studies and diagrams (needs owner input)
- ORA, Adcut, Axo first. Diagrams per 5.2. Cards link through.
- **Done when:** each of the first three has a diagram plus the full template; owner has verified architecture accuracy and employer permission.

### Phase 5: Contact, technical, QA
- Contact form states, OG image, JSON-LD, sitemap, robots, 404, headers, Lighthouse and mobile pass.
- **Done when:** Lighthouse targets met; form tested end to end (success, validation error, failure); links checked.

---

## 10. Owner to-do (only Hamday can supply)

- [ ] Confirm Hype Corporation permits public architecture-level descriptions
- [ ] Reword the "owned" claim on the Resume hero
- [ ] Humach Lab outcomes (2-3 concrete results)
- [ ] Paper / DOI / poster links for both research projects
- [ ] Create ORCID and Google Scholar profiles
- [ ] Verify the diagram sketches against real architectures
- [ ] Screenshots for non-private projects (Let's Cook, Spendly, Knotic-Sense)
- [ ] Pick the 6 Home projects
- [ ] Choose Resume Option A or B
- [ ] Contact response-time promise; whether to mention PhD/research openness

---

## 11. Final QA checklist

- [ ] Hero passes the 10-second test: name, "AI Engineer", what you build, how to reach you
- [ ] No game/arcade cues remain (except the wordmark)
- [ ] One accent color, one radius, consistent card heights
- [ ] Every claim on the site matches the PDF resume
- [ ] No placeholder or TODO text visible in production
- [ ] All external links open and have been checked
- [ ] Keyboard-only navigation works end to end
- [ ] Reduced-motion setting disables any animation
- [ ] 375px, 768px, 1440px reviewed
