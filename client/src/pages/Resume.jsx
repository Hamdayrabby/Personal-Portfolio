import portfolioData from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Resume() {
  useScrollReveal();
  const {
    personal,
    research,
    certifications,
    competitiveProgramming,
  } = portfolioData;

  return (
    <div className="page-transition" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Resume</h2>
            <p className="section-subtitle">{personal.subtitle}</p>
            <a
              href={personal.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-download-btn"
              style={{ marginTop: '1.5rem' }}
            >
              ↓ Download Resume
            </a>
          </div>

          {/* Academic Research */}
          <div className="resume-section-title reveal">Thesis & Research</div>
          <div className="achievements-list">
            {research.map((item, i) => (
              <div className="glass-card achievement-item reveal" key={i}>
                <span className="icon">📄</span>
                <div style={{ flex: 1 }}>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {item.type} — <strong style={{ color: 'var(--accent-purple)' }}>{item.venue}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Competitive Programming */}
          <div className="resume-section-title reveal">Competitive Programming</div>
          <div className="achievements-list">
            {competitiveProgramming.map((item, i) => (
              <div className="glass-card achievement-item reveal" key={i}>
                <span className="icon" style={{ color: item.highlight ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                  {item.highlight ? '🏆' : '🏅'}
                </span>
                <p>
                  <strong style={{ color: item.highlight ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {item.event}
                  </strong>
                  {item.years && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {' '}({item.years})
                    </span>
                  )}
                  {item.place && (
                    <span className="place-badge">
                      {item.place}
                    </span>
                  )}
                </p>
              </div>
            ))}
            <div className="glass-card achievement-item reveal" style={{
              background: 'rgba(0, 240, 255, 0.03)',
              borderColor: 'rgba(0, 240, 255, 0.2)',
            }}>
              <span className="icon" style={{ fontSize: '1.3rem' }}>💻</span>
              <p>
                <strong style={{ color: 'var(--accent-cyan)' }}>
                  1000+ algorithmic problems solved
                </strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {' '}across Codeforces, CodeChef, and LeetCode
                </span>
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="resume-section-title reveal">Certifications</div>
          <div className="cert-grid">
            {certifications.map((cert, i) => (
              <div className="glass-card cert-item reveal" key={i}>
                <span className="icon">🎓</span>
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
