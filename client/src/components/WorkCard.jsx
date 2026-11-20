import { Link } from 'react-router-dom';
import ArchitectureDiagram from './ArchitectureDiagram';

/* Spec §5.1 card anatomy: visual slot with architecture diagram,
   title, one-line outcome, ≤4 tags, access label. The whole card
   links to the case study. */
function accessLabel(item) {
  if (item.visibility === 'private') {
    return 'Private codebase — walkthrough on request';
  }
  const links = item.links || [];
  const lower = links.map((l) => l.label.toLowerCase());
  if (lower.includes('live')) return 'Live site';
  if (lower.includes('github')) return 'Open source';
  return 'Public';
}

export default function WorkCard({ item, span, index }) {
  const variant = span >= 4 ? 'lg' : span >= 3 ? 'md' : 'sm';

  return (
    <Link
      to={`/projects/${item.slug}`}
      className={`work-card span-${span} variant-${variant} reveal`}
      style={{ '--reveal-delay': `${Math.min(index * 60, 240)}ms` }}
    >
      <div className="work-card-visual">
        <ArchitectureDiagram slug={item.slug} compact />
      </div>
      <div className="work-card-body">
        {item.kind === 'research' && <p className="card-type">Research</p>}
        <h3 className="work-card-title">{item.title}</h3>
        <p className="work-card-sub">{item.subtitle || item.venue}</p>
        <p className="work-card-summary">{item.summary}</p>
        <div className="card-tags">
          {item.stack.slice(0, 4).map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <p className="card-access">{accessLabel(item)}</p>
      </div>
    </Link>
  );
}
