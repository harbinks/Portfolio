import { about } from '../../content/about';

export function AboutSection() {
  return (
    <section className="projects-section" id="about" style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-label">Who I Am</div>
        <h2 className="section-title">About</h2>

        {/* Punchy lead */}
        <p style={{
          fontSize: '18px',
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-lg)',
          fontWeight: 500,
        }}>
          AI/ML engineer with hands-on experience building RAG pipelines, churn prediction models, computer vision systems, and data-driven dashboards. I also co-founded a 400+ member edtech community from scratch. Looking for AI/ML engineering and data science roles where I can build and ship.
        </p>

        {/* Key highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
        }}>
          {[
            { icon: '🧠', label: 'B.Tech AI/ML', detail: 'Srinivas University — CGPA 7.0/10' },
            { icon: '🚀', label: 'Co-Founded @interviewkit', detail: '400+ members, zero budget' },
            { icon: '🔬', label: '2 ML Internships', detail: 'SMEC Labs & Wayeva Technologies' },
            { icon: '📜', label: 'Certified', detail: 'IBM Deep Learning + AWS Cloud' },
          ].map(h => (
            <div key={h.label} style={{
              padding: 'var(--space-md)',
              border: '1px solid var(--border-retro)',
              boxShadow: 'var(--shadow-retro-sm)',
              background: 'var(--bg-card)',
            }}>
              <div style={{ fontSize: '24px', marginBottom: 'var(--space-xs)' }}>{h.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px' }}>{h.label}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{h.detail}</div>
            </div>
          ))}
        </div>

        {/* Bio paragraphs */}
        {about.bio.slice(1).map((paragraph, i) => (
          <p key={i} style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-md)',
          }}>
            {paragraph}
          </p>
        ))}

        {/* Skills grid */}
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            marginBottom: 'var(--space-lg)',
            paddingBottom: 'var(--space-sm)',
            borderBottom: '1px solid var(--border-light)',
          }}>Skills & Tools</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'var(--space-lg)',
          }}>
            {about.skills.map(group => (
              <div key={group.category}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-sm)',
                  fontFamily: 'var(--font-mono)',
                }}>{group.category}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
                  {group.items.map(item => (
                    <span key={item} className="tool-tag" style={{ fontSize: '12px', padding: '2px 8px' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <div style={{
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-lg)',
          background: 'var(--bg-terminal)',
          border: '1px solid #2a2820',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: 'var(--space-md)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-terminal)', marginBottom: '4px' }}>
              Open to AI/ML engineer roles & collaborations
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-terminal-dim)' }}>
              Based in Kerala, India · Available for remote & relocation
            </div>
          </div>
          <a className="btn-resume" href="/resume.pdf" target="_blank" rel="noopener">
            ↓ Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
