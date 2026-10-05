import { RetroComputer } from './RetroComputer';
import { siteConfig } from '../../content/siteConfig';
import { PixelArt } from './PixelArt';

export function DesktopSection() {
  return (
    <section className="desktop-section" id="desktop">
      <div className="desktop-wrapper">
        <div className="workspace-container">
          {/* Desktop sticky notes (hidden on mobile) */}
          <div className="sticky-notes-desktop">
            {siteConfig.stickyNotes.map((note, i) => (
              <div
                key={i}
                className={`sticky-note ${note.color} sticky-pos-${i + 1}`}
                style={{ transform: `rotate(${note.rotation}deg)` }}
                aria-label={`Sticky note: ${note.text}`}
              >
                {note.text}
              </div>
            ))}
          </div>

          {/* The Computer */}
          <RetroComputer />

          {/* Pixel art decoration */}
          <PixelArt />
        </div>

        {/* Mobile sticky notes */}
        <div className="sticky-notes-mobile">
          {siteConfig.stickyNotes.slice(0, 2).map((note, i) => (
            <div
              key={i}
              className={`sticky-note ${note.color}`}
              aria-label={`Sticky note: ${note.text}`}
            >
              {note.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
