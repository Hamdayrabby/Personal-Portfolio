import portfolioData from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Education() {
  useScrollReveal();
  const { education } = portfolioData;

  return (
    <div className="page-transition" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">Academic background and qualifications</p>
          </div>

          <div className="timeline">
            {education.map((edu, i) => (
              <div className="timeline-item reveal" key={i}>
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-card">
                  <div className="timeline-date">{edu.date}</div>
                  <h3 className="timeline-title">
                    {edu.degree} in {edu.field}
                  </h3>
                  <div className="timeline-org">
                    {edu.institution} · {edu.location}
                  </div>
                  <p className="timeline-desc" style={{ marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>
                      {edu.degree === 'BSc (Engineering)' ? 'CGPA' : 'GPA'}: {edu.cgpa}
                    </strong>
                  </p>
                  <p className="timeline-desc">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
