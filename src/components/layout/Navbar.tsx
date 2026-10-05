import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_SECTIONS = ['projects', 'about', 'notes', 'contact'];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.3);

      // Determine active section
      let current = '';
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollToOrNavigate = useCallback((id: string) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  }, [isHome, navigate]);

  return (
    <nav className={`navbar ${visible ? 'visible' : ''}`} aria-label="Main navigation">
      <div className="navbar-inner">
        <a
          className="navbar-logo"
          href="/"
          onClick={e => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          Harbin K S
        </a>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollToOrNavigate('projects'); }}
          >Projects</a>
          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollToOrNavigate('about'); }}
          >About</a>
          <a
            href="#notes"
            className={activeSection === 'notes' ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollToOrNavigate('notes'); }}
          >Notes</a>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollToOrNavigate('contact'); }}
          >Contact</a>
          <a className="btn-resume" href="/resume.pdf" target="_blank" rel="noopener">↓ Resume</a>
        </div>
      </div>
    </nav>
  );
}
