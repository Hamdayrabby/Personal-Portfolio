const SIZE = 23; // measured 23px pixel squares
const COLORS = [
  '#bced12', // lime
  '#566912', // dimmed olive 1
  '#5b7012', // dimmed olive 2
  '#617812', // dimmed olive 3
  '#bced12', // lime again — roughly 2:1 lime vs olive
  '#566912',
  '#f6c53a', // a few gold squares
];

/** Small deterministic PRNG — the strip must be identical on every render. */
function mulberry32(seed) {
  let a = seed | 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStrip(seed, count) {
  const rand = mulberry32(seed);
  const squares = [];
  for (let i = 0; i < count; i += 1) {
    const roll = rand();
    squares.push({
      left: (i / count) * 100,
      row: roll < 0.45 ? 0 : roll < 0.8 ? 1 : 2,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      delay: Math.round(rand() * 320),
    });
  }
  return squares;
}

// Computed once at module load with a fixed seed — stable pattern, no
// Math.random anywhere.
const SQUARES = buildStrip(0x5eed, 54);

/**
 * Decorative strip of 23px pixel squares clustered at a section boundary.
 * Squares stagger in on scroll-reveal via the shared `.reveal` system and
 * collapse to a fully static pattern under prefers-reduced-motion.
 */
export default function PixelMosaic({ className = '' }) {
  return (
    <div
      className={`pixel-mosaic reveal${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {SQUARES.map((s, i) => (
        <span
          key={i}
          className="px"
          style={{
            left: `${s.left}%`,
            top: `${s.row * SIZE}px`,
            background: s.color,
            transitionDelay: `${s.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
