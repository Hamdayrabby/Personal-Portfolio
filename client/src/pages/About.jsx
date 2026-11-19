import { Link } from 'react-router-dom';
import {
  profile,
  education,
  awards,
  certifications,
  experience,
  leadership,
  research,
} from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

export default function About() {
  usePageMeta(
    'About — Hamday Rabby Hossain',
    'How Hamday builds production AI systems: experience, education, research, and recognition.'
  );

  return (
    <div>
      {/* 1. Intro */}
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="lede" style={{ marginTop: '1.25rem', maxWidth: '20ch' }}>
            How I got here, and what I actually care about.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hero-body" style={{ borderTop: '1px solid var(--border)' }}>
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
                href={profile.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link"
              >
                Codeforces <span className="arrow">↗</span>
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

      {/* 2. Experience */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((job) => (
              <article
                className="tl-item"
                key={`${job.org}-${job.period}`}
              >
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
                    <p className="tl-products" style={{ marginTop: '0.75rem', fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
                      Products: {job.products.join(' · ')}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Education */}
      <section className="section" id="education">
        <div className="container">
          <div className="section-head">
            <h2>Education</h2>
          </div>
          <div className="timeline">
            {education.map((edu) => (
              <article className="tl-item" key={edu.degree}>
                <p className="tl-date">{edu.period}</p>
                <div>
                  <h3 className="tl-role">{edu.degree}</h3>
                  <p className="tl-org">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="tl-summary" style={{ fontWeight: '500', color: 'var(--text)' }}>
                    {edu.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Research and publications */}
      <section className="section" id="research">
        <div className="container">
          <div className="section-head">
            <h2>Research & Publications</h2>
            <span className="count">{research.length} entries</span>
          </div>
          <div className="timeline">
            {research.map((item) => (
              <article className="tl-item" key={item.slug}>
                <p className="tl-date">{item.venue.split('·')[1]?.trim() || item.role}</p>
                <div>
                  <h3 className="tl-role">
                    <Link to={`/projects/${item.slug}`} className="link">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="tl-org">{item.venue}</p>
                  <p className="tl-summary">{item.summary}</p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to={`/projects/${item.slug}`} className="arrow-link" style={{ fontSize: 'var(--step--1)' }}>
                      Read case study <span className="arrow">→</span>
                    </Link>
                    {item.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="arrow-link"
                        style={{ fontSize: 'var(--step--1)' }}
                      >
                        {link.label} <span className="arrow">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Recognition */}
      <section className="section" id="recognition">
        <div className="container">
          <div className="section-head">
            <h2>Recognition</h2>
          </div>
          <ul className="plain-list">
            {awards.map((award) => (
              <li key={award.title}>
                <span className="plain-title">{award.title}</span>
                <span className="plain-meta">
                  {award.org} · {award.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Leadership */}
      <section className="section" id="leadership">
        <div className="container">
          <div className="section-head">
            <h2>Leadership</h2>
          </div>
          <ul className="plain-list">
            {leadership.map((item) => (
              <li key={item.role}>
                <span className="plain-title">{item.role}</span>
                <span className="plain-meta">
                  {item.org} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Certifications */}
      <section className="section" id="certifications">
        <div className="container">
          <div className="section-head">
            <h2>Certifications</h2>
          </div>
          <ul className="plain-list">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <span className="plain-title">{cert.name}</span>
                <span className="plain-meta">
                  {cert.issuer} · {cert.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
