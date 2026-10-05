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
          <div className="case-study-year">{project.year}</div>
        </div>
      </header>

      {/* Body */}
      <div className="case-study-body">
        {/* Problem & Objective */}
        <section className="case-study-section">
          <div className="case-study-section-label">01 — The Problem & Objective</div>
          <p>{project.problem}</p>
          <p><strong>Objective:</strong> {project.objective}</p>
        </section>

        {/* Role & Process */}
        <section className="case-study-section">
          <div className="case-study-section-label">02 — My Role & Process</div>
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
          <div className="case-study-section-label">03 — Tools & Tech Stack</div>
          <div className="tools-grid">
            {project.tools.map(tool => (
              <span className="tool-tag" key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        {/* Visuals & Demos */}
        {(project.visuals.length > 0 || project.demoUrl || project.githubUrl) && (
          <section className="case-study-section">
            <div className="case-study-section-label">04 — Visuals & Demos</div>
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
            {(project.demoUrl || project.githubUrl) && (
              <div className="case-study-links">
                {project.demoUrl && (
                  <a className="case-study-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    🌐 Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a className="case-study-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    ⌘ View Source
                  </a>
                )}
              </div>
            )}
          </section>
        )}

        {/* Results & Impact */}
        <section className="case-study-section">
          <div className="case-study-section-label">05 — Results & Impact</div>
          <ul className="results-list">
            {project.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Lessons */}
        <section className="case-study-section">
          <div className="case-study-section-label">Lessons Learned</div>
          <ul className="lessons-list">
            {project.lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
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
