import { useState, useEffect, useCallback } from 'react';
import { projects } from '../../content/projects';
import { notes } from '../../content/notes';
import { about } from '../../content/about';
import { siteConfig } from '../../content/siteConfig';
import { CoffeeGame } from '../games/CoffeeGame';

interface ViewState {
  type: 'home' | 'files' | 'projects' | 'project-detail' | 'blogs' | 'blog-detail' | 'about' | 'contact' | 'resume' | 'coffee-game';
  slug?: string;
}

export function RetroComputer() {
  const [viewStack, setViewStack] = useState<ViewState[]>([{ type: 'home' }]);
  const [clock, setClock] = useState('');

  const currentView = viewStack[viewStack.length - 1];
  const canGoBack = viewStack.length > 1;

  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const pushView = useCallback((view: ViewState) => {
    setViewStack(prev => [...prev, view]);
  }, []);

  const popView = useCallback(() => {
    setViewStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const goHome = useCallback(() => {
    setViewStack([{ type: 'home' }]);
  }, []);

  // Get the window title for current view
  const getWindowTitle = (): string => {
    switch (currentView.type) {
      case 'home': return 'Harbin_OS Desktop';
      case 'files': return '📁 Files';
      case 'projects': return '📁 Files › Projects';
      case 'project-detail': {
        const p = projects.find(p => p.slug === currentView.slug);
        return `📄 ${p?.title || 'Project'}`;
      }
      case 'blogs': return '📁 Files › Blogs';
      case 'blog-detail': {
        const n = notes.find(n => n.slug === currentView.slug);
        return `📄 ${n?.title || 'Blog'}`;
      }
      case 'about': return '🖥️ About This Mac';
      case 'contact': return '📬 Contact';
      case 'resume': return '📄 Harbin-K-S-Resume.pdf';
      case 'coffee-game': return '☕ Catch the Coffee';
      default: return 'Harbin_OS';
    }
  };

  const renderBackBar = () => {
    if (!canGoBack) return null;
    return (
      <div className="screen-back-bar">
        <button className="screen-back-btn" onClick={popView}>
          ← Back
        </button>
        <span className="screen-breadcrumb">{getWindowTitle()}</span>
      </div>
    );
  };

  const renderScreen = () => {
    switch (currentView.type) {
      case 'home':
        return (
          <div className="screen-view">
            <div className="desktop-icons">
              <button className="desktop-icon" onClick={() => pushView({ type: 'files' })}>
                <span className="icon-graphic">📁</span>
                <span className="icon-label">Files</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'about' })}>
                <span className="icon-graphic">👤</span>
                <span className="icon-label">About Me</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'contact' })}>
                <span className="icon-graphic">📬</span>
                <span className="icon-label">Contact</span>
              </button>
              <button className="desktop-icon" onClick={() => window.open(siteConfig.links.github, '_blank')}>
                <span className="icon-graphic">🌐</span>
                <span className="icon-label">GitHub</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'resume' })}>
                <span className="icon-graphic">📄</span>
                <span className="icon-label">Resume.pdf</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'coffee-game' })}>
                <span className="icon-graphic">☕</span>
                <span className="icon-label">Catch the Coffee</span>
              </button>
            </div>
          </div>
        );

      case 'files':
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="desktop-icons">
              <button className="desktop-icon" onClick={() => pushView({ type: 'projects' })}>
                <span className="icon-graphic">📂</span>
                <span className="icon-label">Projects</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'blogs' })}>
                <span className="icon-graphic">📂</span>
                <span className="icon-label">Blogs</span>
              </button>
              <button className="desktop-icon" onClick={() => pushView({ type: 'resume' })}>
                <span className="icon-graphic">📄</span>
                <span className="icon-label">Resume.pdf</span>
              </button>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="screen-file-list">
              {projects.map(p => (
                <button
                  key={p.slug}
                  className="screen-file-item"
                  onClick={() => pushView({ type: 'project-detail', slug: p.slug })}
                >
                  <span className="file-icon">💾</span>
                  <div className="file-info">
                    <div className="file-name">{p.title}</div>
                    <div className="file-meta">{p.category} · {p.year}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'project-detail': {
        const project = projects.find(p => p.slug === currentView.slug);
        if (!project) return <div className="screen-view">{renderBackBar()}<p>Project not found.</p></div>;
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="screen-detail-view">
              <div className="detail-category">{project.category} · {project.year}</div>
              <h3 className="detail-title">{project.title}</h3>

              <div className="detail-section">
                <div className="detail-label">Problem</div>
                <p>{project.problem}</p>
              </div>

              <div className="detail-section">
                <div className="detail-label">Role & Process</div>
                <p>{project.role}</p>
                <ul className="detail-steps">
                  {project.process.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <div className="detail-label">Tech Stack</div>
                <div className="detail-tags">
                  {project.tools.map(t => (
                    <span key={t} className="detail-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-label">Results</div>
                <ul className="detail-results">
                  {project.results.map((r, i) => (
                    <li key={i}>→ {r}</li>
                  ))}
                </ul>
              </div>

              {project.lessons.length > 0 && (
                <div className="detail-section">
                  <div className="detail-label">Lessons</div>
                  <ul className="detail-results">
                    {project.lessons.map((l, i) => (
                      <li key={i}>✦ {l}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(project.githubUrl || project.demoUrl) && (
                <div className="detail-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="detail-link-btn">
                      ⌘ Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="detail-link-btn">
                      🌐 Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'blogs':
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="screen-file-list">
              {notes.map(n => (
                <button
                  key={n.slug}
                  className="screen-file-item"
                  onClick={() => pushView({ type: 'blog-detail', slug: n.slug })}
                >
                  <span className="file-icon">📝</span>
                  <div className="file-info">
                    <div className="file-name">{n.title}</div>
                    <div className="file-meta">{n.date} · {n.tags.slice(0, 2).join(', ')}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'blog-detail': {
        const note = notes.find(n => n.slug === currentView.slug);
        if (!note) return <div className="screen-view">{renderBackBar()}<p>Note not found.</p></div>;
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="screen-detail-view">
              <div className="detail-category">{note.date}</div>
              <h3 className="detail-title">{note.title}</h3>
              <div className="detail-tags" style={{ marginBottom: '12px' }}>
                {note.tags.map(t => (
                  <span key={t} className="detail-tag">{t}</span>
                ))}
              </div>
              <div
                className="detail-blog-content"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </div>
          </div>
        );
      }

      case 'about':
        return (
          <div className="screen-view about-mac-dialog">
            {renderBackBar()}
            <h3>About This Mac</h3>
            {Object.entries(about.systemSpecs).map(([key, value]) => (
              <div className="spec-row" key={key}>
                <span className="spec-label">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="screen-view screen-contact">
            {renderBackBar()}
            <h3>Contact</h3>
            <a className="contact-link-row" href={siteConfig.links.github} target="_blank" rel="noopener">
              <span className="link-icon">⌘</span> GitHub
            </a>
            <a className="contact-link-row" href={siteConfig.links.linkedin} target="_blank" rel="noopener">
              <span className="link-icon">◆</span> LinkedIn
            </a>
            <a className="contact-link-row" href={siteConfig.links.email}>
              <span className="link-icon">✉</span> Email
            </a>
          </div>
        );

      case 'resume':
        return (
          <div className="screen-view">
            {renderBackBar()}
            <div className="screen-resume-preview">
              <div className="resume-icon-large">📄</div>
              <div className="resume-filename">Harbin-K-S-Resume.pdf</div>
              <div className="resume-meta">PDF Document · Updated 2026</div>
              <div className="resume-actions">
                <a
                  className="detail-link-btn resume-download-btn"
                  href="/resume.pdf"
                  download="Harbin-K-S-Resume.pdf"
                >
                  ↓ Download Resume
                </a>
                <a
                  className="detail-link-btn"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener"
                >
                  ⤢ Open in Browser
                </a>
              </div>
            </div>
          </div>
        );

      case 'coffee-game':
        return <CoffeeGame onClose={popView} />;
    }
  };

  return (
    <div className="retro-computer">
      <div className="computer-monitor">
        <div className="computer-bezel">
          <div className="computer-screen">
            {/* Menu Bar */}
            <div className="screen-menu-bar">
              <span className="menu-item apple-menu" onClick={goHome}>⌘</span>
              <span className="menu-item" onClick={() => pushView({ type: 'files' })}>File</span>
              <span className="menu-item" onClick={() => pushView({ type: 'about' })}>Edit</span>
              <span className="menu-item" onClick={() => pushView({ type: 'blogs' })}>View</span>
              <span className="menu-item" onClick={() => pushView({ type: 'contact' })}>Special</span>
              <span className="menu-spacer" />
              <span className="menu-clock">{clock}</span>
            </div>
            {/* Screen Content */}
            <div className="screen-content">
              {renderScreen()}
            </div>
          </div>
        </div>
        <div className="computer-badge">Harbin_OS</div>
      </div>

      {/* Keyboard */}
      <div className="computer-keyboard">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={`key${i === 6 ? ' spacebar' : ''}${i === 3 || i === 10 ? ' accent-key' : ''}`}
          />
        ))}
      </div>

      {/* Stand */}
      <div className="computer-stand" />
    </div>
  );
}
