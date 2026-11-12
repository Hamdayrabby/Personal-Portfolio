import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, research, featuredOrder } from '../data/portfolioData';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'product', label: 'Products' },
  { key: 'research', label: 'Research' },
];

// Products first, in their featured order, then research entries.
const allEntries = [
  ...featuredOrder
    .map((slug) => projects.find((item) => item.slug === slug))
    .filter(Boolean),
  ...projects.filter((item) => !featuredOrder.includes(item.slug)),
  ...research,
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all' ? allEntries : allEntries.filter((item) => item.kind === filter);

  const countLabel =
    filter === 'product' ? 'projects' : filter === 'research' ? 'research' : 'entries';

  return (
    <div>
      <section className="hero" style={{ paddingBottom: '0' }}>
        <div className="container">
          <p className="eyebrow">Index</p>
          <h1 className="lede" style={{ marginTop: '1.25rem', maxWidth: '18ch' }}>
            Everything I&rsquo;ve built that is worth explaining.
          </h1>
          <p
            style={{
              marginTop: '1.75rem',
              maxWidth: '60ch',
              fontSize: 'var(--step-1)',
              color: 'var(--ink-soft)',
              lineHeight: 1.7,
            }}
          >
            Case studies cover the decision and the tradeoff, not a feature list.
            Work done inside company codebases is described at architecture level
            with no links; those marked <em>private</em> are available as a
            walkthrough on request.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-filter">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={filter === f.key ? 'filter-btn is-active' : 'filter-btn'}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
            <span className="count">
              {visible.length} {countLabel}
            </span>
          </div>

          <div className="projects-grid">
            {visible.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="project-card"
                data-kind={p.kind}
              >
                <p className="card-type">{p.kind === 'research' ? 'Research' : 'Product'}</p>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-sub">{p.subtitle || p.venue}</p>
                {p.visibility === 'private' && <p className="card-private">Private codebase</p>}
                <div className="card-tags">
                  {p.stack.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
            {visible.length === 0 && <p>No entries match this filter.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
