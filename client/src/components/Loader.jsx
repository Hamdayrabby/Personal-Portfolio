import { useEffect, useState } from 'react';
import { profile } from '../data/portfolioData';

const CAP_MS = 1200; // hard cap — never hold the page longer than this

/**
 * Retro title-screen loader: pixel progress blocks sweep while fonts load.
 * Hidden once fonts settle (or at the cap), then unmounted. Skipped
 * entirely for prefers-reduced-motion.
 */
export default function Loader() {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(reduced);

  useEffect(() => {
    if (reduced) return undefined;

    let fadeTimer = 0;
    let goneTimer = 0;
    const hide = () => {
      setFading(true);
      fadeTimer = window.setTimeout(() => setGone(true), 260);
    };

    const fontsReady = document.fonts?.ready;
    const cap = window.setTimeout(hide, CAP_MS);
    if (fontsReady) fontsReady.then(hide, hide);

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div className={`loader${fading ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-name">{profile.name}</p>
        <div className="loader-bar">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="loader-block"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          ))}
        </div>
        <p className="loader-label">
          LOADING
          <span className="role-cursor" />
        </p>
      </div>
    </div>
  );
}
