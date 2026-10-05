import { projects } from '../../content/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-inner">
        <div className="section-label">Selected Work</div>
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
