import { Link } from 'react-router-dom';

/* Retro cartridge art: every project gets its own color identity and
   pattern style, seeded from the slug — deterministic, no Math.random.
   The Mimosa "weak random" note applies to mulberry32 below: it is
   intentionally deterministic (stable art per render), not cryptographic. */

const THEMES = {
  ora: { bright: '#bced12', mid: '#566912', deep: '#2c3a0c' },
  hubble: { bright: '#53d8ff', mid: '#1e4a5e', deep: '#122c38' },
  anoura: { bright: '#ff6ec7', mid: '#69324f', deep: '#3a1c2e' },
  adcut: { bright: '#f6c53a', mid: '#6b5316', deep: '#3a2e10' },
  axo: { bright: '#ff8a3d', mid: '#6b3a17', deep: '#38200f' },
  manygpt: { bright: '#a68bff', mid: '#443672', deep: '#2a2246' },
  quorum: { bright: '#ff5d5d', mid: '#6e2626', deep: '#3c1616' },
  'knotic-sense': { bright: '#4ade9b', mid: '#1e5e42', deep: '#123526' },
};

const FALLBACK_THEMES = Object.values(THEMES);
const PATTERN_NAMES = ['waves', 'skyline', 'clusters', 'stripes', 'diagonal', 'columns', 'scatter', 'checker'];

const PATTERN_FOR = {
  ora: 'waves',
  hubble: 'skyline',
  anoura: 'clusters',
  adcut: 'stripes',
  axo: 'diagonal',
  manygpt: 'columns',
  quorum: 'scatter',
  'knotic-sense': 'checker',
};

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

/* Fills a cols x rows grid with cells colored from the theme, one
   pattern style per project so no two cards read the same. */
function buildCells(pattern, theme, seed, cols, rows) {
  const rand = mulberry32(seed);
  const cells = [];
  const put = (c, r, color) => cells.push({ x: c, y: r, color });

  if (pattern === 'waves') {
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const band = 0.25 + 0.55 * Math.abs(Math.sin((c / cols) * Math.PI * 2 + (seed % 7)));
        if (rand() > band) continue;
        put(c, r, rand() < 0.24 ? theme.bright : rand() < 0.75 ? theme.mid : theme.deep);
      }
    }
  } else if (pattern === 'skyline') {
    for (let c = 0; c < cols; c += 1) {
      const h = 1 + Math.floor(rand() * rows);
      for (let r = rows - h; r < rows; r += 1) {
        put(c, r, rand() < 0.3 ? theme.bright : theme.mid);
      }
      if (rand() < 0.4) put(c, rows - h - 1, theme.bright);
    }
  } else if (pattern === 'clusters') {
    const centers = Array.from({ length: 5 }, () => ({
      x: rand() * cols,
      y: rand() * rows,
      r: 1.2 + rand() * 2.6,
    }));
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const near = centers.some(
          (k) => (c - k.x) * (c - k.x) + (r - k.y) * (r - k.y) < k.r * k.r
        );
        if (!near) continue;
        put(c, r, rand() < 0.45 ? theme.bright : theme.mid);
      }
    }
  } else if (pattern === 'stripes') {
    for (let c = 0; c < cols; c += 1) {
      const tall = rand() < 0.4;
      for (let r = 0; r < rows; r += 1) {
        if ((c + r) % (tall ? 2 : 3) !== 0) continue;
        put(c, r, tall && rand() < 0.5 ? theme.bright : theme.mid);
      }
    }
  } else if (pattern === 'diagonal') {
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if ((c + r * 2) % 5 >= 2) continue;
        put(c, r, rand() < 0.3 ? theme.bright : rand() < 0.7 ? theme.mid : theme.deep);
      }
    }
  } else if (pattern === 'columns') {
    for (let c = 0; c < cols; c += 1) {
      const h = 2 + Math.floor(rand() * (rows - 2));
      for (let r = rows - h; r < rows; r += 1) {
        put(c, r, r === rows - h ? theme.bright : theme.mid);
      }
    }
  } else if (pattern === 'scatter') {
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (rand() > 0.3) continue;
        put(c, r, rand() < 0.5 ? theme.bright : theme.mid);
      }
    }
  } else {
    // checker
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const dense = (c + r) % 2 === 0 ? 0.55 : 0.2;
        if (rand() > dense) continue;
        put(c, r, rand() < 0.35 ? theme.bright : theme.mid);
      }
    }
  }
  return cells;
}

function PixelArt({ slug, cols = 30, rows = 8 }) {
  const seed = hashString(slug);
  const theme = THEMES[slug] || FALLBACK_THEMES[seed % FALLBACK_THEMES.length];
  const pattern = PATTERN_FOR[slug] || PATTERN_NAMES[seed % PATTERN_NAMES.length];
  const cells = buildCells(pattern, theme, seed, cols, rows);

  return (
    <svg
      className="work-card-art"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width={cols} height={rows} fill="#141414" />
      {cells.map((rc, i) => (
        <rect key={i} x={rc.x} y={rc.y} width="1" height="1" fill={rc.color} />
      ))}
    </svg>
  );
}

/**
 * One card in the asymmetric Selected-work grid. `span` is the column
 * count on the 6-column desktop grid and drives the content variant:
 * 4 = large (summary + tags), 3 = medium (summary), 2 = small.
 */
export default function WorkCard({ item, span, index }) {
  const variant = span >= 4 ? 'lg' : span >= 3 ? 'md' : 'sm';
  const theme = THEMES[item.slug] || FALLBACK_THEMES[hashString(item.slug) % FALLBACK_THEMES.length];

  return (
    <Link
      to={`/projects/${item.slug}`}
      className={`work-card span-${span} variant-${variant} reveal`}
      style={{
        '--card-accent': theme.bright,
        '--reveal-delay': `${Math.min(index * 60, 240)}ms`,
      }}
    >
      <PixelArt slug={item.slug} />
      <div className="work-card-body">
        <p className="card-type">{item.kind === 'research' ? 'Research' : 'Product'}</p>
        <h3 className="work-card-title">{item.title}</h3>
        <p className="work-card-sub">{item.subtitle || item.venue}</p>
        <p className="work-card-summary">{item.summary}</p>
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
