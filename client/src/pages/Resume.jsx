import { profile, experience, education, skills, featuredOrder, projects } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

export default function Resume() {
  usePageMeta(
    'Resume — Hamday Rabby Hossain',
    'Download the resume of Hamday Rabby Hossain, AI engineer.'
  );

  const topProjects = featuredOrder
    .slice(0, 4)
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="resume-page container" style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
      {/* Action header - hidden on print */}
      <div className="resume-actions no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
            Last updated Nov 2026
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => window.print()}
            className="pixel-btn pixel-btn-ghost"
            style={{ fontSize: 'var(--step--1)' }}
          >
            Print / Save PDF
          </button>
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
            style={{ fontSize: 'var(--step--1)' }}
          >
            ↓ Download CV File
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <article className="resume-sheet" style={{ border: '1px solid var(--border)', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
        {/* Header */}
        <header className="resume-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <h1 className="display" style={{ fontSize: 'var(--step-3)', margin: 0 }}>
            {profile.name}
          </h1>
          <p style={{ color: 'var(--accent)', fontWeight: '600', marginTop: '0.35rem', fontSize: 'var(--step-1)' }}>
            {profile.role} · {profile.location}
          </p>
          <div className="resume-contact-row" style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap', fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
            <a href={`mailto:${profile.email}`} className="link">{profile.email}</a>
            <span>•</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
            <span>•</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
            <span>•</span>
            <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="link">LeetCode</a>
          </div>
          <p style={{ marginTop: '1.25rem', fontSize: 'var(--step-0)', color: 'var(--text)', lineHeight: 1.65, maxWidth: '68ch' }}>
            {profile.intro}
          </p>
        </header>

        {/* Experience */}
        <section className="resume-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'var(--step-1)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map((job) => (
              <div key={`${job.org}-${job.period}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: 'var(--step-0)', fontWeight: '700' }}>
                    {job.role} — <span style={{ color: 'var(--text-muted)' }}>{job.org}</span>
                  </h3>
                  <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>{job.period}</span>
                </div>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--text)', marginTop: '0.25rem' }}>{job.summary}</p>
                {job.highlights && (
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0, fontSize: 'var(--step--1)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {job.highlights.map((h) => (
                      <li key={h} style={{ marginBottom: '0.25rem' }}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Selected Systems */}
        <section className="resume-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'var(--step-1)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
            Selected Systems & Architecture
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {topProjects.map((p) => (
              <div key={p.slug} style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--radius)', background: 'var(--bg)' }}>
                <h3 style={{ fontSize: 'var(--step-0)', fontWeight: '700', margin: 0 }}>
                  {p.title} <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)', fontWeight: '400' }}>— {p.subtitle}</span>
                </h3>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--text)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  {p.summary}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="tag" style={{ fontSize: '0.75rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="resume-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'var(--step-1)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {education.map((edu) => (
              <div key={edu.degree}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: 'var(--step-0)', fontWeight: '700' }}>{edu.degree}</h3>
                  <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>{edu.period}</span>
                </div>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
                  {edu.institution} · {edu.location}
                </p>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--accent)', marginTop: '0.2rem' }}>
                  {edu.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="resume-section">
          <h2 style={{ fontSize: 'var(--step-1)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
            Technical Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {skills.map((grp) => (
              <div key={grp.label}>
                <h3 style={{ fontSize: 'var(--step--1)', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                  {grp.label}
                </h3>
                <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {grp.items.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
