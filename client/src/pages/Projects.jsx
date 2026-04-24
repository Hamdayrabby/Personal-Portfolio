import { useState } from 'react';
import portfolioData from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('all');
  useScrollReveal([filter]);

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.type === filter);

  return (
    <div className="page-transition" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              Full-stack applications and ML projects I've built
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="projects-filter">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'software', label: 'Software Engineering' },
              { key: 'ml', label: 'ML & AI' },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filtered.map((project) => (
              <div
                className={`glass-card project-card reveal ${project.featured ? 'project-card-featured' : ''}`}
                key={project.id}
              >
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                {/* Colored header bar */}
                <div
                  className="project-accent-bar"
                  style={{
                    background:
                      project.type === 'ml'
                        ? 'var(--gradient-secondary)'
                        : 'var(--gradient-primary)',
                  }}
                />

                <div className="project-content">
                  <div className="project-type">
                    {project.type === 'ml' ? '◆ ML & AI' : '◆ Software Engineering'}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.subtitle}</p>

                  <ul className="project-features">
                    {project.features.map((feat, j) => (
                      <li key={j}>{feat}</li>
                    ))}
                  </ul>

                  <div className="project-tech">
                    {project.tech.map((t, j) => (
                      <span className="tech-badge" key={j}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        ◉ Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        ⟨/⟩ GitHub
                      </a>
                    )}
                    {project.kaggleUrl && (
                      <a
                        href={project.kaggleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        📊 Kaggle
                      </a>
                    )}
                    {project.writeupUrl && (
                      <a
                        href={project.writeupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        📝 Write-up
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
