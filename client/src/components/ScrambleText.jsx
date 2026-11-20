import { useEffect, useMemo, useState } from 'react';

const GLYPHS = '#%&@*+=<>/\\[]{}!?01';
const DURATION_MS = 1100; // spec: decode in <=1.2s

/** Splits on the site's **emphasis** convention into styled segments. */
function toSegments(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  const segments = [];
  parts.forEach((part, i) => {
    if (part.length > 0) segments.push({ text: part, em: i % 2 === 1 });
  });
  return segments;
}

/** Deterministic glyph tail for the not-yet-decoded part of a segment. */
function scrambleTail(chars, segIndex, frame) {
  let out = '';
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    if (ch === ' ' || ch === '\n') {
      out += ch;
    } else {
      out += GLYPHS[(i * 31 + segIndex * 13 + frame * 7) % GLYPHS.length];
    }
  }
  return out;
}

/** Pure: how much of each segment is decoded at this progress, with glyph tails. */
function buildVisual(segments, progress, frame) {
  const total = segments.reduce((n, s) => n + s.text.length, 0);
  let budget = Math.floor(progress * total);
  return segments.map((seg, si) => {
    let shown;
    if (progress >= 1) {
      shown = seg.text;
    } else {
      const n = Math.min(budget, seg.text.length);
      budget -= n;
      shown = seg.text.slice(0, n) + scrambleTail(seg.text.slice(n), si, frame);
    }
    return { em: seg.em, shown };
  });
}

/**
 * Decodes text through a retro glyph scramble on first mount, preserving
 * the **text** italic-emphasis convention. Runs once per mount, never on
 * scroll, and is skipped entirely under prefers-reduced-motion (the lazy
 * progress initializer snaps straight to 1). The real text is kept in a
 * visually-hidden span so screen readers never hear the scrambled glyphs.
 */
export default function ScrambleText({ text, className }) {
  const segments = useMemo(() => toSegments(text), [text]);
  const [progress, setProgress] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 1
      : 0
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let raf = 0;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const frame = Math.floor(progress * 40);
  const visual = useMemo(
    () => buildVisual(segments, progress, frame),
    [segments, progress, frame]
  );

  return (
    <span className={className}>
      <span className="visually-hidden">{text.replace(/\*\*/g, '')}</span>
      <span aria-hidden="true">
        {visual.map((seg, i) =>
          seg.em ? <em key={i}>{seg.shown}</em> : <span key={i}>{seg.shown}</span>
        )}
      </span>
    </span>
  );
}
