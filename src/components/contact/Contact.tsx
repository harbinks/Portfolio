import { useState, useCallback } from 'react';
import { siteConfig } from '../../content/siteConfig';

export function Contact() {
  const [showToast, setShowToast] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch {
      window.location.href = siteConfig.links.email;
    }
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="section-inner">
        <div className="section-label">Get in Touch</div>
        <h2 className="section-title">Contact</h2>
        <p className="contact-description">
          Have a project in mind, want to collaborate, or just want to say hi?
          I'd love to hear from you.
        </p>
        <div className="contact-links">
          <button className="contact-link-btn" onClick={copyEmail} type="button">
            <span className="btn-icon">✉</span> Copy Email
          </button>
          <a className="contact-link-btn" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            <span className="btn-icon">⌘</span> GitHub
          </a>
          <a className="contact-link-btn" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="btn-icon">◆</span> LinkedIn
          </a>
        </div>
      </div>
      <div className={`copy-toast ${showToast ? 'visible' : ''}`} role="status">
        ✓ Email copied to clipboard
      </div>
    </section>
  );
}
