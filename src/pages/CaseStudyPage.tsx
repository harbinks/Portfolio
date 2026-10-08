import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { useEffect } from 'react';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="case-study" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '48px', color: 'var(--text-primary)', marginBottom: 'var(--space-md)' }}>404</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>Project not found.</p>
          <button className="case-study-link" onClick={() => navigate('/')} type="button">← Back Home</button>
        </div>
      </div>
    );
  }

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <article className="case-study">
      {/* Header */}
      <header className="case-study-header">
        <div className="case-study-header-inner">
          <button className="case-study-back" onClick={() => navigate('/')} type="button">
            ← Back to Home
          </button>
          <div className="case-study-category">{project.category}</div>
          <h1 className="case-study-title">{project.title}</h1>
          {project.tagline && <p className="case-study-tagline">{project.tagline}</p>}
          <div className="case-study-year">{project.year}</div>

          {/* Action Links */}
          <div className="case-study-header-links">
            {project.demoUrl && (
              <a className="case-study-btn-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                🌐 Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a className="case-study-btn-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                ⌘ GitHub
              </a>
            )}
            {project.apiDocsUrl && (
              <a className="case-study-btn-secondary" href={project.apiDocsUrl} target="_blank" rel="noopener noreferrer">
                📄 API Docs
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="case-study-body">
        {/* Project Hero Cover Image */}
        {project.coverImage && (
          <div className="case-study-hero-cover">
            <img
              src={project.coverImage}
              alt={`${project.title} Cover`}
              className="case-study-hero-img"
              width={1200}
              height={630}
            />
          </div>
        )}

        {/* Project Highlights / Stats if provided */}
        {project.stats && project.stats.length > 0 && (
          <div className="case-study-stats-bar">
            {project.stats.map((s, idx) => (
              <div className="case-study-stat-item" key={idx}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Problem & Objective */}
        <section className="case-study-section">
          <div className="case-study-section-label">01 — The Problem & Objective</div>
          <h3>"Weather" Isn't an Answer</h3>
          <p>{project.problem}</p>
          <p><strong>Objective:</strong> {project.objective}</p>
        </section>

        {/* Custom In-Depth Sections (02 Idea, 03 Architecture, 04 Data Layer, 05 Database, 06 Reasoning, 07 UA415, 08 Investigation, 09 AI Analyst, 10 Performance, 11 Going Live, 12 Dashboard, 13 Deployment, 14 What Broke, 15 Next) */}
        {project.customSections && project.customSections.length > 0 && (
          <>
            {project.customSections.map((sec, idx) => (
              <section className="case-study-section" key={idx}>
                <div className="case-study-section-label">{sec.heading}</div>
                {sec.subheading && <h3>{sec.subheading}</h3>}
                <div
                  className="case-study-custom-content"
                  dangerouslySetInnerHTML={{ __html: sec.content }}
                />
              </section>
            ))}
          </>
        )}

        {/* Role & Process */}
        <section className="case-study-section">
          <div className="case-study-section-label">Engineering Process</div>
          <p>{project.role}</p>
          <div className="process-steps">
            {project.process.map((step, i) => (
              <div className="process-step" key={i}>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Tech Stack */}
        <section className="case-study-section">
          <div className="case-study-section-label">Tools & Tech Stack</div>
          <div className="tools-grid">
            {project.tools.map(tool => (
              <span className="tool-tag" key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        {/* Visuals & Demos (for projects without inline custom visuals) */}
        {(!project.customSections || project.customSections.length === 0) && (project.visuals.length > 0 || project.demoUrl || project.githubUrl) && (
          <section className="case-study-section">
            <div className="case-study-section-label">Visuals & Demos</div>
            {project.visuals.length > 0 && (
              <div className="visuals-gallery">
                {project.visuals.map((v, i) => (
                  <figure className="visual-item" key={i}>
                    <img
                      src={v.src}
                      alt={v.alt}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={450}
                    />
                    {v.caption && <figcaption className="visual-caption">{v.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Final CTA / Outbound Links */}
        <section className="case-study-section case-study-cta-section">
          <div className="case-study-cta-box">
            <h3>{project.title}</h3>
            {project.tagline && <p>{project.tagline}</p>}
            <div className="case-study-cta-links">
              {project.demoUrl && (
                <a className="case-study-btn-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  🌐 Try Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a className="case-study-btn-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  ⌘ View Source
                </a>
              )}
              {project.apiDocsUrl && (
                <a className="case-study-btn-secondary" href={project.apiDocsUrl} target="_blank" rel="noopener noreferrer">
                  📄 View API Docs
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Prev/Next */}
        <nav className="case-study-nav" aria-label="Project navigation">
          {prev ? (
            <Link to={`/project/${prev.slug}`} className="case-study-nav-link prev">
              <span className="nav-direction">← Previous</span>
              <span className="nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/project/${next.slug}`} className="case-study-nav-link next">
              <span className="nav-direction">Next →</span>
              <span className="nav-title">{next.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </article>
  );
}
