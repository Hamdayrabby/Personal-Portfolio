export default function ArchitectureDiagram({ slug, compact = false }) {
  const getDiagramData = (key) => {
    switch (key) {
      case 'ora':
        return {
          title: 'ORA Realtime Voice Architecture',
          desc: 'AudioWorklet mic input connects to a single authenticated voice proxy gateway into Gemini Live, with a side Machine API path to NestJS and MongoDB/Redis.',
          accentStep: 'Voice Proxy Gateway',
          steps: [
            { name: 'Browser Mic', sub: 'AudioWorklet 16kHz', x: 20, y: 35, w: 130, h: 56 },
            { name: 'Voice Proxy Gateway', sub: 'Auth & Quota Check', x: 200, y: 35, w: 155, h: 56, isAccent: true },
            { name: 'Gemini Live', sub: 'Native S2S (24kHz)', x: 410, y: 35, w: 135, h: 56 },
            { name: 'Machine API', sub: 'OAuth 2.0 & Limits', x: 200, y: 125, w: 155, h: 52 },
            { name: 'NestJS Backend', sub: 'MongoDB & Redis', x: 410, y: 125, w: 135, h: 52 },
          ],
          arrows: [
            { from: [150, 63], to: [200, 63], accent: true },
            { from: [355, 63], to: [410, 63], accent: true },
            { from: [277, 91], to: [277, 125], sub: 'Session token' },
            { from: [355, 151], to: [410, 151] },
          ],
        };

      case 'adcut':
        return {
          title: 'Adcut Multi-NLE Export Pipeline',
          desc: 'Timeline model feeds multi-format exporters which pass through an automated CI fidelity gate before artifact release.',
          accentStep: 'CI Fidelity Gate',
          steps: [
            { name: 'Timeline Model', sub: 'Tracks & Cuts', x: 20, y: 65, w: 130, h: 58 },
            { name: 'Format Exporters', sub: 'FCPXML & OTIO', x: 195, y: 65, w: 145, h: 58 },
            { name: 'CI Fidelity Gate', sub: 'Round-trip Validator', x: 385, y: 65, w: 150, h: 58, isAccent: true },
            { name: 'Release Artifact', sub: 'Pass / Fail Verdict', x: 580, y: 65, w: 125, h: 58 },
          ],
          arrows: [
            { from: [150, 94], to: [195, 94] },
            { from: [340, 94], to: [385, 94], accent: true },
            { from: [535, 94], to: [580, 94], accent: true },
          ],
        };

      case 'axo':
        return {
          title: 'Axo Deterministic Agent Compiler',
          desc: 'Product plan is decomposed by DAG planner, processed by prompt compiler into a validated implementation package for coding agents.',
          accentStep: 'Validated Package',
          steps: [
            { name: 'Product Plan', sub: 'Feature Specs', x: 20, y: 55, w: 125, h: 56 },
            { name: 'DAG Planner', sub: 'Dependency Graph', x: 180, y: 55, w: 130, h: 56 },
            { name: 'Prompt Compiler', sub: 'Builder-aware Specs', x: 345, y: 55, w: 140, h: 56 },
            { name: 'Validated Package', sub: 'Verified Contract', x: 520, y: 55, w: 145, h: 56, isAccent: true },
            { name: 'Coding Agent', sub: 'Autonomous Engine', x: 345, y: 135, w: 140, h: 50 },
            { name: 'State Handoff', sub: 'Persistent Snapshot', x: 520, y: 135, w: 145, h: 50 },
          ],
          arrows: [
            { from: [145, 83], to: [180, 83] },
            { from: [310, 83], to: [345, 83] },
            { from: [485, 83], to: [520, 83], accent: true },
            { from: [592, 111], to: [592, 135], accent: true },
            { from: [520, 160], to: [485, 160], sub: 'Resume' },
          ],
        };

      case 'quorum':
        return {
          title: 'Quorum Multi-Model Consensus Architecture',
          desc: 'Questions route through staged model instances, verified by a citation researcher gate before returning evidence-backed answers.',
          accentStep: 'Citation Gate',
          steps: [
            { name: 'Input Query', sub: 'User Question', x: 20, y: 65, w: 125, h: 58 },
            { name: 'Model Instances', sub: 'Staged Deliberation', x: 185, y: 65, w: 145, h: 58 },
            { name: 'Citation Gate', sub: 'Researcher Verification', x: 370, y: 65, w: 155, h: 58, isAccent: true },
            { name: 'Audited Answer', sub: 'Evidence Attached', x: 570, y: 65, w: 130, h: 58 },
          ],
          arrows: [
            { from: [145, 94], to: [185, 94] },
            { from: [330, 94], to: [370, 94], accent: true },
            { from: [525, 94], to: [570, 94], accent: true },
          ],
        };

      case 'hubble':
        return {
          title: 'Hubble CLI Synthesis Pipeline',
          desc: 'Git working tree changes are chunked by AST parser, cached incrementally, and synthesized into concise natural language context.',
          accentStep: 'AST Cache & Index',
          steps: [
            { name: 'Git Workspace', sub: 'Diffs & Worktree', x: 20, y: 65, w: 130, h: 58 },
            { name: 'AST Parser', sub: 'Semantic Chunking', x: 190, y: 65, w: 140, h: 58 },
            { name: 'AST Cache & Index', sub: 'Incremental Storage', x: 370, y: 65, w: 150, h: 58, isAccent: true },
            { name: 'LLM Synthesis', sub: 'Context Engine', x: 560, y: 65, w: 135, h: 58 },
          ],
          arrows: [
            { from: [150, 94], to: [190, 94] },
            { from: [330, 94], to: [370, 94], accent: true },
            { from: [520, 94], to: [560, 94], accent: true },
          ],
        };

      case 'manygpt':
        return {
          title: 'manygpt Resilient Model Gateway',
          desc: 'Inbound requests route through a provider gateway with circuit breakers into OpenAI, Anthropic, and Gemini pools.',
          accentStep: 'Provider Gateway',
          steps: [
            { name: 'Client Request', sub: 'Chat / Agent Session', x: 20, y: 65, w: 135, h: 58 },
            { name: 'Provider Gateway', sub: 'Failover & Balance', x: 195, y: 65, w: 155, h: 58, isAccent: true },
            { name: 'Model Pool', sub: 'OpenAI • Anthropic', x: 395, y: 65, w: 155, h: 58 },
            { name: 'SSE Stream', sub: 'Client Resumption', x: 590, y: 65, w: 115, h: 58 },
          ],
          arrows: [
            { from: [155, 94], to: [195, 94], accent: true },
            { from: [350, 94], to: [395, 94], accent: true },
            { from: [550, 94], to: [590, 94] },
          ],
        };

      case 'anoura':
        return {
          title: 'Anoura Intelligent Orchestration',
          desc: 'Multi-tenant context assembly pipeline with streaming agent reasoning and safety guardrails.',
          accentStep: 'Agent Core',
          steps: [
            { name: 'Input Request', sub: 'Tenant Payload', x: 25, y: 65, w: 125, h: 58 },
            { name: 'Context Assembler', sub: 'RAG & Memory', x: 190, y: 65, w: 140, h: 58 },
            { name: 'Agent Core', sub: 'Safety & Entitlement', x: 370, y: 65, w: 150, h: 58, isAccent: true },
            { name: 'Response Stream', sub: 'Grounded Output', x: 560, y: 65, w: 130, h: 58 },
          ],
          arrows: [
            { from: [150, 94], to: [190, 94] },
            { from: [330, 94], to: [370, 94], accent: true },
            { from: [520, 94], to: [560, 94], accent: true },
          ],
        };

      case 'knotic-sense':
        return {
          title: 'Knotic-Sense Event Processing Pipeline',
          desc: 'Sensor streams aggregated at edge with real-time anomaly detection gate and instant alerting.',
          accentStep: 'Anomaly Gate',
          steps: [
            { name: 'IoT Stream', sub: 'Sensor Feeds', x: 25, y: 65, w: 120, h: 58 },
            { name: 'Edge Aggregation', sub: 'Sliding Buffers', x: 185, y: 65, w: 150, h: 58 },
            { name: 'Anomaly Gate', sub: 'Threat Classification', x: 375, y: 65, w: 150, h: 58, isAccent: true },
            { name: 'Alert Stream', sub: 'Webhooks & Feeds', x: 565, y: 65, w: 125, h: 58 },
          ],
          arrows: [
            { from: [145, 94], to: [185, 94] },
            { from: [335, 94], to: [375, 94], accent: true },
            { from: [525, 94], to: [565, 94], accent: true },
          ],
        };

      case 'bangla-misinformation':
        return {
          title: 'Bengali Misinformation Robustness Pipeline',
          desc: 'Human news articles are style-transferred via LLMs, filtered via KS length matching, and benchmarked against detectors.',
          accentStep: 'Audit & Matching Gate',
          steps: [
            { name: 'Human News', sub: 'Bengali Corpus', x: 20, y: 65, w: 120, h: 58 },
            { name: 'Style Transfer', sub: 'Guarded LLM', x: 180, y: 65, w: 145, h: 58 },
            { name: 'Audit & Matching Gate', sub: 'KS Length Filter', x: 365, y: 65, w: 165, h: 58, isAccent: true },
            { name: 'Robustness Test', sub: 'BanglaBERT Eval', x: 570, y: 65, w: 130, h: 58 },
          ],
          arrows: [
            { from: [140, 94], to: [180, 94] },
            { from: [325, 94], to: [365, 94], accent: true },
            { from: [530, 94], to: [570, 94], accent: true },
          ],
        };

      case 'telecom-churn':
        return {
          title: 'Interpretable Churn Prediction Pipeline',
          desc: 'Tabular customer metrics feed an interpretable stacking ensemble with local SHAP attribution surfaced in Streamlit.',
          accentStep: 'Interpretable Ensemble',
          steps: [
            { name: 'Customer Data', sub: 'Usage Records', x: 20, y: 65, w: 130, h: 58 },
            { name: 'Feature Engineering', sub: 'Ratio & Tenure', x: 190, y: 65, w: 145, h: 58 },
            { name: 'Interpretable Ensemble', sub: 'Stacked Classifier', x: 375, y: 65, w: 155, h: 58, isAccent: true },
            { name: 'SHAP & Streamlit', sub: 'Attributions', x: 570, y: 65, w: 130, h: 58 },
          ],
          arrows: [
            { from: [150, 94], to: [190, 94] },
            { from: [335, 94], to: [375, 94], accent: true },
            { from: [530, 94], to: [570, 94], accent: true },
          ],
        };

      default:
        return {
          title: 'System Architecture',
          desc: 'Modular pipeline with validation gate and isolated components.',
          accentStep: 'Validation Gate',
          steps: [
            { name: 'Input Source', sub: 'Data Pipeline', x: 40, y: 65, w: 135, h: 58 },
            { name: 'Processing Engine', sub: 'Transform Layer', x: 220, y: 65, w: 145, h: 58 },
            { name: 'Validation Gate', sub: 'Integrity Check', x: 410, y: 65, w: 145, h: 58, isAccent: true },
            { name: 'Output Service', sub: 'Verified Delivery', x: 595, y: 65, w: 110, h: 58 },
          ],
          arrows: [
            { from: [175, 94], to: [220, 94] },
            { from: [365, 94], to: [410, 94], accent: true },
            { from: [555, 94], to: [595, 94], accent: true },
          ],
        };
    }
  };

  const data = getDiagramData(slug);
  const viewBoxWidth = slug === 'ora' || slug === 'axo' ? 710 : 720;
  const viewBoxHeight = slug === 'ora' || slug === 'axo' ? 190 : 180;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={data.title}
      className={`architecture-diagram ${compact ? 'is-compact' : ''}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: '#141414',
      }}
    >
      <title>{data.title}</title>
      <desc>{data.desc}</desc>

      <defs>
        <marker
          id={`arrow-${slug}`}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#3a3a3a" />
        </marker>
        <marker
          id={`arrow-accent-${slug}`}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#b8e62e" />
        </marker>
      </defs>

      {/* Connection Arrows */}
      {data.arrows.map((arr, i) => {
        const marker = arr.accent ? `url(#arrow-accent-${slug})` : `url(#arrow-${slug})`;
        const stroke = arr.accent ? '#b8e62e' : '#3a3a3a';
        return (
          <g key={i}>
            <line
              x1={arr.from[0]}
              y1={arr.from[1]}
              x2={arr.to[0]}
              y2={arr.to[1]}
              stroke={stroke}
              strokeWidth="1.5"
              markerEnd={marker}
            />
            {arr.sub && (
              <text
                x={(arr.from[0] + arr.to[0]) / 2 + 6}
                y={(arr.from[1] + arr.to[1]) / 2}
                fill="#a3a3a3"
                fontSize="12"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {arr.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {data.steps.map((step, i) => {
        const isAccent = step.isAccent;
        const rectFill = isAccent ? '#1a2210' : '#1a1a1a';
        const rectStroke = isAccent ? '#b8e62e' : '#3a3a3a';
        const strokeWidth = isAccent ? '1.5' : '1';
        const titleColor = isAccent ? '#b8e62e' : '#ededed';
        const subColor = isAccent ? '#cbe38b' : '#a3a3a3';

        return (
          <g key={i} transform={`translate(${step.x}, ${step.y})`}>
            <rect
              width={step.w}
              height={step.h}
              rx="6"
              fill={rectFill}
              stroke={rectStroke}
              strokeWidth={strokeWidth}
            />
            <text
              x={step.w / 2}
              y={step.h / 2 - 5}
              textAnchor="middle"
              fill={titleColor}
              fontSize="13"
              fontWeight={isAccent ? '600' : '500'}
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {step.name}
            </text>
            <text
              x={step.w / 2}
              y={step.h / 2 + 13}
              textAnchor="middle"
              fill={subColor}
              fontSize="12"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {step.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
