import { useEffect } from 'react';

/**
 * Adds `is-visible` to `.reveal` elements as they enter the viewport.
 * Elements are unobserved once revealed so the observer stays cheap on
 * long pages. Pass dependencies to re-scan after a list re-renders.
 */
export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('.reveal'));

    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const frame = requestAnimationFrame(() => {
      elements.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
