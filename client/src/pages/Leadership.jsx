import portfolioData from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Leadership() {
  useScrollReveal();
  const { experience } = portfolioData;

  return (
    <div className="page-transition" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Leadership</h2>
            <p className="section-subtitle">Roles and responsibilities in organizations</p>
          </div>

          <div className="timeline">
            {experience.map((exp, i) => (
              <div className="timeline-item reveal" key={i}>
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-card">
                  <div className="timeline-date">{exp.date}</div>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <div className="timeline-org">
                    {exp.organization} · {exp.location}
                  </div>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
