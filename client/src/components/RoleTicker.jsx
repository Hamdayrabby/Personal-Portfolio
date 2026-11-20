import { useEffect, useState } from 'react';

const GLYPHS = '#%&@*+=<>/\\[]{}!?01';
const IN_MS = 550; // decode-in per role
const HOLD_MS = 1900;
const OUT_MS = 320; // scramble-out before the next role

function glyphFor(chars, seed) {
  return chars
    .split('')
    .map((ch, i) => (ch === ' ' ? ' ' : GLYPHS[(i * 13 + seed * 7) % GLYPHS.length]))
    .join('');
}

/**
 * Retro arcade role ticker: roles cycle one after another — each decodes
 * in through random glyphs, holds, scrambles out, then the next starts.
 * The full role list is rendered statically for screen readers and for
 * prefers-reduced-motion, where no animation runs at all.
 */
export default function RoleTicker({ roles }) {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('in');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;

    if (phase === 'hold') {
      const timer = window.setTimeout(() => setPhase('out'), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    const duration = phase === 'in' ? IN_MS : OUT_MS;
    let raf = 0;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else if (phase === 'in') {
        setPhase('hold');
      } else {
        setIndex((i) => (i + 1) % roles.length);
        setPhase('in');
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduced, roles.length]);

  const role = roles[index].toUpperCase();

  let shown = role;
  if (!reduced && phase === 'in') {
    const n = Math.floor(progress * role.length);
    shown = role.slice(0, n) + glyphFor(role.slice(n), index);
  } else if (!reduced && phase === 'out') {
    shown = role
      .split('')
      .map((ch, i) =>
        ch === ' ' || i / role.length < progress
          ? ch
          : GLYPHS[(i * 17 + index * 5) % GLYPHS.length]
      )
      .join('');
  }

  return (
    <span className="role-ticker">
      <span className="visually-hidden">{roles.join(' · ')}</span>
      <span aria-hidden="true" className="role-ticker-line">
        {shown}
      </span>
    </span>
  );
}
