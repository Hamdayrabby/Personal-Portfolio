import { Link } from 'react-router-dom';

/**
 * One card in the Selected-work grid. `span` is the column count on the
 * 6-column desktop grid and drives the content variant: 4 = large
 * (summary + tags), 3 = medium (summary), 2 = small. The visual area is
 * a neutral placeholder until the architecture diagrams (phase 4, T19+).
 */
export default function WorkCard({ item, span, index }) {
  const variant = span >= 4 ? 'lg' : span >= 3 ? 'md' : 'sm';

  return (
    <Link
      to={`/projects/${item.slug}`}
      className={`work-card span-${span} variant-${variant} reveal`}
      style={{ '--reveal-delay': `${Math.min(index * 60, 240)}ms` }}
    >
      <div className="work-card-visual" aria-hidden="true" />
      <div className="work-card-body">
        {item.kind === 'research' && <p className="card-type">Research</p>}
        <h3 className="work-card-title">{item.title}</h3>
        <p className="work-card-sub">{item.subtitle || item.venue}</p>
        <p className="work-card-summary">{item.summary}</p>
        {item.visibility === 'private' && <p className="card-private">Private codebase</p>}
        {variant === 'lg' && (
          <div className="card-tags">
            {item.stack.slice(0, 6).map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
