import { useEffect } from 'react';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets a unique document.title and meta description per route.
 * Call once per page component, unconditionally, before any early return.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta('name', 'description', description);
  }, [title, description]);
}
