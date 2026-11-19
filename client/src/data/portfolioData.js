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
  resumePdf: "https://drive.google.com/drive/folders/1XoXvKh_4OuX0FQK6tvhTnqsYz42Yz8Kd?usp=sharing",
  availability: "Open to AI engineering and backend roles",
  responseTime: "2 working days",
  roles: ["Software Developer", "Researcher", "AI Engineer"],

  lede: "I build production AI systems — real-time voice, retrieval, and **agent infrastructure**.",
  intro:
    "Junior Software Developer at Hype Corporation in Dhaka, Bangladesh, building production systems in real-time voice, retrieval, and agent infrastructure. Designed the ORA Machine API (OAuth 2.0, per-tenant rate limiting) and consolidated the realtime voice gateways behind one authenticated proxy. M.Sc. thesis on graph-tabular fraud detection at HSTU.",
  bio: [
    "I work on the parts of an AI system that decide whether it survives production: who is allowed to call what, what happens when the model is wrong, and how a request travels from a browser microphone to a model and back without leaking a session.",
    "That has meant collapsing duplicate realtime gateways, replacing trusted client state with signed server state, making payment capture exactly-once, and building export pipelines whose output is validated against the format it claims to be.",
    "B.Sc. in CSE from HSTU (CGPA 3.399/4.00), now doing my M.Sc. there, with competitive programming and two research projects: one on synthetic misinformation, one an interpretable ensemble presented at an IEEE symposium.",
  ],
};

export const experience = [
  {
    role: "Junior Software Developer",
    org: "Hype Corporation",
    location: "Dhaka, Bangladesh",
    period: "Jul 2026 — Present",
    summary:
      "Joined as a Software Developer Intern (Jul — Sep 2026) and promoted to a full-time junior role in Oct 2026. Contributed to multiple AI-powered SaaS products spanning realtime voice, AI video editing, LLM tooling, and commerce.",
    highlights: [
      "Designed the ORA Machine API — OAuth 2.0, secret-key auth, per-tenant and per-IP rate limiting — and consolidated the voice agent's realtime gateways behind one authenticated proxy.",
      "Shipped Adcut's FCPXML, OpenTimelineIO and Premiere XML export behind a CI fidelity gate; built billing and the admin console.",
      "Built Axo's deterministic DAG package planner and builder-aware prompt compiler with persistent state handoff.",
      "Added group-chat sharing and session-scoped semantic memory to the LibreChat-based platform.",
    ],
    products: ["ORA", "Adcut", "manygpt-v2", "Axo", "ai-creators-bd", "altName"],
  },
  {
    role: "Research Assistant",
    org: "Humach Lab",
    location: "Remote",
    period: "Feb 2026 — Present",
    summary:
      "Bangla fake news detection research: dataset construction, LLM-based synthetic-data pipelines, and detector-robustness evaluation.",
    highlights: [
      "Curated and benchmarked a 5,000+ article Bengali synthetic misinformation dataset spanning political and social domains.",
      "Evaluated transformer baselines (BanglaBERT, mBERT) against LLM-generated adversarial examples, analyzing hallucination patterns.",
      "Engineered automated lexical and semantic diversity filtering pipelines to validate training data quality.",
    ],
  },
];

export const leadership = [
  {
    role: "General Secretary",
    org: "CSE Club of HSTU",
    period: "2025",
  },
  {
    role: "Publication and IT Secretary",
    org: "Programmers Arena & CSE Club of HSTU",
    period: "2022 — 2024",
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
    role: "Software Developer",
    period: "Aug 2026 — Nov 2026",
    visibility: "private",
    featured: true,
    summary:
      "A realtime voice agent embedded in merchant storefronts, answering product questions and taking orders over speech.",
    context:
      "The agent runs on two paths that were originally separate: a Socket.IO channel and a raw WebSocket channel. Each carried its own entitlement checks, its own quota accounting, and its own session timer registry. Adding a feature meant implementing it twice, and the two paths had already drifted.",
    constraints: [
      "Sub-200ms audio turnaround for natural conversational cadence.",
      "Strict tenant origin enforcement and cryptographic signed-cookie role authorization.",
      "Zero session leakage across AudioWorklet standby and reconnect events.",
      "Real-time stock and price ground-truth verification without blocking voice generation.",
    ],
    architectureSummary:
      "Voice input is captured directly from the browser microphone via AudioWorklet at 16 kHz and piped to a consolidated VoiceProxyGateway. The gateway acts as the single trust boundary: it terminates authentication, enforces tenant origin bounds, and maintains quota accounting before forwarding audio to Gemini Live over a 24 kHz stream. A parallel Machine API path governs tenant administration and persistent state via NestJS, MongoDB, and Redis.",
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
    shipped: [
      "Single consolidated VoiceProxyGateway replacing duplicate Socket.IO/raw WebSocket transports.",
      "Edge-verified HMAC-SHA256 signed cookie role security preventing client privilege escalation.",
      "Watchdog-supervised AudioWorklet lifecycle preventing standby memory leaks.",
      "Live inventory verification fallback preventing stale catalog pricing.",
    ],
    outcome:
      "One gateway, one place to enforce entitlement, and a role check that fails closed. Voice sessions survive standby, and a stale catalog no longer produces a confidently wrong price.",
    whatIdChange:
      "If rebuilding from scratch, I would move tenant quota tracking entirely to an in-memory Redis token bucket at the edge rather than checking across backend services, shaving an extra 30ms off initial handshake latency.",
    stack: ["TypeScript", "Next.js", "NestJS", "MongoDB", "Redis", "Gemini Live", "Socket.IO", "WebSocket"],
    note: "Shared codebase. My ownership was the voice gateway, authentication and tenant isolation, and the retrieval path.",
    links: [],
  },
  {
    slug: "adcut",
    kind: "product",
    title: "Adcut",
    subtitle: "AI video editor with frame-accurate export",
    org: "Hype Corporation",
    role: "Software Developer",
    period: "Sep 2026 — Nov 2026",
    visibility: "private",
    featured: true,
    summary:
      "A browser-based AI video editor that exports to professional NLEs — and validates that the export is actually correct.",
    context:
      "Timeline edits are meaningless if they cannot leave the product. Export to Final Cut, Premiere and OpenTimelineIO is where an editor either becomes a real tool or stays a demo.",
    constraints: [
      "Strict frame-accurate boundary precision across 24, 30, and 60 fps timelines.",
      "Zero round-trip XML tag omissions in Final Cut Pro (FCPXML) and Premiere XML.",
      "Support for large timeline trees without memory exhaustion in Node worker processes.",
      "Multi-tenant billing and audit logging with strict separation of concerns.",
    ],
    architectureSummary:
      "A unified JSON-based timeline representation serves as the intermediate model. Format-specific exporters serialize this timeline into FCPXML, OpenTimelineIO, and Premiere XML. Before any file is offered for download, an automated CI fidelity gate parses the generated XML and validates timecodes, track mappings, and asset handles against the source timeline.",
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
    shipped: [
      "Dedicated export pipelines for FCPXML 1.10+, Premiere XML, and OpenTimelineIO.",
      "Automated CI round-trip fidelity gate validating exported timeline tracks.",
      "Admin operations control plane with server-side pagination across 9 operational datasets.",
      "Modular ChatPanel refactor reducing component boundary complexity.",
    ],
    outcome:
      "Export that produces files an editor will actually open, and an audit that turned a vague performance concern into an ordered list of concrete limits.",
    whatIdChange:
      "I would stream the XML generation directly to disk instead of constructing the full DOM in memory for long multi-hour timeline exports.",
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
    constraints: [
      "Deterministic compile artifacts: identical plan inputs must always yield byte-for-byte identical build packages.",
      "Cycle-free execution DAG bounded between 2 and 8 discrete stages.",
      "Zero runtime token overhead during the compilation phase.",
      "Durable session state handoff capable of surviving terminal process termination.",
    ],
    architectureSummary:
      "Axo acts as a compiler between high-level human planning and autonomous coding agent execution. The DAG planner transforms product specifications into a directed acyclic graph, while the validator checks for cycles, bounds, and builder capabilities. The resulting implementation package and durable state files (PROJECT_CONTEXT.md and BUILD_STATE.md) allow coding agents to build mechanically without re-planning.",
    decisions: [
      {
        title: "An implementation-package layer between planning and building",
        detail:
          "Four stages — package-planner, package-analyzer, package-validator, package-compiler — turn a plan into a graph, check it, then emit build instructions. Planning and building stay separate concerns, so a drifting plan is caught where it is cheap to catch.",
      },
      {
        title: "Validation that runs before a builder sees anything",
        detail:
          "The validator rejects a package deterministically: node count bounded between 2 and 8, cycle detection over the graph, topological ordering of the output. An invalid plan fails at compile time instead of mid-build, where a half-built repository would be the error message.",
      },
      {
        title: "Builder-aware prompt protocol",
        detail:
          "PROJECT_CONTEXT.md and BUILD_STATE.md carry durable state across sessions, and capabilities are gated per target tool — a capability a builder does not have is never emitted into its instructions.",
      },
      {
        title: "Persistent state handoff",
        detail:
          "BUILD_STATE.md records what has been built and what remains, so a builder picking the project back up reads state from a file instead of re-deriving it from a chat transcript.",
      },
    ],
    fixes: [
      "Circular dependency infinite loops in prompt plan decomposition.",
      "Agent context drift across disconnected shell execution runs.",
    ],
    shipped: [
      "Deterministic 4-stage pipeline: planner, analyzer, validator, and compiler.",
      "Compile-time cycle detector and topological sorter.",
      "Durable state handoff protocol (PROJECT_CONTEXT.md and BUILD_STATE.md).",
      "Builder capability gating preventing unsupported instruction generation.",
    ],
    outcome:
      "Same plan in, same package out. The compile step is deterministic — bounds, cycles, ordering — and costs no extra LLM calls, which is what makes re-planning unnecessary rather than just unlikely.",
    whatIdChange:
      "I would add an automated simulation harness to test compiler output against synthetic mock agents to catch edge-case syntax divergence even earlier.",
    stack: ["LLM orchestration", "Prompt compilation", "CLI tooling"],
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
    constraints: [
      "Provider neutrality across Anthropic, OpenAI, and local model APIs.",
      "OS-level sandboxing with strict secret file isolation.",
      "Concurrent multi-worktree execution without git index collisions.",
      "Strict self-improvement guardrails requiring human sign-off.",
    ],
    architectureSummary:
      "Hubble CLI ingests repository diffs and working tree states, parsing changed files into an AST representation. Changed chunks are indexed into a local cache for instant retrieval. The provider-agnostic agent loop executes tool calls within OS-level sandboxes (Seatbelt/bubblewrap/Docker), ensuring sensitive host secrets remain unreachable.",
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
    shipped: [
      "Unified tool-calling loop supporting Anthropic, OpenAI, and local LLMs.",
      "Sandboxed execution environments using Seatbelt and bubblewrap.",
      "Bounded DAG scheduler supporting concurrent multi-worktree writers.",
      "Published package on PyPI (v4.3.3) with 81 commits as sole author.",
    ],
    outcome:
      "81 commits, sole author, published on PyPI. The published release is 4.3.3.",
    whatIdChange:
      "I would rewrite the file watching and AST diffing worker in Rust for sub-millisecond indexing on monorepos with over 50,000 files.",
    stack: ["TypeScript", "Node.js", "Python", "Docker", "bubblewrap", "Seatbelt"],
    links: [
      { label: "GitHub", href: "https://github.com/Hamdayrabby/hubble-cli" },
      { label: "PyPI", href: "https://pypi.org/project/hubble-cli/" },
    ],
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
    constraints: [
      "Graceful degradation under provider rate limits (HTTP 429/5xx).",
      "Mandatory tool-based grounding for all factual claims.",
      "Transparent citation tracing from raw retrieval to final synthesis.",
      "Strict per-seat timeout enforcement to prevent pipeline stalling.",
    ],
    architectureSummary:
      "The query initiates a staged multi-agent debate where multiple LLM instances deliberate across sequential rounds. A dedicated researcher agent grounds arguments by querying Tavily for external evidence and attaching source citations. The final synthesis engine ingests candidate arguments with provenance metadata intact, producing an evidence-backed consensus.",
    decisions: [
      {
        title: "Staged concurrent pipeline with failure isolation",
        detail:
          "Seats run concurrently per stage and a seat that fails does not cancel the round — it falls back, including on 429 and 5xx responses, so one rate-limited provider cannot take down the debate. Isolation is per seat, not global: the worst case is a weaker contribution, never a missing round.",
      },
      {
        title: "A researcher that actually calls a tool",
        detail:
          "The research seat grounds its claims through Tavily retrieval before they enter the debate. Whether the model is recalling or retrieving is verifiable from the transcript, not a matter of trust.",
      },
      {
        title: "Citations carried into the synthesis",
        detail:
          "Synthesis receives its inputs with sources attached, so a reader can check the attribution behind any claim instead of taking the summary's word for it.",
      },
    ],
    fixes: [
      "Provider rate limits crashing ongoing rounds.",
      "Hallucinated citations without reachable URLs.",
    ],
    shipped: [
      "Staged concurrent debate pipeline with per-seat failure isolation.",
      "Tavily-grounded research seat requiring explicit citation attachment.",
      "Attribution-preserving synthesis engine carrying sources to the final output.",
      "Resilient provider fallback handling HTTP 429 and 5xx errors.",
    ],
    outcome:
      "A debate that degrades gracefully under provider failure and produces evidence a reader can verify — the design constraints come from where multi-agent systems actually break: propagation and ungrounded recall.",
    whatIdChange:
      "I would introduce a dynamic cross-examination stage where agents formulate targeted counter-arguments against opposing citations before synthesis.",
    stack: ["Multi-agent orchestration", "LLM tool calling", "Tavily"],
    links: [{ label: "GitHub", href: "https://github.com/Hamdayrabby/Quorum" }],
  },
  {
    slug: "manygpt",
    kind: "product",
    title: "manygpt-v2",
    subtitle: "Group chat and semantic memory for an LLM platform",
    org: "Hype Corporation",
    role: "Software Developer",
    period: "Jul 2026 — Aug 2026",
    visibility: "private",
    featured: true,
    summary:
      "Shared conversations and session-scoped semantic memory on a LibreChat-based platform.",
    context:
      "The platform is LibreChat v0.8.7, extended, not built. Adding group chat means changing authorization in middleware that already assumes a single owner, and adding memory means deciding whose memory a shared conversation is allowed to write to.",
    constraints: [
      "Shared group-chat authorization without breaking upstream LibreChat single-tenant middleware.",
      "Zero leakage between session-scoped memory and private personal memory pools.",
      "Low-latency SSE streaming for real-time multiplayer responses.",
      "Role-based invite-code membership validation on every websocket frame.",
    ],
    architectureSummary:
      "Inbound client traffic passes through an invite-code authorization middleware integrated directly into the LibreChat v0.8.7 core. Real-time updates flow through a JWT-authenticated Socket.IO gateway, while semantic memory is isolated within namespaced session stores to guarantee cross-tenant privacy.",
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
    fixes: [
      "Shared conversations overwriting individual user profile memories.",
      "Socket reconnection drops during multi-user simultaneous message streams.",
    ],
    shipped: [
      "Invite-code group conversation sharing integrated into core middleware.",
      "JWT-authenticated Socket.IO transport matching REST security policies.",
      "Session-isolated semantic memory preventing personal memory leaks.",
      "Role-based participant controls for shared AI workspaces.",
    ],
    outcome:
      "Group conversations with membership-aware authorization, and memory that respects the boundary between a shared session and a person.",
    whatIdChange:
      "I would decouple the group authorization layer into a standalone microservice to simplify future upstream LibreChat syncs.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Socket.IO", "JWT"],
    note: "Built on LibreChat v0.8.7. Roughly 4,800 commits are upstream.",
    links: [],
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
    featured: false,
    summary:
      "A fashion commerce platform with a storefront, an operations back office, and a payment pipeline that has to agree with itself.",
    context:
      "The system began as one application serving both customers and staff. Two audiences with different threat models, release cadences and failure modes cannot share one auth boundary or one deploy.",
    constraints: [
      "Strict separation between public customer storefront and back-office ERP surfaces.",
      "Exactly-once payment capture with immutable ledger entries.",
      "Default-deny RBAC on all administrative endpoints.",
      "High-availability Postgres pooling resilient to idle disconnects.",
    ],
    architectureSummary:
      "The platform separates public storefront traffic, admin ERP operations, and backend services into three isolated deployable applications. Customer orders write directly to a validated store module, while payment capture triggers an immutable SALE ledger entry that serves as the single source of truth.",
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
    shipped: [
      "Three-tier application separation: NestJS API, Next.js storefront, Vite ERP.",
      "Immutable SALE ledger eliminating double-posted order states.",
      "Independent admin authentication domain with dedicated JWT secret and server-side revocation.",
      "Hardened CORS allowlists and connection-derived rate limiting.",
    ],
    outcome:
      "Three applications that can be released separately, an admin surface with its own trust boundary, and a payments ledger that cannot double-count.",
    whatIdChange:
      "I would implement event-driven background queues via BullMQ for inventory reconciliation instead of direct synchronous transactional writes.",
    stack: ["TypeScript", "NestJS", "Prisma", "PostgreSQL", "Next.js", "Vite", "React"],
    links: [],
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
    featured: false,
    summary:
      "A stage-based job application tracker that scores a résumé against a specific posting and suggests targeted edits.",
    context:
      "Job searching is a pipeline problem that most people run in a spreadsheet. The useful addition is not another board — it is telling someone what in their résumé is failing for the role they actually want.",
    constraints: [
      "Dual-engine evaluation: semantic job matching combined with structural ATS parsing.",
      "Sub-second resume scoring and diff generation.",
      "Server-scoped tenant isolation via stateless JWT authentication.",
      "Zero-maintenance infrastructure footprint on serverless cloud.",
    ],
    architectureSummary:
      "Candidates submit resumes against target job postings. The system executes both a semantic similarity pass using Gemini embeddings and a structural rule check against known ATS formatting heuristics. Specific missing keywords and phrasing recommendations are returned alongside an actionable score.",
    decisions: [
      {
        title: "Model the search as a pipeline, not a list",
        detail:
          "Applications move through Applied, Interview and Offer stages with per-stage state, which makes the interesting metrics — conversion, stall, abandonment — derivable instead of guessed.",
      },
      {
        title: "Semantic matching and ATS checks answer different questions",
        detail:
          "Semantic similarity against the posting asks whether the résumé is about this job; ATS-style structural checks ask whether it presents the way a screener expects. Combining both produces a score plus specific edits a candidate can apply rather than one opaque number.",
      },
      {
        title: "JWT auth with role-based access",
        detail:
          "REST endpoints authenticate with JWT and authorize by role, so user data is scoped server-side and one account's pipeline is never readable through another's session.",
      },
      {
        title: "Solo-project operations kept boring",
        detail:
          "Express plus MongoDB Atlas keeps the operational surface at zero — no servers to patch while the product work is the point, and the deployment target stays a single Vercel project.",
      },
    ],
    fixes: [
      "Parsing failures on unconventional PDF resume layouts.",
      "Token expiry mid-edit losing unsaved application notes.",
    ],
    shipped: [
      "Full-lifecycle application pipeline tracking (Applied, Interview, Offer).",
      "Dual-score engine combining semantic relevancy and ATS rule conformance.",
      "Secure JWT-authenticated REST API with server-side tenant scoping.",
      "Live deployment on Vercel and MongoDB Atlas with 28 verified commits.",
    ],
    outcome:
      "Live in production since early 2026, 28 commits, used as a real tracker rather than a demo — which is also why the auth and data-scoping decisions above are not optional extras.",
    whatIdChange:
      "I would add PDF visual layout parsing to warn users about multi-column tables that break legacy ATS optical parsers.",
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
    venue: "Research project — Humach Lab · Feb 2026 — Present",
    role: "Research Assistant",
    summary:
      "Testing whether Bengali fake-news detectors survive text that has been laundered by an LLM.",
    context:
      "Detection benchmarks assume fake news is written by humans. If a model can rewrite a fake article to read like real reporting without changing its claims, the detector still has to catch it — and the dataset must not leak the answer through style instead of substance.",
    constraints: [
      "Style transfer constraint: rewrite phrasing and tone without modifying factual claims.",
      "Elimination of formatting shortcuts via Kolmogorov-Smirnov length matching.",
      "Rigorous curation of synthetic and human-authored splits.",
      "Resumable distributed inference pipelines across multiple model families.",
    ],
    architectureSummary:
      "Human-written Bengali news articles undergo controlled LLM style transfer to produce synthetic misinformation candidates. A strict length-matching and distribution-audit gate uses KS statistics and quantile mapping to align article lengths, ensuring downstream classifiers evaluate semantic truth rather than superficial text length.",
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
    fixes: [
      "2,000 human-written items misfiled into synthetic training splits.",
      "Undetected empty outputs silently shrinking resume checkpoints.",
    ],
    shipped: [
      "Curated benchmark of 8,057 verified Bengali news articles.",
      "Resumable synthetic generation pipeline yielding 145,000+ candidate samples.",
      "Statistical quantile mapping neutralizing text length artifacts.",
      "Empirical resilience evaluation of BanglaBERT and mBERT architectures.",
    ],
    outcome:
      "A clean corpus, and an evaluation that scores resistance to laundering rather than sensitivity to formatting.",
    whatIdChange:
      "I would expand the evaluation to include cross-lingual zero-shot transfer from high-resource language fact-checking benchmarks.",
    stack: ["Python", "Transformers", "LLM prompting", "Bengali NLP"],
    links: [],
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
    constraints: [
      "Direct feature attribution: every prediction must carry human-readable explanations.",
      "Ensemble stability across diverse, imbalanced customer demographics.",
      "Interactive low-latency web UI suitable for non-technical stakeholders.",
      "Production deployment without complex operational overhead.",
    ],
    architectureSummary:
      "Customer usage and demographic records pass through a feature engineering pipeline into a stacked ensemble combining Random Forest and Gradient Boosting. Local SHAP values are calculated per prediction, decomposing the risk score into positive and negative risk factors rendered interactively in a Streamlit dashboard.",
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
    fixes: [
      "Feature distribution drift across regional subscriber subsets.",
      "Slow SHAP TreeExplainer calculation on unvectorized batch inputs.",
    ],
    shipped: [
      "Stacking ensemble model achieving superior cross-segment stability.",
      "Per-prediction SHAP explanation pipeline surfacing direct churn drivers.",
      "Interactive web application deployed publicly on Streamlit Cloud.",
      "Peer-reviewed presentation at IEEE CS BDC Summer Symposium 2025.",
    ],
    outcome:
      "Presented at IEEE CS BDC Summer Symposium 2025 and deployed publicly.",
    whatIdChange:
      "I would add automated counterfactual generation to recommend the exact minimum intervention required to flip a high-risk customer to low-risk.",
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
    title: "M.Sc. Thesis — Hybrid Graph-Tabular Fraud Detection",
    org: "M.Sc. research — HSTU",
    year: "2026 — ongoing",
    summary:
      "Ongoing thesis combining graph-structured features with tabular models for credit card fraud detection.",
    stack: ["Graph features", "Tabular ML"],
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
    title: "GradeSync",
    org: "Coursework",
    year: "2025",
    summary:
      "Java Swing result-management system with MySQL persistence and separate student and administrator interfaces.",
    stack: ["Java", "Swing", "MySQL", "JDBC"],
    visibility: "public",
    links: [{ label: "GitHub", href: "https://github.com/Hamdayrabby/GradeSync" }],
  },
];

export const skills = [
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
      "Python",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Prisma",
      "REST",
      "WebSocket",
      "Socket.IO",
      "JWT",
      "TypeScript",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "JavaScript"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "CI/CD", "Git", "Linux"],
  },
];

export const education = [
  {
    degree: "MSc in Computer Science and Engineering",
    institution: "Hajee Mohammad Danesh Science and Technology University",
    location: "Dinajpur, Bangladesh",
    period: "2026 — Present",
    detail: "Ongoing. Thesis: Hybrid graph-tabular credit card fraud detection.",
  },
  {
    degree: "BSc (Engineering) in Computer Science and Engineering",
    institution: "Hajee Mohammad Danesh Science and Technology University",
    location: "Dinajpur, Bangladesh",
    period: "2020 — 2023",
    detail: "CGPA: 3.399 / 4.00. Thesis on telecom customer churn prediction.",
  },
];

export const awards = [
  {
    title: "Finalist, Hackathon 2024",
    org: "HSTU",
    year: "2024",
  },
  {
    title: "Competitive Programming",
    org: "Codeforces (1200+ rating, 700+ problems solved) · LeetCode (300+ problems)",
    year: "2022 — Present",
  },
];

export const certifications = [
  { name: "AWS AI Practitioner Challenge", issuer: "Udacity", year: "2026" },
  { name: "5-Day AI Agents Intensive", issuer: "Kaggle — Google", year: "2025" },
  { name: "Full Stack Web Development (MERN)", issuer: "Ostad", year: "2024 — 25" },
];

export const featuredOrder = [
  "ora",
  "adcut",
  "axo",
  "hubble",
  "quorum",
  "manygpt",
];
