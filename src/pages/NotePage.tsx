import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { notes } from '../content/notes';
import { ShareNoteButton } from '../components/notes/ShareNoteButton';
import { useEffect } from 'react';

export function NotePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const note = notes.find(n => n.slug === slug);

  // Detect if navigated from within the portfolio
  const fromSite = !!(location.state as { fromSite?: boolean })?.fromSite;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!note) {
    return (
      <div className="note-article" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '48px', color: 'var(--text-primary)', marginBottom: 'var(--space-md)' }}>404</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>Note not found.</p>
          <button className="case-study-link" onClick={() => navigate('/')} type="button">← Back Home</button>
        </div>
      </div>
    );
  }

  // =============================================
  // STANDALONE MODE — shared blog link, no portfolio
  // =============================================
  if (!fromSite) {
    return (
      <article className="note-standalone">
        {/* Minimal header */}
        <header className="note-standalone-header">
          <div className="note-standalone-header-inner">
            <h1 className="note-standalone-title">{note.title}</h1>
            <div className="note-article-date">{note.date}</div>
            <div className="note-article-tags">
              {note.tags.map(tag => (
                <span key={tag} className="note-article-tag">{tag}</span>
              ))}
            </div>
            <ShareNoteButton slug={note.slug} title={note.title} className="note-page-share" />
          </div>
        </header>

        {/* Article content */}
        <div
          className="note-article-content"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </article>
    );
  }

  // =============================================
  // PORTFOLIO MODE — navigated from within the site
  // =============================================
  return (
    <article className="note-article">
      <header className="note-article-header">
        <div className="note-article-header-inner">
          <button className="note-article-back" onClick={() => navigate('/')} type="button">
            ← Back to Home
          </button>
          <div className="note-article-date">{note.date}</div>
          <h1 className="note-article-title">{note.title}</h1>
          <div className="note-article-tags">
            {note.tags.map(tag => (
              <span key={tag} className="note-article-tag">{tag}</span>
            ))}
          </div>
          <ShareNoteButton slug={note.slug} title={note.title} className="note-page-share" />
        </div>
      </header>
      <div
        className="note-article-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
}
