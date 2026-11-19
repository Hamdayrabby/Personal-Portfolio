import { Link, useParams } from 'react-router-dom';
import { projects, research } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const entries = [...projects, ...research];

export default function CaseStudy() {
  const { slug } = useParams();

  const index = entries.findIndex((e) => e.slug === slug);
  const item = entries[index];

  usePageMeta(
    item ? `${item.title} — Hamday Rabby Hossain` : 'Not found — Hamday Rabby Hossain',
    item ? item.summary : 'That project does not exist.'
  );

  if (!item) {
    return (
      <div className="container-narrow" style={{ paddingBlock: '6rem' }}>
        <h1 className="display" style={{ fontSize: 'var(--step-3)' }}>
          Project Not Found
        </h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          That project doesn&rsquo;t exist. It may have been renamed or moved.
        </p>
        <p style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="arrow-link">
            All projects <span className="arrow">→</span>
          </Link>
        </p>
      </div>
    );
  }

  const prev = index > 0 ? entries[index - 1] : null;
  const next = index < entries.length - 1 ? entries[index + 1] : null;

  return (
    <article className="case">
      <div className="container">
        <Link to="/projects" className="back-link">
          <span aria-hidden="true">←</span> All projects
        </Link>

        {/* 1. Header: Title + one-line outcome */}
        <header className="case-header" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          <h1 className="case-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.15, fontWeight: '800' }}>
            {item.title}
          </h1>
          <p className="case-outcome-lead" style={{ fontSize: 'var(--step-1)', color: 'var(--accent)', marginTop: '0.75rem', fontWeight: '500', maxWidth: '64ch' }}>
            {item.outcome}
          </p>

          {/* At a glance: role, timeframe, stack, status, links */}
          <div className="case-glance" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h2 style={{ fontSize: 'var(--step--1)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              At a glance
            </h2>
            <dl className="case-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.25rem', margin: 0 }}>
              <div>
                <dt style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>Role</dt>
                <dd style={{ fontSize: 'var(--step-0)', fontWeight: '600', marginTop: '0.2rem' }}>{item.role}</dd>
              </div>
              {item.period && (
                <div>
                  <dt style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>Timeframe</dt>
                  <dd style={{ fontSize: 'var(--step-0)', marginTop: '0.2rem' }}>{item.period}</dd>
                </div>
              )}
              {item.org && (
                <div>
                  <dt style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>Context</dt>
                  <dd style={{ fontSize: 'var(--step-0)', marginTop: '0.2rem' }}>{item.org}</dd>
                </div>
              )}
              <div>
                <dt style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>Status</dt>
                <dd style={{ fontSize: 'var(--step-0)', marginTop: '0.2rem' }}>
                  {item.visibility === 'private' ? 'Private codebase' : 'Open / Public'}
                </dd>
              </div>
            </dl>

            {item.links && item.links.length > 0 && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link"
                    style={{ fontSize: 'var(--step-0)' }}
                  >
                    {link.label} <span className="arrow">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* 2. Problem: what had to work and why it was hard */}
        <section className="case-section">
          <h2>Problem & Context</h2>
          <p className="case-body" style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, maxWidth: '68ch' }}>
            {item.context}
          </p>
        </section>

        {/* 3. Constraints */}
        {item.constraints && item.constraints.length > 0 && (
          <section className="case-section">
            <h2>Constraints</h2>
            <ul className="case-constraints" style={{ paddingLeft: '1.25rem', maxWidth: '68ch', fontSize: 'var(--step-0)', lineHeight: 1.65, color: 'var(--text)' }}>
              {item.constraints.map((c, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 4. Decisions (spec §5.2: decisions come before architecture) */}
        <section className="case-section">
          <h2>Key Decisions & Tradeoffs</h2>
          <div className="decisions">
            {item.decisions.map((d) => (
              <div className="decision" key={d.title}>
                <div>
                  <h3 style={{ fontSize: 'var(--step-0)', fontWeight: '700', color: 'var(--accent)' }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: 'var(--step-0)', lineHeight: 1.65, marginTop: '0.4rem', color: 'var(--text)' }}>
                    {d.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Architecture & Diagram */}
        <section className="case-section">
          <h2>Architecture</h2>
          {item.architectureSummary && (
            <p className="case-body" style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, maxWidth: '68ch', marginBottom: '1.5rem' }}>
              {item.architectureSummary}
            </p>
          )}

          <div
            className="case-diagram"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              background: '#141414',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArchitectureDiagram slug={item.slug} />
          </div>
        </section>

        {/* 6. What shipped */}
        {((item.shipped && item.shipped.length > 0) || (item.fixes && item.fixes.length > 0)) && (
          <section className="case-section">
            <h2>What Shipped</h2>
            <ul className="fixes" style={{ paddingLeft: '1.25rem', maxWidth: '68ch', fontSize: 'var(--step-0)', lineHeight: 1.65 }}>
              {(item.shipped || item.fixes).map((itemFact, idx) => (
                <li key={idx} style={{ marginBottom: '0.4rem' }}>
                  {itemFact}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. What I'd change */}
        {item.whatIdChange && (
          <section className="case-section">
            <h2>What I&rsquo;d Change</h2>
            <p className="case-body" style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, maxWidth: '68ch', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              &ldquo;{item.whatIdChange}&rdquo;
            </p>
          </section>
        )}

        {/* 8. Stack */}
        <section className="case-section">
          <h2>Technologies & Stack</h2>
          <div className="card-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {item.stack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          {item.note && (
            <p className="case-note" style={{ marginTop: '1.5rem', fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
              {item.note}
            </p>
          )}
        </section>

        {/* Navigation */}
        <nav className="case-nav" aria-label="More work" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <div>
            {prev && (
              <Link to={`/projects/${prev.slug}`}>
                <span className="dir">← Previous Project</span>
                <span className="case-nav-title">{prev.title}</span>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link to={`/projects/${next.slug}`} className="next">
                <span className="dir">Next Project →</span>
                <span className="case-nav-title">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
