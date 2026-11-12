import { Link } from 'react-router-dom';
import {
  profile,
  education,
  awards,
  certifications,
  experience,
} from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  useScrollReveal();

  return (
    <div>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <p className="eyebrow">About</p>
          <h1 className="lede" style={{ marginTop: '1.25rem', maxWidth: '16ch' }}>
            How I got here, and what I actually care about.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hero-body" style={{ borderTop: '1px solid var(--rule)' }}>
            <div className="prose">
              {profile.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="hero-links">
              <a href={`mailto:${profile.email}`} className="arrow-link">
                Email <span className="arrow">→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link"
              >
                GitHub <span className="arrow">↗</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link"
              >
                LinkedIn <span className="arrow">↗</span>
              </a>
              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link"
              >
                LeetCode <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((job) => (
              <article className="tl-item reveal" key={`${job.org}-${job.period}`}>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Education</h2>
          </div>
          <div className="timeline">
            {education.map((ed) => (
              <article className="tl-item" key={ed.degree}>
                <p className="tl-date">{ed.period}</p>
                <div>
                  <h3 className="tl-role">{ed.degree}</h3>
                  <p className="tl-org">
                    {ed.institution} · {ed.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Selected recognition</h2>
          </div>
          <ul className="plain-list">
            {awards.map((a) => (
              <li key={a.label}>
                <span>{a.label}</span>
                <span className="plain-meta">{a.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Certifications</h2>
          </div>
          <ul className="plain-list">
            {certifications.map((c) => (
              <li key={c.name}>
                <span>
                  {c.name} — {c.issuer}
                </span>
                <span className="plain-meta">{c.year}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '2rem' }}>
            <Link to="/resume" className="arrow-link">
              Full resume <span className="arrow">→</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
