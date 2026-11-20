import { useEffect, useState } from 'react';
import { profile } from '../data/portfolioData';

const BLOCKS = 12;
const STEP_MS = 130; // one block fills per step — deliberate, not rushed
const HOLD_MS = 380; // brief pause at 100% before the fade
const FADE_MS = 260;

/**
 * Retro boot screen: the pixel progress bar fills block by block while a
 * percentage counts up, holds at 100%, then fades and unmounts. The whole
 * sequence runs ~2s regardless of how fast assets arrive — it is a
 * title card, not a spinner. Skipped entirely for prefers-reduced-motion.
 */
export default function Loader() {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(reduced);

  useEffect(() => {
    if (reduced) return undefined;

    const timers = [];
    const hold = () => {
      timers.push(window.setTimeout(() => setFading(true), HOLD_MS));
      timers.push(window.setTimeout(() => setGone(true), HOLD_MS + FADE_MS));
    };

    let n = 0;
    const tick = window.setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= BLOCKS) {
        window.clearInterval(tick);
        hold();
      }
    }, STEP_MS);

    return () => {
      window.clearInterval(tick);
      timers.forEach(window.clearTimeout);
    };
  }, [reduced]);

  if (gone) return null;

  const pct = Math.round((count / BLOCKS) * 100);

  return (
    <div className={`loader${fading ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-name">{profile.name}</p>
        <div className="loader-bar">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span
              key={i}
              className={`loader-block${i < count ? ' is-filled' : ''}`}
            />
          ))}
        </div>
        <p className="loader-label">
          LOADING <span className="loader-pct">{pct}%</span>
        </p>
      </div>
    </div>
  );
}
