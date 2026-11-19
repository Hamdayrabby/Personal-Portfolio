const SIZE = 23; // measured 23px pixel squares
const COUNT = 54;

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

/* D5: one static monochrome strip in the footer only. Grey squares on the
   page background, baked at module load, no animation, no reveal classes. */
const SQUARES = (() => {
  const rand = mulberry32(0x5eed);
  return Array.from({ length: COUNT }, (_, i) => ({
    left: (i / COUNT) * 100,
    row: rand() < 0.45 ? 0 : rand() < 0.8 ? 1 : 2,
    opacity: 0.35 + rand() * 0.4,
  }));
})();

export default function PixelMosaic() {
  return (
    <div className="pixel-mosaic is-visible" aria-hidden="true">
      {SQUARES.map((s, i) => (
        <span
          key={i}
          className="px"
          style={{ left: `${s.left}%`, top: `${s.row * SIZE}px`, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}
