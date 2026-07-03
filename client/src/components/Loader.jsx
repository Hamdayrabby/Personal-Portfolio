import { useState, useEffect } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);

  useEffect(() => {
    const lines = [
      '>> INITIALIZING SYSTEM FOR HRH...',
      '>> LOADING AI ENGINEER PORTFOLIO...',
      '>> CONNECTING MERN ENGINE & ML PIPELINES...',
      '>> ACCESS GRANTED. SYSTEM ONLINE.'
    ];

    let timerId;
    let index = 0;

    const addNextLine = () => {
      if (index < lines.length) {
        setTerminalLines((prev) => [...prev, lines[index]]);
        index++;
        timerId = setTimeout(addNextLine, 350);
      }
    };

    addNextLine();

    const hideTimer = setTimeout(() => setHidden(true), 2000);

    return () => {
      clearTimeout(timerId);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logo-container">
        <div className="loader-title">HAMDAY RABBY HOSSAIN</div>
        <div className="loader-subtitle">CS Graduate · AI Engineer · Developer</div>
      </div>
      
      <div className="loader-terminal">
        {terminalLines.map((line, idx) => (
          <div key={idx} className="loader-terminal-line">
            {line}
          </div>
        ))}
        {terminalLines.length < 4 && (
          <div className="loader-terminal-line active-cursor">█</div>
        )}
      </div>

      <div className="loader-bar">
        <div className="loader-bar-fill"></div>
      </div>
    </div>
  );
}
