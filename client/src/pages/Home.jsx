import { Link } from 'react-router-dom';
import { profile, projects, experience, research, skills, featuredOrder } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';
import PixelImage from '../components/PixelImage';
import WorkRow from '../components/WorkRow';
import WorkCard from '../components/WorkCard';

export default function Home() {
  usePageMeta(
    'Hamday Rabby Hossain — AI Engineer',
    'AI engineer building production systems in real-time voice, retrieval, and agent infrastructure. Case studies, research, and resume.'
  );

  // 6 selected cards per spec §5.1: ORA, Adcut, Axo, Hubble, Quorum, manygpt
  const featured = featuredOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="home-page">
      {/* 1. Hero */}
      <section className="hero hero-load">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-heading">I build production AI systems.</h1>

            <p className="hero-subline">
              Real-time voice, retrieval, and agent infrastructure. Junior Software Developer at Hype Corporation; M.Sc. thesis on graph-tabular fraud detection at HSTU.
            </p>

            <div className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span>{profile.availability}</span>
            </div>

            <div className="hero-ctas">
              <Link to="/projects" className="pixel-btn">
                View projects
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

          <figure className="hero-portrait">
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

      {/* 2. Selected work */}
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
                featured={i === 0}
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

      {/* 3. Research */}
      <section className="section" id="research">
        <div className="container">
          <div className="section-head">
            <h2>Research</h2>
            <span className="count">{research.length} projects</span>
          </div>

          <div className="work-list">
            {research.map((item) => (
              <WorkRow
                key={item.slug}
                item={item}
                meta={[item.venue, item.role]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experience (compact) */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-head">
            <h2>Experience</h2>
          </div>

          <div className="timeline">
            {experience.map((job) => (
              <article className="tl-item" key={`${job.org}-${job.period}`}>
                <p className="tl-date">{job.period}</p>
                <div>
                  <h3 className="tl-role">{job.role}</h3>
                  <p className="tl-org">
                    {job.org} · {job.location}
                  </p>
                  <p className="tl-summary">{job.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/about" className="arrow-link">
              Full experience on About <span className="arrow">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* 5. Skills (compact) */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-head">
            <h2>Skills</h2>
          </div>

          <dl className="skill-table">
            {skills.map((group) => (
              <div className="skill-row" key={group.label}>
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

      {/* 6. Contact CTA */}
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
