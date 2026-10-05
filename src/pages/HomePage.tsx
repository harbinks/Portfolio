import { useCallback } from 'react';
import { Terminal } from '../components/terminal/Terminal';
import { DesktopSection } from '../components/desktop/DesktopSection';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { AboutSection } from '../components/about/AboutSection';
import { NotesGrid } from '../components/notes/NotesGrid';
import { Timeline } from '../components/timeline/Timeline';
import { Contact } from '../components/contact/Contact';

export function HomePage() {
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <main>
      <Terminal scrollToSection={scrollToSection} />
      <DesktopSection />
      <ProjectGrid />
      <AboutSection />
      <NotesGrid />
      <Timeline />
      <Contact />
    </main>
  );
}
