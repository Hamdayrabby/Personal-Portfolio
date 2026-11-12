import { projects, research, archive } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import WorkRow from '../components/WorkRow';

export default function Work() {
  useScrollReveal();

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
          <div className="section-head">
            <h2>Products</h2>
            <span className="count">{projects.length} entries</span>
          </div>
          <div className="work-list">
            {projects.map((item) => (
              <WorkRow key={item.slug} item={item} meta={[item.org, item.period]} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Research</h2>
            <span className="count">{research.length} entries</span>
          </div>
          <div className="work-list">
            {research.map((item) => (
              <WorkRow key={item.slug} item={item} meta={[item.venue, item.role]} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Archive</h2>
            <span className="count">{archive.length} entries</span>
          </div>

          <div className="archive-list">
            {archive.map((item) => (
              <article className="archive-item reveal" key={item.title}>
                <div>
                  <h3 className="archive-title">{item.title}</h3>
                  <p className="archive-org">
                    {item.org} · {item.year}
                  </p>
                </div>
                <div>
                  <p className="archive-summary">{item.summary}</p>
                  <div className="archive-links">
                    {item.visibility === 'private' && (
                      <span className="badge-private">Private codebase</span>
                    )}
                    {item.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <div className="tags" style={{ marginTop: '0.75rem' }}>
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
        </div>
      </section>
    </div>
  );
}
