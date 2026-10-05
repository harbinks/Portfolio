import { useState, useRef, useEffect, useCallback } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { siteConfig } from '../../content/siteConfig';

interface TerminalProps {
  scrollToSection?: (id: string) => void;
}

export function Terminal({ scrollToSection }: TerminalProps) {
  const reducedMotion = useReducedMotion();
  const { history, executeCommand, navigateHistory } = useTerminal(scrollToSection);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { displayedText: introText } = useTypewriter(
    `HARBIN_OS v2.6 — Personal Workspace`,
    { speed: 40, enabled: !reducedMotion, delay: 300 }
  );

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  }, [input, executeCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setInput(navigateHistory('up'));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setInput(navigateHistory('down'));
    }
  }, [navigateHistory]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <section className="terminal-section" id="terminal" onClick={focusInput}>
      <div className="terminal-header">
        <div style={{ flex: 1 }}></div>
        <div className="terminal-meta">
          <div className="time">{timeStr}</div>
          <div className="location">{siteConfig.location}</div>
        </div>
      </div>

      <div className="terminal-body">
        <div className="terminal-intro">
          <h1>
            <span className="pixel-font">{introText}</span>
            {!reducedMotion && <span className="terminal-cursor" aria-hidden="true" />}
          </h1>
          <div className="terminal-role">
            <span>AI/ML Engineer</span>
            <span className="separator">|</span>
            <span>RAG & LLM Apps</span>
            <span className="separator">|</span>
            <span>Data Pipelines</span>
          </div>
          <p className="subtitle">{siteConfig.bio}</p>
          <p className="terminal-open-to">
            Open to AI/ML engineer roles, data science positions, and collaborations.
          </p>
        </div>

        <div className="terminal-prompt-area">
          <div className="terminal-prompt-title">Terminal</div>
          <div className="terminal-history" aria-live="polite">
            {history.map((line, i) => (
              <div key={i} className={`terminal-line ${line.type}`}>
                {line.content}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="terminal-input-row">
              <span className="terminal-prompt-symbol">❯</span>
              <input
                ref={inputRef}
                className="terminal-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type "help" for commands...'
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
          <div className="terminal-actions">
            <button className="terminal-btn" onClick={() => executeCommand('help')}
              type="button">Help</button>
            <button className="terminal-btn" onClick={() => executeCommand('about')}
              type="button">About</button>
          </div>
        </div>

        <nav className="terminal-nav" aria-label="Terminal navigation">
          <a href="#desktop" onClick={e => { e.preventDefault(); scrollToSection?.('desktop'); }}>Projects</a>
          <a href="#about" onClick={e => { e.preventDefault(); scrollToSection?.('about'); }}>About</a>
          <a href="#notes" onClick={e => { e.preventDefault(); scrollToSection?.('notes'); }}>Notes</a>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollToSection?.('contact'); }}>Contact</a>
          <a className="btn-resume" href="/resume.pdf" target="_blank" rel="noopener">↓ Resume</a>
        </nav>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow" aria-hidden="true" />
      </div>
    </section>
  );
}
