import { profile } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import PixelMosaic from './PixelMosaic';
import ScrollBot from './ScrollBot';

const year = new Date().getFullYear();

/* Pixel-art gamepad in gold — inline SVG rects, no emoji, no icon packages. */
function GamepadIcon() {
  return (
    <svg
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* body */}
      <rect x="4" y="2" width="18" height="12" />
      {/* d-pad */}
      <rect x="6" y="6" width="6" height="2" fill="#121212" />
      <rect x="8" y="4" width="2" height="6" fill="#121212" />
      {/* buttons */}
      <rect x="17" y="4" width="2" height="2" fill="#121212" />
      <rect x="19" y="6" width="2" height="2" fill="#121212" />
      {/* start / select */}
      <rect x="12" y="10" width="2" height="2" fill="#121212" />
      <rect x="15" y="10" width="2" height="2" fill="#121212" />
    </svg>
  );
}

export default function SiteFooter() {
  // Reveals the footer mosaic strip on pages that don't run the page-level hook.
  useScrollReveal();

  return (
    <footer className="site-footer">
      <PixelMosaic />
      <ScrollBot />
      <div className="container footer-inner">
        <p className="footer-note">
          {profile.name} — {profile.location}. {profile.availability}.
        </p>

        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.codeforces} target="_blank" rel="noopener noreferrer">
            Codeforces
          </a>
          <span className="footer-gamepad" aria-hidden="true">
            <GamepadIcon />
          </span>
          <span className="mono" style={{ color: 'var(--muted)' }}>
            {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
