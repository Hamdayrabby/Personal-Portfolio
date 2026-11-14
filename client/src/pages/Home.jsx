import { Link } from 'react-router-dom';
import { profile, projects, experience, research, skills } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import RoleTicker from '../components/RoleTicker';
import PixelImage from '../components/PixelImage';
import PixelMosaic from '../components/PixelMosaic';
import WorkRow from '../components/WorkRow';
import WorkCard from '../components/WorkCard';

const stagger = (i) => ({ '--reveal-delay': `${Math.min(i * 60, 240)}ms` });

// Asymmetric column spans on the 6-column grid — 4 = large, 3 = medium,
// 2 = small. One large card per pair of rows keeps the layout unbalanced
// on purpose.
const SPANS = [4, 2, 3, 3, 2, 4, 3, 3];

/* 8-bit icon strip: code, research, AI — pure rect SVGs, gold, decorative. */
function PixelIcons() {
  return (
    <div className="hero-icons" aria-hidden="true">
      {/* </> code */}
      <svg viewBox="0 0 10 10" shapeRendering="crispEdges">
        <rect x="3" y="1" width="1" height="1" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="1" y="3" width="1" height="1" />
        <rect x="1" y="4" width="1" height="1" />
        <rect x="1" y="5" width="1" height="1" />
        <rect x="1" y="6" width="1" height="1" />
        <rect x="2" y="7" width="1" height="1" />
        <rect x="3" y="8" width="1" height="1" />
        <rect x="6" y="1" width="1" height="1" />
        <rect x="7" y="2" width="1" height="1" />
        <rect x="8" y="3" width="1" height="1" />
        <rect x="8" y="4" width="1" height="1" />
        <rect x="8" y="5" width="1" height="1" />
        <rect x="8" y="6" width="1" height="1" />
        <rect x="7" y="7" width="1" height="1" />
        <rect x="6" y="8" width="1" height="1" />
        <rect x="4" y="5" width="1" height="1" />
        <rect x="5" y="4" width="1" height="1" />
      </svg>
      {/* flask — research */}
      <svg viewBox="0 0 10 10" shapeRendering="crispEdges">
        <rect x="4" y="0" width="2" height="1" />
        <rect x="4" y="1" width="1" height="1" />
        <rect x="4" y="2" width="1" height="1" />
        <rect x="3" y="3" width="2" height="1" />
        <rect x="2" y="4" width="4" height="1" />
        <rect x="1" y="5" width="8" height="1" />
        <rect x="0" y="6" width="10" height="1" />
        <rect x="0" y="7" width="10" height="1" />
        <rect x="1" y="8" width="8" height="1" />
        <rect x="2" y="9" width="6" height="1" />
        <rect x="4" y="7" width="1" height="2" />
        <rect x="6" y="7" width="1" height="1" />
      </svg>
      {/* chip — AI */}
      <svg viewBox="0 0 10 10" shapeRendering="crispEdges">
        <rect x="3" y="3" width="4" height="4" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="7" y="2" width="1" height="1" />
        <rect x="2" y="7" width="1" height="1" />
        <rect x="7" y="7" width="1" height="1" />
        <rect x="4" y="0" width="1" height="2" />
        <rect x="5" y="0" width="1" height="2" />
        <rect x="4" y="8" width="1" height="2" />
        <rect x="5" y="8" width="1" height="2" />
        <rect x="0" y="4" width="2" height="1" />
        <rect x="0" y="5" width="2" height="1" />
        <rect x="8" y="4" width="2" height="1" />
        <rect x="8" y="5" width="2" height="1" />
      </svg>
    </div>
  );
}

export default function Home() {
  useScrollReveal();

  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      {/* Hero — retro title screen: role ticker + real portrait, minimal text */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <PixelIcons />

            <h1 className="hero-role">
              <span className="visually-hidden">{profile.name} — </span>
              <RoleTicker roles={profile.roles} />
            </h1>

            <p className="hero-tagline">I build production AI systems.</p>

            <div className="hero-meta">
              <span>{profile.availability}</span>
              <span className="dot" aria-hidden="true">
                ·
              </span>
              <span>Most recently at Hype Corporation</span>
            </div>

            <div className="hero-ctas">
              <Link to="/projects" className="pixel-btn">
                ▶ View Projects
              </Link>
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn-ghost"
              >
                Download CV
              </a>
            </div>
          </div>

          <figure className="hero-portrait reveal">
            <PixelImage
              src="/assets/profile.png"
              alt={`Portrait of ${profile.name}`}
              width="1024"
              height="1280"
              eager
            />
          </figure>
        </div>
      </section>

      <PixelMosaic />

      {/* Selected work */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head">
            <h2>Selected work</h2>
            <span className="count">
              {featured.length} of {projects.length}
            </span>
          </div>

          <div className="work-grid">
            {featured.map((item, i) => (
              <WorkCard
                key={item.slug}
                item={item}
                span={SPANS[i % SPANS.length]}
                index={i}
              />
            ))}
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/projects" className="arrow-link">
              All projects and archive <span className="arrow">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-head">
            <h2>Experience</h2>
          </div>

          <div className="timeline">
            {experience.map((job, i) => (
              <article className="tl-item reveal" style={stagger(i)} key={`${job.org}-${job.period}`}>
                <p className="tl-date">{job.period}</p>
                <div>
                  <h3 className="tl-role">{job.role}</h3>
                  <p className="tl-org">
                    {job.org} · {job.location}
                  </p>
                  <p className="tl-summary">{job.summary}</p>
                  {job.highlights && (
                    <ul className="tl-list">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {job.products && (
                    <p className="tl-products">
                      Products: {job.products.join(' · ')}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="section" id="research">
        <div className="container">
          <div className="section-head">
            <h2>Research</h2>
            <span className="count">{research.length} projects</span>
          </div>

          <div className="work-list">
            {research.map((item, i) => (
              <WorkRow
                key={item.slug}
                item={item}
                index={i}
                meta={[item.venue, item.role]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-head">
            <h2>Skills</h2>
          </div>

          <dl className="skill-table">
            {skills.map((group, i) => (
              <div className="skill-row reveal" style={stagger(i)} key={group.label}>
                <dt>{group.label}</dt>
                <dd>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact-cta">
        <div className="container">
          <h2
            className="display"
            style={{ fontSize: 'var(--step-3)', marginBottom: '1.25rem' }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontSize: 'var(--step-1)',
              color: 'var(--ink-soft)',
              lineHeight: 1.75,
              marginBottom: '2rem',
              maxWidth: '56ch',
            }}
          >
            Questions about any decision on this site are welcome — the
            architecture notes are deliberately specific enough to argue with.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem' }}>
            <a href={`mailto:${profile.email}`} className="arrow-link">
              {profile.email} <span className="arrow">→</span>
            </a>
            <Link to="/contact" className="arrow-link">
              Contact form <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
