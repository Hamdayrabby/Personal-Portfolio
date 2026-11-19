import { Link, useParams } from 'react-router-dom';
import { projects, research } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';

const entries = [...projects, ...research];

export default function CaseStudy() {
  const { slug } = useParams();
  useScrollReveal([slug]);

  const index = entries.findIndex((e) => e.slug === slug);
  const item = entries[index];

  usePageMeta(
    item ? `${item.title} — Hamday Rabby Hossain` : 'Not found — Hamday Rabby Hossain',
    item ? item.summary : 'That page does not exist.'
  );

  if (!item) {
    return (
      <div className="container-narrow" style={{ paddingBlock: '6rem' }}>
        <h1 className="display" style={{ fontSize: 'var(--step-3)' }}>
          Not found
        </h1>
        <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
          That project doesn&rsquo;t exist. It may have been renamed.
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

  const meta = [
    { label: 'Role', value: item.role },
    item.org
      ? { label: 'Organisation', value: item.org }
      : { label: 'Context', value: item.venue },
    item.period ? { label: 'Period', value: item.period } : null,
    item.visibility === 'private'
      ? { label: 'Code', value: 'Private — walkthrough on request' }
      : item.links?.find((l) => l.label === 'GitHub')
        ? null
        : { label: 'Code', value: 'Not published' },
  ].filter(Boolean);

  return (
    <article className="case">
      <div className="container">
        <Link to="/projects" className="back-link">
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header>
          <p className="eyebrow">{item.visibility === 'private' ? 'Company work' : 'Project'}</p>
          <h1 className="case-title" style={{ marginTop: '1rem' }}>
            {item.title}
          </h1>
          {item.subtitle && <p className="case-sub">{item.subtitle}</p>}

          <dl className="case-meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="case-section">
          <h2>Context</h2>
          <p className="case-body">{item.context}</p>
        </section>

        <section className="case-section">
          <h2>Decisions</h2>
          <div className="decisions">
            {item.decisions.map((d, i) => (
              <div
                className="decision reveal"
                style={{ '--reveal-delay': `${Math.min(i * 60, 240)}ms` }}
                key={d.title}
              >
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {item.fixes?.length > 0 && (
          <section className="case-section">
            <h2>Bugs fixed</h2>
            <ul className="fixes">
              {item.fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="case-section">
          <h2>Outcome</h2>
          <p className="case-outcome">{item.outcome}</p>
          {item.note && <p className="case-note">{item.note}</p>}
        </section>

        <section className="case-section">
          <h2>Stack</h2>
          <div className="tags">
            {item.stack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          {item.links?.length > 0 && (
            <div className="case-links">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link"
                >
                  {link.label} <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <nav className="case-nav" aria-label="More work">
          <div>
            {prev && (
              <Link to={`/projects/${prev.slug}`}>
                <span className="dir">← Previous</span>
                <span className="case-nav-title">{prev.title}</span>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link to={`/projects/${next.slug}`} className="next">
                <span className="dir">Next →</span>
                <span className="case-nav-title">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
