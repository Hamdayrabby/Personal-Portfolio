import { Link } from 'react-router-dom';

/* Retro cartridge art: a deterministic pixel pattern per project, seeded
   from the slug — no Math.random, identical on every render. */
const PALETTE = [
  '#1d1d1d',
  '#262626',
  '#3a3a12',
  '#566912',
  '#617812',
  '#bced12',
  '#bced12',
  '#f6c53a',
];

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed | 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function PixelArt({ seed, cols = 30, rows = 8 }) {
  const rand = mulberry32(seed);
  const rects = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      // Mostly dark canvas with clustered lime/olive/gold sparks —
      // horizontal banding keeps it looking like art, not noise.
      const band = 0.22 + 0.5 * Math.abs(Math.sin((c / cols) * Math.PI * 2 + seed % 7));
      if (rand() > band) continue;
      rects.push({ x: c, y: r, color: PALETTE[Math.floor(rand() * PALETTE.length)] });
    }
  }
  return (
    <svg
      className="work-card-art"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width={cols} height={rows} fill="#161616" />
      {rects.map((rc, i) => (
        <rect key={i} x={rc.x} y={rc.y} width="1" height="1" fill={rc.color} />
      ))}
    </svg>
  );
}

/**
 * One card in the asymmetric Selected-work grid. `span` is the column
 * count on the 6-column desktop grid and also drives the content
 * variant: 4 = large (summary + tags), 3 = medium (summary), 2 = small.
 */
export default function WorkCard({ item, span, index }) {
  const variant = span >= 4 ? 'lg' : span >= 3 ? 'md' : 'sm';

  return (
    <Link
      to={`/projects/${item.slug}`}
      className={`work-card span-${span} variant-${variant} reveal`}
      style={{ '--reveal-delay': `${Math.min(index * 60, 240)}ms` }}
    >
      <PixelArt seed={hashString(item.slug)} />
      <div className="work-card-body">
        <p className="card-type">{item.kind === 'research' ? 'Research' : 'Product'}</p>
        <h3 className="work-card-title">{item.title}</h3>
        <p className="work-card-sub">{item.subtitle || item.venue}</p>
        {variant !== 'sm' && <p className="work-card-summary">{item.summary}</p>}
        {item.visibility === 'private' && <p className="card-private">Private codebase</p>}
        {variant === 'lg' && (
          <div className="card-tags">
            {item.stack.slice(0, 6).map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
