import { timeline } from '../../content/timeline';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

// Highlight key milestones
const HIGHLIGHT_KEYWORDS = ['Internship', 'Co-Founded', 'Intern', 'B.Tech', 'Graduation', 'Certif'];

function isHighlight(title: string): boolean {
  return HIGHLIGHT_KEYWORDS.some(kw => title.includes(kw));
}

export function Timeline() {
  const scrollRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-inner">
        <div className="section-label">Journey</div>
        <h2 className="section-title">Timeline</h2>
      </div>
      <div
        className="timeline-wrapper"
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Career timeline"
      >
        <div className="timeline-track">
          {timeline.map((entry, i) => (
            <div
              key={`${entry.year}-${i}`}
              className={`timeline-node ${i % 2 === 0 ? 'top' : 'bottom'}`}
            >
              {i % 2 === 0 && (
                <>
                  <div className={`timeline-card ${isHighlight(entry.title) ? 'highlight' : ''}`}>
                    <span className="timeline-year">{entry.year}</span>
                    <h4>{entry.title}</h4>
                    <p>{entry.description}</p>
                  </div>
                  <div className="timeline-pin" />
                </>
              )}
              {i % 2 !== 0 && (
                <>
                  <div className="timeline-pin" />
                  <div className={`timeline-card ${isHighlight(entry.title) ? 'highlight' : ''}`}>
                    <span className="timeline-year">{entry.year}</span>
                    <h4>{entry.title}</h4>
                    <p>{entry.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
