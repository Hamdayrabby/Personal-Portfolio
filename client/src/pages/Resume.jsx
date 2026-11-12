import {
  profile,
  experience,
  projects,
  research,
  education,
  skills,
  awards,
} from '../data/portfolioData';

export default function Resume() {
  const selected = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="container" style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4rem)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}
      >
        <p className="eyebrow">Resume</p>
        <button type="button" className="submit" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      {/* Header */}
      <header style={{ paddingBottom: '1.75rem', borderBottom: '1px solid var(--rule)' }}>
        <h1 className="display" style={{ fontSize: 'var(--step-3)' }}>
          {profile.name}
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>
          {profile.role} · {profile.location}
        </p>
        <p className="resume-contact">
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>{' '}
          · {profile.phone} · {profile.github.replace('https://', '')}
        </p>
      </header>

      {/* Summary */}
      <section className="case-section">
        <h2>Summary</h2>
        <p className="case-body" style={{ fontSize: 'var(--step-0)' }}>
          {profile.intro}
        </p>
      </section>

      {/* Experience */}
      <section className="case-section">
        <h2>Experience</h2>
        <div className="timeline">
          {experience.map((job) => (
            <article className="tl-item" key={`${job.org}-${job.period}`}>
              <p className="tl-date">{job.period}</p>
              <div>
                <h3 className="tl-role">
                  {job.role} — {job.org}
                </h3>
                <p className="tl-summary" style={{ fontSize: 'var(--step--1)' }}>
                  {job.summary}
                </p>
                {job.highlights && (
                  <ul className="tl-list">
                    {job.highlights.map((h) => (
                      <li key={h} style={{ fontSize: 'var(--step--1)' }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="case-section">
        <h2>Selected work</h2>
        <div className="archive-list" style={{ borderTop: 0 }}>
          {selected.map((p) => (
            <article className="archive-item" key={p.slug} style={{ paddingBlock: '0.9rem' }}>
              <div>
                <h3 className="archive-title">{p.title}</h3>
                <p className="archive-org">{p.period}</p>
              </div>
              <p className="archive-summary" style={{ fontSize: 'var(--step--1)' }}>
                {p.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="case-section">
        <h2>Research</h2>
        <div className="archive-list" style={{ borderTop: 0 }}>
          {research.map((r) => (
            <article className="archive-item" key={r.slug} style={{ paddingBlock: '0.9rem' }}>
              <div>
                <h3 className="archive-title">{r.title}</h3>
                <p className="archive-org">{r.venue}</p>
              </div>
              <p className="archive-summary" style={{ fontSize: 'var(--step--1)' }}>
                {r.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="case-section">
        <h2>Education</h2>
        <ul className="plain-list">
          {education.map((ed) => (
            <li key={ed.degree}>
              <span>
                {ed.degree}, {ed.institution}
              </span>
              <span className="plain-meta">{ed.period}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="case-section">
        <h2>Skills</h2>
        <dl className="skill-table" style={{ borderTop: 0 }}>
          {skills.map((group) => (
            <div className="skill-row" key={group.label} style={{ paddingBlock: '0.55rem' }}>
              <dt>{group.label}</dt>
              <dd style={{ fontSize: 'var(--step--1)' }}>
                {group.items.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Awards */}
      <section className="case-section">
        <h2>Recognition</h2>
        <ul className="plain-list">
          {awards.map((a) => (
            <li key={a.label}>
              <span>{a.label}</span>
              <span className="plain-meta">{a.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
