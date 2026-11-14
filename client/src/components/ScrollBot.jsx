import { useEffect, useRef, useState } from 'react';

const DOT_COUNT = 12;

/**
 * Retro jetpack bot riding the scroll rail on the right edge. The dots
 * fill with progress (as before) and the bot travels down the rail with
 * it: flames flicker and legs step while scrolling, it bobs and blinks
 * when idle. Purely decorative — aria-hidden, pointer-events none.
 * Under reduced motion it renders as a static trail with a parked bot.
 */
export default function ScrollBot() {
  const [filled, setFilled] = useState(0);
  const [moving, setMoving] = useState(false);
  const frame = useRef(0);
  const idleTimer = useRef(0);
  const botRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const update = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setFilled(Math.round(p * DOT_COUNT));

        const track = trackRef.current;
        const bot = botRef.current;
        if (track && bot) {
          const rail = track.offsetHeight - bot.offsetHeight;
          bot.style.transform = `translate(-50%, ${Math.round(p * rail)}px)`;
        }

        setMoving(true);
        window.clearTimeout(idleTimer.current);
        idleTimer.current = window.setTimeout(() => setMoving(false), 320);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(idleTimer.current);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={`scroll-bot${moving ? ' is-moving' : ''}`} aria-hidden="true">
      <div className="bot-track" ref={trackRef}>
        {Array.from({ length: DOT_COUNT }, (_, i) => (
          <span key={i} className={`dot${i < filled ? ' is-filled' : ''}`} />
        ))}
        <div className="bot" ref={botRef}>
          <svg className="bot-svg" viewBox="0 0 12 17" shapeRendering="crispEdges">
            {/* antenna */}
            <rect x="5" y="0" width="2" height="1" fill="var(--accent-gold)" />
            <rect x="5" y="1" width="2" height="1" fill="var(--accent)" className="bot-antenna" />
            {/* head + visor */}
            <rect x="2" y="2" width="8" height="5" fill="var(--accent-gold)" />
            <rect x="3" y="3" width="6" height="3" fill="#1d1d1d" />
            <rect x="4" y="4" width="1" height="1" fill="var(--accent)" className="bot-eye" />
            <rect x="7" y="4" width="1" height="1" fill="var(--accent)" className="bot-eye" />
            {/* body + core */}
            <rect x="3" y="7" width="6" height="4" fill="var(--accent-gold)" />
            <rect x="5" y="8" width="2" height="2" fill="var(--accent)" className="bot-core" />
            {/* arms */}
            <rect x="2" y="8" width="1" height="3" fill="var(--accent-gold)" />
            <rect x="9" y="8" width="1" height="3" fill="var(--accent-gold)" />
            {/* legs — step alternately while moving */}
            <rect x="4" y="11" width="1" height="2" fill="var(--accent-gold)" className="bot-leg leg-a" />
            <rect x="7" y="11" width="1" height="2" fill="var(--accent-gold)" className="bot-leg leg-b" />
            {/* jet flames — only while scrolling */}
            <g className="bot-flames">
              <rect x="4" y="13" width="1" height="2" fill="var(--accent)" />
              <rect x="7" y="13" width="1" height="2" fill="var(--accent)" />
              <rect x="4" y="13" width="1" height="1" fill="var(--accent-gold)" />
              <rect x="7" y="13" width="1" height="1" fill="var(--accent-gold)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
