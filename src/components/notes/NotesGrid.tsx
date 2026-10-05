import { notes } from '../../content/notes';
import { NoteCard } from './NoteCard';

export function NotesGrid() {
  return (
    <section className="notes-section" id="notes">
      <div className="section-inner">
        <div className="section-label">Writing</div>
        <h2 className="section-title">Notes</h2>
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
