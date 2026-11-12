// Portfolio content.
//
// Two rules govern this file:
//   1. Every claim is something the repo or the codebase can substantiate.
//   2. Work done inside a company codebase is described at architecture level
//      with no links, no internal endpoints and no customer detail.
//
// `visibility: "private"` renders as "Private codebase — walkthrough on request".

export const profile = {
  name: "Hamday Rabby Hossain",
  role: "AI Engineer",
  location: "Dhaka, Bangladesh",
  email: "hamdayrabby385@gmail.com",
  phone: "+880 1720 908856",
  github: "https://github.com/Hamdayrabby",
  linkedin: "https://www.linkedin.com/in/hamday-rabby-hossain-714990234/",
  codeforces: "https://codeforces.com/profile/hamdayrabby385",
  leetcode: "https://leetcode.com/hamdayrabby385",
  resumePdf: "", // set to a direct PDF link when one exists
  availability: "Open to AI engineering and backend roles",

  // Hero copy. Short, declarative, no adjectives. **text** renders italic.
  lede: "I build production AI systems — real-time voice, retrieval, and **agent infrastructure**.",
  intro:
    "Most recently at Hype Corporation, where I owned voice infrastructure, multi-tenant auth, and LLM tooling across six products. Before that, research on Bengali misinformation detection and an interpretable churn model running as a live application.",
  bio: [
    "I work on the parts of an AI system that decide whether it survives production: who is allowed to call what, what happens when the model is wrong, and how a request travels from a browser microphone to a model and back without leaking a session.",
    "That has meant collapsing duplicate realtime gateways, replacing trusted client state with signed server state, making payment capture exactly-once, and building export pipelines whose output is validated against the format it claims to be.",
    "My background is a Computer Science degree from HSTU, competitive programming, and two research projects — one on synthetic misinformation, one an interpretable ensemble presented at an IEEE symposium.",
  ],
};

export const experience = [
  {
    role: "AI Engineer",
    org: "Hype Corporation",
    location: "Dhaka, Bangladesh",
    period: "Jul 2026 — Nov 2026",
    summary:
      "Six production products across realtime voice, AI video editing, LLM tooling, and commerce. Scope ran the full stack; ownership concentrated in voice infrastructure, authentication and tenant isolation, and data-integrity fixes.",
    highlights: [
      "Consolidated the voice agent's realtime gateways into one proxy and moved role enforcement to the edge.",
      "Built the video editor's NLE export pipeline and the three-layer engineering harness behind it.",
      "Added group-chat sharing and session-scoped semantic memory to the LibreChat-based platform.",
    ],
    products: ["ORA", "Adcut", "manygpt-v2", "Axo", "ai-creators-bd", "altName"],
  },
  {
    role: "Research Assistant",
    org: "Humach Lab",
    location: "Remote",
    period: "Feb 2026 — Jun 2026",
    summary:
      "Transformer-based NLP research: dataset construction, experiment runs, and evaluation pipelines.",
  },
];

// Projects with a case-study page. Order here is the order on the site.
export const projects = [
  {
    slug: "ora",
    kind: "product",
    title: "ORA",
    subtitle: "Voice-first AI sales agent",
    org: "Hype Corporation",
    role: "AI Engineer",
    period: "Aug 2026 — Nov 2026",
    visibility: "private",
    featured: true,
    summary:
      "A realtime voice agent embedded in merchant storefronts, answering product questions and taking orders over speech.",
    context:
      "The agent runs on two paths that were originally separate: a Socket.IO channel and a raw WebSocket channel. Each carried its own entitlement checks, its own quota accounting, and its own session timer registry. Adding a feature meant implementing it twice, and the two paths had already drifted.",
    decisions: [
      {
        title: "Collapsed two realtime gateways into one authenticated proxy",
        detail:
          "Consolidated both transports behind a single VoiceProxyGateway that performs authentication, entitlement checks and quota accounting once. Removing the duplicate paths also removed a second SessionTimerService registry — two places were incrementing session timers for the same call.",
      },
      {
        title: "Replaced client-writable role state with a signed edge cookie",
        detail:
          "The application read the user's role from a cookie the client could write. Swapping that value was enough to reach paid features. It now carries an HMAC-SHA256 signature over an httpOnly cookie, verified at the Next.js edge before the request reaches application code.",
      },
      {
        title: "Enforced tenant origins on publishable keys",
        detail:
          "Publishable tenant keys were usable from any origin. They are now constrained by an allowedDomains list with subdomain matching and IPv6-safe host parsing, with a localhost escape that only exists in development.",
      },
      {
        title: "Chose native speech-to-speech over a cascaded pipeline",
        detail:
          "An ASR → LLM → TTS chain adds two round trips and loses prosody. The agent uses Gemini Live directly: capture through an AudioWorklet at 16 kHz in roughly 128 ms frames, playback scheduled at 24 kHz behind a 100 ms jitter buffer.",
      },
      {
        title: "Grounded retrieval with live verification",
        detail:
          "Hybrid retrieval returns the top five tenant-scoped passages, then verifies price and stock against live data before the answer is generated. Two fallback gaps — a Mongo re-check, then a live merchant search — cover the case where retrieved context is stale, and embeddings are repaired asynchronously rather than blocking the response.",
      },
    ],
    fixes: [
      "Two session-timer registries incrementing the same call.",
      "A paywall bypass reachable by editing a cookie value.",
      "An AudioWorklet node leaked across every standby/resume cycle.",
      "A stalled AudioContext with no watchdog, leaving silent dead calls.",
    ],
    outcome:
      "One gateway, one place to enforce entitlement, and a role check that fails closed. Voice sessions survive standby, and a stale catalog no longer produces a confidently wrong price.",
    stack: ["TypeScript", "Next.js", "NestJS", "MongoDB", "Redis", "Gemini Live", "Socket.IO", "WebSocket"],
    note: "Shared codebase. My ownership was the voice gateway, authentication and tenant isolation, and the retrieval path.",
    links: [],
  },
  {
    slug: "hubble",
    kind: "product",
    title: "Hubble CLI",
    subtitle: "Agentic coding CLI",
    org: "Independent",
    role: "Sole author",
    period: "Sep 2026 — Nov 2026",
    visibility: "public",
    featured: true,
    summary:
      "A provider-agnostic agentic coding tool — swappable models, isolated execution, and orchestration across several agent runtimes.",
    context:
      "Most coding agents assume one provider and one process. Hubble treats the model as a swappable dependency and the runtime as a sandbox problem — the interesting part is not the loop, it is everything around it.",
    decisions: [
      {
        title: "Provider-agnostic tool-calling loop",
        detail:
          "One loop drives native Anthropic tool use, OpenAI-compatible function calling, and local models through the same interface, so switching providers does not change how a task is expressed.",
      },
      {
        title: "OS-level sandboxing with secret confinement",
        detail:
          "Work runs inside Seatbelt on macOS, bubblewrap on Linux, or a Docker container, with secret files mapped out of reach rather than filtered string-by-string after the fact.",
      },
      {
        title: "Bounded DAG scheduler for cross-runtime orchestration",
        detail:
          "Tasks run across Codex, Antigravity, Muse, OpenCode and Command Code with one pinned worktree per writer — concurrent writers cannot collide — and an append-only run journal for replay.",
      },
      {
        title: "A deliberately bounded self-improvement loop",
        detail:
          "One strategy change per iteration, proposers blind to their own scores, human approval before adoption, and security settings outside the mutable surface.",
      },
    ],
    fixes: [
      "Ctrl+C tore down the operator console instead of the running task.",
      "Worktree collisions between concurrent writers.",
      "Porcelain parsing silently dropped files with certain names.",
      "Subagents completed without returning a report.",
    ],
    outcome:
      "81 commits, sole author, published on PyPI. The published release is 4.3.3.",
    stack: ["TypeScript", "Node.js", "Python", "Docker", "bubblewrap", "Seatbelt"],
    links: [
      { label: "GitHub", href: "https://github.com/Hamdayrabby/hubble-cli" },
      { label: "PyPI", href: "https://pypi.org/project/hubble-cli/" },
    ],
  },
  {
    slug: "anoura",
    kind: "product",
    title: "Anoura",
    subtitle: "Commerce platform and ERP",
    org: "Independent product",
    role: "Architect and engineer",
    period: "Aug 2026 — Nov 2026",
    visibility: "private",
    featured: true,
    summary:
      "A fashion commerce platform with a storefront, an operations back office, and a payment pipeline that has to agree with itself.",
    context:
      "The system began as one application serving both customers and staff. Two audiences with different threat models, release cadences and failure modes cannot share one auth boundary or one deploy.",
    decisions: [
      {
        title: "Split one monolith into three deployable applications",
        detail:
          "A NestJS/Prisma API, a Next.js storefront, and a Vite/React ERP now deploy independently. The public store module is the only sanctioned write path from the storefront, so the back office can evolve without widening the customer-facing surface.",
      },
      {
        title: "Isolated store-admin authentication",
        detail:
          "Staff authentication has its own JWT secret, its own cookie, its own RBAC, and server-side revocation. A compromised customer session cannot be escalated into an admin session because there is no shared trust to escalate through.",
      },
      {
        title: "Made payment capture exactly-once",
        detail:
          "A mutable order status allowed PAID → PENDING → CONFIRMED, so the same payment could post twice. Capture now writes an immutable SALE ledger entry; the ledger, not the order status, is the record of truth.",
      },
      {
        title: "Closed three perimeter holes",
        detail:
          "CORS reflected any origin, rate limiting keyed on a client-supplied X-Forwarded-For, and an x-mock-role header was trusted. Now: an explicit allowlist, a rate-limit key derived from the connection, and default-deny RBAC with the backdoor removed.",
      },
    ],
    fixes: [
      "Double-posted payments from the mutable status transition.",
      "Soft-deleted customers reappearing after a restore path re-read them.",
      "ApexCharts instance held in useState, re-instantiating on every render.",
      "Neon connection pool dying on idle and taking the API with it.",
    ],
    outcome:
      "Three applications that can be released separately, an admin surface with its own trust boundary, and a payments ledger that cannot double-count.",
    stack: ["TypeScript", "NestJS", "Prisma", "PostgreSQL", "Next.js", "Vite", "React"],
    links: [],
  },
  {
    slug: "adcut",
    kind: "product",
    title: "Adcut",
    subtitle: "AI video editor with frame-accurate export",
    org: "Hype Corporation",
    role: "AI Engineer",
    period: "Sep 2026 — Nov 2026",
    visibility: "private",
    featured: true,
    summary:
      "A browser-based AI video editor that exports to professional NLEs — and validates that the export is actually correct.",
    context:
      "Timeline edits are meaningless if they cannot leave the product. Export to Final Cut, Premiere and OpenTimelineIO is where an editor either becomes a real tool or stays a demo.",
    decisions: [
      {
        title: "Export with per-format validation gates",
        detail:
          "FCPXML, OpenTimelineIO and Premiere XML each get a dedicated writer and a validation gate — frame boundaries, track mapping and timecode are checked against the target format before the file is offered, rather than trusting a best-effort serializer.",
      },
      {
        title: "A separate admin control plane",
        detail:
          "Operations data lives behind its own surface with server-side pagination across nine datasets, so reviewing accounts or audit events never loads a full collection into the client.",
      },
      {
        title: "Audited the pipeline for 4K60 before it shipped",
        detail:
          "The audit named the specific failures: a 5 GiB single-PUT ceiling, a seven-minute poll timeout, whole-file buffering into memory, 36k–54k PNG frames rasterized per export, CPU-bound encoding, and an in-process worker. The value was in naming them concretely enough to fix in order.",
      },
      {
        title: "Three-layer engineering harness",
        detail:
          "An agent hook, a pre-commit stage, and CI enforce the same checks, so a rule cannot be bypassed by using a different entry point.",
      },
    ],
    fixes: [
      "Prisma findMany receiving undefined on the /admin/audit route.",
      "A duplicate createPortal call breaking the build.",
      "strictnessToTightness throwing at runtime on unset values.",
      "ChatPanel split into modules once it passed the size where edits became risky.",
    ],
    outcome:
      "Export that produces files an editor will actually open, and an audit that turned a vague performance concern into an ordered list of concrete limits.",
    stack: ["TypeScript", "React", "Next.js", "Prisma", "ffmpeg", "FCPXML", "OpenTimelineIO"],
    note: "Shared codebase. My scope was NLE export, the engineering harness, admin and billing, and the ChatPanel split.",
    links: [],
  },
  {
    slug: "axo",
    kind: "product",
    title: "Axo",
    subtitle: "Deterministic prompt compiler for AI builders",
    org: "PromptNext",
    role: "Engineer",
    period: "Jul 2026 — Aug 2026",
    visibility: "private",
    featured: true,
    summary:
      "Turns a product plan into a deterministic, validated implementation package that a coding agent can execute without re-planning.",
    context:
      "Asking an LLM to both plan and build produces plans that drift. If the plan is compiled into a checked artifact first, the build step becomes mechanical — and costs nothing extra in tokens.",
    decisions: [
      {
        title: "An implementation-package layer between planning and building",
        detail:
          "Four stages — package-planner, package-analyzer, package-validator, package-compiler — turn a plan into a graph, check it, then emit build instructions. Node count is bounded between 2 and 8, with cycle detection and topological ordering, so an invalid plan fails at compile time instead of mid-build.",
      },
      {
        title: "Builder-aware prompt protocol",
        detail:
          "PROJECT_CONTEXT.md and BUILD_STATE.md carry durable state across sessions, and capabilities are gated per target tool — a capability a builder does not have is never emitted into its instructions.",
      },
    ],
    outcome:
      "Same plan in, same package out. Validation is deterministic and adds no extra LLM cost.",
    stack: ["LLM orchestration", "Prompt compilation", "CLI tooling"],
    links: [],
  },
  {
    slug: "manygpt",
    kind: "product",
    title: "manygpt-v2",
    subtitle: "Group chat and semantic memory for an LLM platform",
    org: "Hype Corporation",
    role: "AI Engineer",
    period: "Jul 2026 — Aug 2026",
    visibility: "private",
    featured: true,
    summary:
      "Shared conversations and session-scoped semantic memory on a LibreChat-based platform.",
    context:
      "The platform is LibreChat v0.8.7, extended, not built. Adding group chat means changing authorization in middleware that already assumes a single owner, and adding memory means deciding whose memory a shared conversation is allowed to write to.",
    decisions: [
      {
        title: "Invite-code membership inside existing middleware",
        detail:
          "Group sharing is modelled as membership records keyed by invite code, enforced inside the existing LibreChat authorization middleware so every route inherits it rather than each route re-implementing a check.",
      },
      {
        title: "JWT-authenticated Socket.IO for shared sessions",
        detail:
          "Realtime events authenticate with the same JWT as REST, so a socket cannot observe a conversation its token does not cover.",
      },
      {
        title: "Session-scoped memory that cannot leak into the personal pool",
        detail:
          "Semantic memory is namespaced per session. The initial implementation wrote group-chat context into the personal memory pool — a design bug with privacy consequences. Namespacing fixed the write path, not just the read filter.",
      },
    ],
    outcome:
      "Group conversations with membership-aware authorization, and memory that respects the boundary between a shared session and a person.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Socket.IO", "JWT"],
    note: "Built on LibreChat v0.8.7. Roughly 4,800 commits are upstream.",
    links: [],
  },
  {
    slug: "quorum",
    kind: "product",
    title: "Quorum",
    subtitle: "Multi-agent debate with cited evidence",
    org: "Advanced AI coursework",
    role: "Sole author",
    period: "Nov 2026",
    visibility: "public",
    featured: true,
    summary:
      "Several model instances argue a question in stages, with a researcher that has to cite what it finds.",
    context:
      "Multi-agent systems usually fail in one of two ways: one agent's error propagates because failures are not isolated, or the 'research' is the model recalling rather than retrieving.",
    decisions: [
      {
        title: "Staged concurrent pipeline with failure isolation",
        detail:
          "Seats run concurrently per stage and a seat that fails does not cancel the round — it falls back, including on 429 and 5xx responses, so one rate-limited provider cannot take down the debate.",
      },
      {
        title: "A researcher that actually calls a tool",
        detail:
          "Claims are grounded through Tavily retrieval and carry their citations into the synthesis, so attribution is checkable rather than asserted.",
      },
    ],
    outcome:
      "A debate that degrades gracefully under provider failure and produces evidence a reader can verify.",
    stack: ["Multi-agent orchestration", "LLM tool calling", "Tavily"],
    links: [{ label: "GitHub", href: "https://github.com/Hamdayrabby/Quorum" }],
  },
  {
    slug: "knotic-sense",
    kind: "product",
    title: "Knotic-Sense",
    subtitle: "Job-search tracker with ATS scoring",
    org: "Independent",
    role: "Sole author",
    period: "Jan 2026 — Sep 2026",
    visibility: "public",
    featured: true,
    summary:
      "A stage-based job application tracker that scores a résumé against a specific posting and suggests targeted edits.",
    context:
      "Job searching is a pipeline problem that most people run in a spreadsheet. The useful addition is not another board — it is telling someone what in their résumé is failing for the role they actually want.",
    decisions: [
      {
        title: "Model the search as a pipeline, not a list",
        detail:
          "Applications move through Applied, Interview and Offer stages with per-stage state, which makes the interesting metrics — conversion, stall, abandonment — derivable instead of guessed.",
      },
      {
        title: "Semantic matching plus ATS heuristics",
        detail:
          "Semantic similarity against the posting is combined with ATS-style structural checks, so the output is a score plus specific edits a candidate can apply rather than one opaque number.",
      },
      {
        title: "JWT auth with role-based access",
        detail:
          "REST endpoints authenticate with JWT and authorize by role, so user data is scoped server-side.",
      },
    ],
    outcome: "Live in production, 28 commits, used as a real tracker rather than a demo.",
    stack: ["React", "Vite", "Express", "MongoDB Atlas", "Gemini", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://knotic-sense.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Hamdayrabby/knotic_Sense" },
    ],
  },
];

// Research gets its own shape — it is evidence, not a product.
export const research = [
  {
    slug: "bangla-misinformation",
    kind: "research",
    title: "Synthetic Evolution and Adversarial Resilience in Bangla Fake News Detection",
    venue: "M.Sc. research — ongoing",
    role: "Researcher and primary engineer",
    summary:
      "Testing whether Bengali fake-news detectors survive text that has been laundered by an LLM.",
    context:
      "Detection benchmarks assume fake news is written by humans. If a model can rewrite a fake article to read like real reporting without changing its claims, the detector still has to catch it — and the dataset must not leak the answer through style instead of substance.",
    decisions: [
      {
        title: "Constrained generation to style transfer only",
        detail:
          "The polishing step is guarded so it may change register and phrasing but never facts. Without that constraint the experiment measures correction, not laundering.",
      },
      {
        title: "Matched length distributions to remove a shortcut",
        detail:
          "Generated text was shorter than human news on average, which makes 'length' a learnable signal that has nothing to do with truth. Length was matched using a KS statistic with quantile mapping, so the detector cannot win on formatting.",
      },
      {
        title: "Audited the dataset instead of trusting it",
        detail:
          "Roughly 2,000 human-written items had been misfiled into the synthetic split, and about 25% of the synthetic pool were mislabelled duplicates. Both were removed, leaving a clean pool of 8,057 articles.",
      },
      {
        title: "Generated at scale, with resumability",
        detail:
          "Six models produced 24,171 rows — about 145,000 samples. The pipeline surfaced a trap where a model returning empty output is invisible to --resume and silently shrinks the dataset.",
      },
    ],
    outcome:
      "A clean corpus, and an evaluation that scores resistance to laundering rather than sensitivity to formatting.",
    stack: ["Python", "Transformers", "LLM prompting", "Bengali NLP"],
  },
  {
    slug: "telecom-churn",
    kind: "research",
    title: "An Interpretable Ensemble for Real-Time Telecom Churn Prediction",
    venue: "Undergraduate thesis · IEEE CS BDC Summer Symposium 2025",
    role: "Researcher and engineer",
    summary:
      "An ensemble churn model with per-prediction explanation, deployed as an application a non-technical user can operate.",
    context:
      "Churn models are usually evaluated on AUC and then never used, because a retention team cannot act on a probability with no reason attached.",
    decisions: [
      {
        title: "Explanation as a first-class output",
        detail:
          "SHAP values are computed per prediction and surfaced alongside the score, so the output is 'this customer is at risk because of X' rather than a bare number.",
      },
      {
        title: "Ensemble over single-model accuracy",
        detail:
          "Feature engineering and an ensemble were chosen for stability across customer segments, with evaluation covering more than aggregate accuracy.",
      },
      {
        title: "Shipped it as an application",
        detail:
          "The model runs behind a Streamlit interface where a user can set customer attributes and read the resulting risk and contributing factors — the same artifact serves as the thesis demo.",
      },
    ],
    outcome:
      "Presented at IEEE CS BDC Summer Symposium 2025 and deployed publicly.",
    stack: ["Python", "scikit-learn", "SHAP", "Streamlit"],
    links: [
      { label: "Live app", href: "https://telecom-customer-churn-prediction-webapp.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/Hamdayrabby/Telecom-Customer-Churn-Prediction-WebApp" },
      { label: "Kaggle", href: "https://www.kaggle.com/code/hamdayrabbyhossain/customer-churn-eda-prediction-ensemble" },
    ],
  },
];

// Compact rows. No case-study page — these are here for completeness, not emphasis.
export const archive = [
  {
    title: "ai-creators-bd",
    org: "Hype Corporation",
    year: "2026",
    summary:
      "Community platform and LMS. Server-authoritative lesson progress with row-level security and a security-definer RPC, plus a revenue-integrity fix where abandoned checkouts defaulted to completed and inflated lifetime value.",
    stack: ["Next.js", "PostgreSQL", "Supabase", "bKash"],
    visibility: "private",
  },
  {
    title: "altName",
    org: "Hype Corporation",
    year: "2026",
    summary:
      "AI brand-name generator. Rewrote admin analytics with period-over-period KPIs and CSV export, added account deactivation with session revocation and OAuth-account detection, and shipped Stripe credit packs in a seven-day sprint.",
    stack: ["Next.js", "Stripe", "Better-Auth"],
    visibility: "private",
  },
  {
    title: "Bangladesh Job Market Warehouse",
    org: "Data Mining coursework",
    year: "2026",
    summary:
      "ETL and warehouse over scraped job postings. Most of the work was data quality: float-parsed years silently dropping every date from one source, a filter discarding 4,223 undated rows, and a dashboard rebuilt when the charting library changed its DOM.",
    stack: ["Python", "SQL", "Streamlit"],
    visibility: "private",
  },
  {
    title: "Let's Cook",
    org: "Independent",
    year: "2026",
    summary:
      "MERN recipe platform with role-based user and admin access, AI-assisted recipe generation, and moderation workflows.",
    stack: ["React", "Express", "MongoDB", "JWT"],
    visibility: "public",
    links: [
      { label: "Live", href: "https://let-s-cook-ruddy.vercel.app" },
      { label: "GitHub", href: "https://github.com/Hamdayrabby/Let-s-Cook" },
    ],
  },
  {
    title: "Spendly",
    org: "Independent",
    year: "2026",
    summary:
      "Personal finance tracker with aggregation-pipeline dashboards, refresh-token auth, and hardened headers and rate limiting.",
    stack: ["React", "Express", "MongoDB", "Recharts", "JWT"],
    visibility: "public",
    links: [
      { label: "Live", href: "https://spendly.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Hamdayrabby/Spendly" },
    ],
  },
  {
    title: "GradeSync",
    org: "Coursework",
    year: "2025",
    summary:
      "Java Swing result-management system with MySQL persistence and separate student and administrator interfaces.",
    stack: ["Java", "Swing", "MySQL", "JDBC"],
    visibility: "public",
    links: [{ label: "GitHub", href: "https://github.com/Hamdayrabby/GradeSync" }],
  },
  {
    title: "Smart Study Assistant",
    org: "Independent",
    year: "2025",
    summary:
      "Study planner built on AWS PartyRock: syllabus decomposition, quiz generation, and schedule-aware study modules.",
    stack: ["Amazon Bedrock", "PartyRock"],
    visibility: "public",
    links: [
      {
        label: "Live",
        href: "https://partyrock.aws/u/hamdayrabby385/Z_BZNL4hm/Smart-Study-Assistant-Pro",
      },
    ],
  },
  {
    title: "AI Concierge Chef",
    org: "Kaggle AI Agents capstone",
    year: "2025",
    summary:
      "Agent that turns leftover ingredients into recipes, with outputs evaluated for relevance and coherence.",
    stack: ["Python", "LLM APIs", "Agent workflows"],
    visibility: "public",
    links: [
      {
        label: "Write-up",
        href: "https://kaggle.com/competitions/agents-intensive-capstone-project/writeups/the-concierge-chef-ai-agent-for-leftover-ingredie",
      },
    ],
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "JavaScript", "Java", "C++", "SQL"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "Prisma", "REST", "WebSocket", "Socket.IO", "JWT"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    label: "AI",
    items: [
      "LLM tool calling",
      "RAG",
      "Multi-agent orchestration",
      "Gemini Live",
      "Prompt engineering",
      "scikit-learn",
      "SHAP",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "CI/CD", "Vercel", "Netlify", "PyPI"],
  },
];

export const education = [
  {
    degree: "BSc in Computer Science and Engineering",
    institution: "Hajee Mohammad Danesh Science and Technology University",
    location: "Dinajpur, Bangladesh",
    period: "Jan 2020 — Dec 2023",
  },
];

export const awards = [
  { label: "IEEE CS BDC Summer Symposium 2025", detail: "Research presentation" },
  { label: "Rangpur Divisional Programming Contest 2024", detail: "7th place" },
  { label: "Intra-University Programming Contest 2023", detail: "5th place" },
  { label: "ICPC Dhaka Regional Preliminary", detail: "2022, 2023, 2024" },
  { label: "1,000+ algorithmic problems", detail: "Codeforces, CodeChef, LeetCode" },
];

export const certifications = [
  { name: "AWS AI Practitioner Challenge", issuer: "Udacity / Accenture", year: "2026" },
  { name: "5-Day AI Agents Intensive", issuer: "Kaggle / Google", year: "2025" },
  { name: "Full Stack Web Development with JavaScript", issuer: "Ostad", year: "2024" },
  { name: "Database Training — 80 hours", issuer: "EDGE Project", year: "2024" },
];

export const featuredOrder = [
  "ora",
  "hubble",
  "anoura",
  "adcut",
  "axo",
  "manygpt",
  "quorum",
  "knotic-sense",
];
