import { Link } from 'react-router-dom';
import { profile, projects, experience, research, skills } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import RichText from '../components/RichText';
import WorkRow from '../components/WorkRow';

const stagger = (i) => ({ '--reveal-delay': `${Math.min(i * 60, 240)}ms` });

export default function Home() {
  useScrollReveal();

  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      {/* Hero — magazine opening spread: lede column + portrait column */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {profile.role} · {profile.location}
            </p>

            <h1 className="lede" style={{ marginTop: '1.5rem' }}>
              <RichText text={profile.lede} />
            </h1>

            <div className="hero-meta">
              <span>{profile.availability}</span>
              <span className="dot" aria-hidden="true">
                ·
              </span>
              <span>Most recently at Hype Corporation</span>
            </div>

            <p className="hero-intro">{profile.intro}</p>

            <div className="hero-links">
              <Link to="/work" className="arrow-link">
                Selected work <span className="arrow">→</span>
              </Link>
              <Link to="/resume" className="arrow-link">
                Resume <span className="arrow">→</span>
              </Link>
              <a href={`mailto:${profile.email}`} className="arrow-link">
                Email <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <figure className="hero-portrait reveal">
            <img
              src="/assets/profile.png"
              alt={`Portrait of ${profile.name}`}
              width="1024"
              height="1280"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* Selected work */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head">
            <h2>Selected work</h2>
            <span className="count">
              {featured.length} of {projects.length}
            </span>
          </div>

          <div className="work-list">
            {featured.map((item, i) => (
              <WorkRow
                key={item.slug}
                item={item}
                index={i}
                meta={[item.org, item.period]}
              />
            ))}
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/work" className="arrow-link">
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
            <h2>Tools</h2>
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
