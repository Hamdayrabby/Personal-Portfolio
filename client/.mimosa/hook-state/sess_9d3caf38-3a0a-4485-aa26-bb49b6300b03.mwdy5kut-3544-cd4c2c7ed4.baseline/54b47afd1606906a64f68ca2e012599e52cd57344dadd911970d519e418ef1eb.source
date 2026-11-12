import { Link } from 'react-router-dom';

/**
 * A single row in a work list. The whole row is the link, so the target
 * area is the full width rather than a small word.
 */
export default function WorkRow({ item, meta }) {
  const isPrivate = item.visibility === 'private';

  return (
    <Link to={`/work/${item.slug}`} className="work-row reveal">
      <div>
        <h3 className="work-row-title">
          {item.title}{' '}
          <span className="row-arrow" aria-hidden="true">
            →
          </span>
        </h3>
        <p className="work-row-sub">{item.subtitle || item.venue}</p>
      </div>
      <div>
        <p className="work-row-summary">{item.summary}</p>
        <div className="work-row-meta">
          {meta.map((part, i) => (
            <span key={`${part}-${i}`}>
              {i > 0 && <span aria-hidden="true" style={{ marginRight: '1rem' }}>·</span>}
              {part}
            </span>
          ))}
          {isPrivate && (
            <span className="badge-private">Private codebase</span>
          )}
        </div>
      </div>
    </Link>
  );
}
