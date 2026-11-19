import { profile } from '../data/portfolioData';
import PixelMosaic from './PixelMosaic';

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <PixelMosaic />
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
          <a href={profile.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
          <span className="mono" style={{ color: 'var(--muted)' }}>
            {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
