import { useNavigate } from 'react-router-dom';
import type { Note } from '../../content/notes';
import { ShareNoteButton } from './ShareNoteButton';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="note-card"
      onClick={() => navigate(`/notes/${note.slug}`, { state: { fromSite: true } })}
      role="link"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/notes/${note.slug}`, { state: { fromSite: true } })}
      aria-label={`Read note: ${note.title}`}
    >
      <div className="note-card-date">{note.date}</div>
      <h3 className="note-card-title">{note.title}</h3>
      <p className="note-card-excerpt">{note.excerpt}</p>
      <div className="note-card-tags">
        {note.tags.map(tag => (
          <span key={tag} className="note-tag">{tag}</span>
        ))}
      </div>
      <ShareNoteButton slug={note.slug} title={note.title} className="note-card-share" />
    </article>
  );
}
