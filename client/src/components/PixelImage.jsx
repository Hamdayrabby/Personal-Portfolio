import { useState } from 'react';

/**
 * Image with a retro placeholder: three blinking pixel blocks occupy the
 * image's reserved box until the image has actually loaded, then the
 * image steps in (chunky opacity, no smooth fade). `eager` for
 * above-the-fold images, lazy for everything else.
 */
export default function PixelImage({ src, alt, width, height, eager = false }) {
  const [loaded, setLoaded] = useState(false);

  const attachRef = (el) => {
    // Cached images can finish before React attaches onLoad — catch that.
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  };

  return (
    <span className={`pixel-image${loaded ? ' is-loaded' : ''}`}>
      <span className="pixel-image-loading" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <img
        ref={attachRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
