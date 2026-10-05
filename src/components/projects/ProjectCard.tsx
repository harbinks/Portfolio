import { useNavigate } from 'react-router-dom';
import type { Project } from '../../content/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  // Get first result as the key outcome
  const keyOutcome = project.results.find(r => !r.startsWith('Add your'));
  // Get first 3 tools as preview tags
  const previewTools = project.tools.slice(0, 4);
  // Truncate problem to ~100 chars
  const shortProblem = project.problem.length > 120
    ? project.problem.slice(0, 117) + '...'
    : project.problem;

  return (
    <article
      className="project-card"
      onClick={() => navigate(`/project/${project.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/project/${project.slug}`)}
      aria-label={`View project: ${project.title}`}
    >
      <div className="project-card-image">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={400}
          />
        ) : (
          <div className="placeholder">
            <span className="icon">💾</span>
          </div>
        )}
      </div>
      <div className="project-card-body">
        <div className="project-card-header">
          <span className="project-card-category">{project.category}</span>
          <span className="project-card-year">{project.year}</span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-problem">{shortProblem}</p>
        <div className="project-card-tags">
          {previewTools.map(tool => (
            <span key={tool} className="project-card-tag">{tool}</span>
          ))}
        </div>
        {keyOutcome && (
          <div className="project-card-outcome">
            → {keyOutcome}
          </div>
        )}
        {(project.githubUrl || project.demoUrl) && (
          <div className="project-card-links">
            {project.githubUrl && (
              <a
                className="project-card-link"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                ⌘ Source
              </a>
            )}
            {project.demoUrl && (
              <a
                className="project-card-link"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                🌐 Demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
