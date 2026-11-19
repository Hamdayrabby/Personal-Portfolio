import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Page Not Found — Hamday Rabby Hossain',
    'The requested page does not exist.'
  );

  return (
    <div className="container" style={{ paddingBlock: 'clamp(5rem, 12vw, 10rem)', textAlign: 'center' }}>
      <p style={{ fontSize: 'var(--step-0)', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        404
      </p>
      <h1 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: 'var(--step-1)', color: 'var(--text-muted)', maxWidth: '44ch', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
        The system path you requested does not exist or has been relocated.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/" className="pixel-btn">
          Return to Home
        </Link>
        <Link to="/projects" className="pixel-btn pixel-btn-ghost">
          View Projects
        </Link>
      </div>
    </div>
  );
}
