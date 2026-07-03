import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  const { personal, services, skills, projects } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  useScrollReveal();

  // Typewriter effect
  useEffect(() => {
    const currentRole = personal.roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, personal.roles]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="hero-badge" style={{ marginBottom: 0 }}>
                <span className="badge-icon">◆</span>
                {personal.tagline}
              </div>
              <div className="hire-badge">
                <span className="pulse-dot"></span>
                Available For Hire
              </div>
            </div>
            <p className="hero-greeting">{personal.greeting}</p>
            <h1 className="hero-name">
              <span className="gradient-text">{personal.name}</span>
            </h1>
            <p className="hero-description">
              {displayText}
              <span className="typewriter-cursor"></span>
            </p>
            <p className="hero-summary">
              {personal.summary}
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary">
                Hire Me
              </Link>
              <Link to="/playground" className="btn btn-outline">
                AI/ML Playground
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                className="hero-image"
                src="/assets/profile.png"
                alt="Hamday Rabby Hossain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-modern">
            <div className="about-text-block reveal">
              <h2 className="section-title-left">About Me</h2>
              <p className="about-paragraph">{personal.about}</p>
              <div className="about-links">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  ⟨/⟩
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="social-link"
                  title="Email"
                >
                  ✉
                </a>
              </div>
            </div>

            <div className="about-stats-block reveal">
              {[
                { number: '1000+', label: 'Problems Solved' },
                { number: '5+', label: 'Projects Built' },
                { number: 'IEEE', label: 'Symposium Presenter' },
              ].map((stat, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="section section-alt" id="expertise">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What I Do</h2>
            <p className="section-subtitle">
              Building intelligent systems and scalable applications
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div className="glass-card service-card reveal" key={i}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-subtitle">
              Technologies I work with daily
            </p>
          </div>
          <div className="skills-compact reveal">
            {skills.map((group, i) => (
              <div className="skill-group" key={i}>
                <span className="skill-group-label">{group.category}</span>
                <div className="skill-tags-inline">
                  {group.items.map((item, j) => (
                    <span className="skill-tag" key={j}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section section-alt" id="featured-projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Work</h2>
            <p className="section-subtitle">
              Highlighted projects from my portfolio
            </p>
          </div>
          <div className="featured-projects-grid">
            {featuredProjects.map((project) => (
              <div className="glass-card featured-project-card reveal" key={project.id}>
                <div className="featured-badge">Featured</div>
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
                      <span className="tech-badge" key={j}>{t}</span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta reveal">
            <Link to="/projects" className="btn btn-outline">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* AI/ML Playground CTA */}
      <section className="section section-alt playground-cta-section">
        <div className="container">
          <div className="glass-card playground-cta-card reveal" style={{ padding: '3.5rem 2rem', textAlign: 'center', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-glow)' }}>
            <span className="section-label">Interactive Sandbox</span>
            <h2 className="section-title">Try the AI & ML Playground</h2>
            <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)' }}>
              Test interactive data science and generative AI integrations directly in the browser. Adjust customer metrics in real-time to analyze churn probability, or generate custom recipes with the AI Recipe Planner.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/playground" className="btn btn-primary">
                Launch Playground
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-block reveal">
            <h2 className="section-title">
              Available For Opportunities
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
              I'm actively seeking roles as an AI Engineer, Software Developer, or Full-Stack MERN Developer. Let's build something exceptional!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                Hire Me / Get In Touch
              </Link>
              <Link to="/resume" className="btn btn-outline">
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
