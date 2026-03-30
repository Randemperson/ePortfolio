import { projects } from '../data/portfolioData';

function DemoPlaceholder({ projectId, demoType, demoSrc }) {
  if (demoType === 'video' && demoSrc) {
    return (
      <div className="demo-container">
        <video controls className="demo-video">
          <source src={demoSrc} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (demoType === 'image' && demoSrc) {
    return (
      <div className="demo-container">
        <img src={demoSrc} alt={`${projectId} demo`} className="demo-image" />
      </div>
    );
  }

  // Placeholder when no demo is provided
  return (
    <div className="demo-placeholder" aria-label="Demo placeholder">
      <span className="demo-placeholder-icon">🎬</span>
      <p className="demo-placeholder-text">Image / Video Demo</p>
      <p className="demo-placeholder-hint">Replace demoType &amp; demoSrc in portfolioData.js</p>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card card">
            <div className="card-header">
              <div>
                <h3 className="card-title">{project.title}</h3>
                <div className="tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <span className="card-date">{project.date}</span>
            </div>

            <DemoPlaceholder
              projectId={project.id}
              demoType={project.demoType}
              demoSrc={project.demoSrc}
            />

            <ul className="bullet-list">
              {project.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
