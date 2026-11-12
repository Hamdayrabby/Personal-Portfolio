import { useEffect, useRef, useState } from 'react';

const DOT_COUNT = 12;

/**
 * Decorative gold Pac-Man-style dot trail on the right edge. Dots fill
 * with scroll progress; the eaten trail behind is dimmed olive. aria-hidden
 * and pointer-events none — purely visual. Under reduced motion it renders
 * as a static unfilled trail and never listens to scroll.
 */
export default function ScrollDots() {
  const [filled, setFilled] = useState(0);
  const frame = useRef(0);

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
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-dots" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <span key={i} className={`dot${i < filled ? ' is-filled' : ''}`} />
      ))}
    </div>
  );
}
