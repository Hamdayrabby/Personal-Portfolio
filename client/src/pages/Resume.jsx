import { profile } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

// Minimal resume page: short intro + download. The full record lives on
// /projects and /about; the PDF is the single source for recruiters.
export default function Resume() {
  usePageMeta(
    'Resume — Hamday Rabby Hossain',
    'Download the resume of Hamday Rabby Hossain, AI engineer.'
  );
  return (
    <div className="container" style={{ paddingBlock: 'clamp(3rem, 8vw, 6rem)' }}>
      <p className="eyebrow">Resume</p>

      <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: '1.25rem' }}>
        {profile.name}
      </h1>
      <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
        {profile.role} · {profile.location}
      </p>

      <p
        style={{
          marginTop: '2rem',
          maxWidth: '56ch',
          fontSize: 'var(--step-1)',
          lineHeight: 1.75,
          color: 'var(--ink-soft)',
        }}
      >
        {profile.intro}
      </p>

      <div className="hero-ctas" style={{ marginTop: '2.5rem' }}>
        <a
          href={profile.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn"
        >
          ↓ Download Resume
        </a>
      </div>
    </div>
  );
}
