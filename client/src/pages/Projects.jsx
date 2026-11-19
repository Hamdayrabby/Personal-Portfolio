import { useState } from 'react';
import { projects, research, archive, featuredOrder } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';
import WorkCard from '../components/WorkCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'product', label: 'Products' },
  { key: 'research', label: 'Research' },
];

// Products in featured order first, then remaining products, then research
const allEntries = [
  ...featuredOrder
    .map((slug) => projects.find((item) => item.slug === slug))
    .filter(Boolean),
  ...projects.filter((item) => !featuredOrder.includes(item.slug)),
  ...research,
];

export default function Projects() {
  usePageMeta(
    'Projects — Hamday Rabby Hossain',
    'Case studies covering the decisions and tradeoffs behind production AI systems — voice agents, coding tools, and research.'
  );
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all' ? allEntries : allEntries.filter((item) => item.kind === filter);

  const countLabel =
    filter === 'product' ? 'projects' : filter === 'research' ? 'research' : 'entries';

  // Group coursework items cleanly in archive
  const mainArchive = archive.filter(item => !item.org?.toLowerCase().includes('coursework'));
  const courseworkArchive = archive.filter(item => item.org?.toLowerCase().includes('coursework'));

  return (
    <div>
      <section className="hero" style={{ paddingBottom: '0' }}>
        <div className="container">
          <h1 className="lede" style={{ marginTop: '1.25rem', maxWidth: '20ch' }}>
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
            <div className="filter-chips">
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
            </div>
            <span className="count">
              {visible.length} {countLabel}
            </span>
          </div>

          <div className="work-grid" style={{ marginTop: '2rem' }}>
            {visible.map((p) => (
              <WorkCard key={p.slug} item={p} />
            ))}
            {visible.length === 0 && <p>No entries match this filter.</p>}
          </div>
        </div>
      </section>

      {/* Archive — compact entries without case-study pages */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Archive</h2>
            <span className="count">{archive.length} entries</span>
          </div>

          <div className="archive-list">
            {mainArchive.map((item) => (
              <article className="archive-item" key={item.title}>
                <div>
                  <h3 className="archive-title">{item.title}</h3>
                  <p className="archive-org">
                    {item.org} · {item.year}
                  </p>
                </div>
                <div>
                  <p className="archive-summary">{item.summary}</p>
                  <div className="archive-links">
                    {item.visibility === 'private' ? (
                      <span className="card-private">Private codebase — walkthrough on request</span>
                    ) : (
                      item.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                        >
                          {link.label} ↗
                        </a>
                      ))
                    )}
                  </div>
                  <div className="card-tags">
                    {item.stack.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {courseworkArchive.length > 0 && (
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)' }}>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Earlier coursework & academic systems
                </p>
                {courseworkArchive.map((item) => (
                  <article className="archive-item" key={item.title}>
                    <div>
                      <h3 className="archive-title">{item.title}</h3>
                      <p className="archive-org">
                        {item.org} · {item.year}
                      </p>
                    </div>
                    <div>
                      <p className="archive-summary">{item.summary}</p>
                      <div className="archive-links">
                        {item.visibility === 'private' ? (
                          <span className="card-private">Private codebase — walkthrough on request</span>
                        ) : (
                          item.links?.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link"
                            >
                              {link.label} ↗
                            </a>
                          ))
                        )}
                      </div>
                      <div className="card-tags">
                        {item.stack.map((tech) => (
                          <span className="tag" key={tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
