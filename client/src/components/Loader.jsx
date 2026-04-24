import { useState, useEffect } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-text">PORTFOLIO</div>
      <div className="loader-bar">
        <div className="loader-bar-fill"></div>
      </div>
    </div>
  );
}
