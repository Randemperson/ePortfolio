import { useState } from 'react';
import { projects } from '../data/portfolioData';
import '../styles/Page.css';
import '../styles/ProjectsPage.css';

function DemoMedia({ projectId, demoType, demoSrc }) {
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
  return (
    <div className="demo-placeholder" aria-label="Demo placeholder">
      <span className="demo-placeholder-icon">🎬</span>
      <p className="demo-placeholder-text">Image / Video Demo</p>
      <p className="demo-placeholder-hint">Replace demoType &amp; demoSrc in portfolioData.js</p>
    </div>
  );
}

function ProjectMediaGallery({ projectTitle, media = [] }) {
  if (!media.length) {
    return null;
  }

  return (
    <section className="project-media-section">
      <h4 className="project-overview-heading">Project Media</h4>
      <div className="project-media-grid">
        {media.map((item) => (
          <figure key={item.src} className="project-media-card">
            {item.type === 'video' ? (
              <video controls className="project-media-video">
                <source src={item.src} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="project-media-link"
                aria-label={`Open ${projectTitle} media`}
              >
                <img
                  src={item.src}
                  alt={item.alt || `${projectTitle} media`}
                  className="project-media-image"
                />
              </a>
            )}
            {item.caption && <figcaption className="project-media-caption">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProjectDetail({ project, onClose }) {
  return (
    <div className="project-detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="project-detail-modal card" onClick={(e) => e.stopPropagation()}>
        <button className="project-detail-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="project-detail-header">
          <h2 className="project-detail-title">{project.title}</h2>
          {project.isDiscovery && <span className="discovery-badge">⭐ Discovery Project</span>}
          <div className="tech-tags">
            {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
          </div>
          <span className="card-date">{project.date}</span>
        </div>

        <DemoMedia projectId={project.id} demoType={project.demoType} demoSrc={project.demoSrc} />
        <ProjectMediaGallery projectTitle={project.title} media={project.media} />

        {project.overview && (
          <div className="project-overview">
            {project.overview.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.includes('**\n')) {
                const [heading, ...rest] = para.split('\n');
                return (
                  <div key={i}>
                    <h4 className="project-overview-heading">{heading.replace(/\*\*/g, '')}</h4>
                    <p>{rest.join('\n')}</p>
                  </div>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>
        )}

        <div className="project-detail-bullets">
          <h4 className="project-overview-heading">Key Highlights</h4>
          <ul className="bullet-list">
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);

  const discoveryProjects = projects.filter((p) => p.isDiscovery);
  const otherProjects = projects.filter((p) => !p.isDiscovery);

  return (
    <div className="page-wrapper">
      <div className="page-hero projects-hero">
        <h1 className="page-hero-title">Technical Projects</h1>
        <p className="page-hero-subtitle">A growing portfolio of work — click any project for the full story</p>
      </div>

      <div className="page-content">
        {/* Discovery Project(s) */}
        {discoveryProjects.length > 0 && (
          <section className="section" id="discovery">
            <h2 className="section-title">Discovery Project</h2>
            <p className="projects-intro-text">
              The Discovery Project is the cornerstone of the GT ECE first-year experience. It integrates
              circuit design, embedded programming, PCB fabrication, and hands-on prototyping.
            </p>
            <div className="projects-grid">
              {discoveryProjects.map((p) => (
                <button key={p.id} className="project-card card project-card-btn discovery-card" onClick={() => setSelected(p)}>
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{p.title}</h3>
                      <span className="discovery-badge">⭐ Discovery Project</span>
                      <div className="tech-tags">
                        {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                    </div>
                    <span className="card-date">{p.date}</span>
                  </div>
                  <DemoMedia projectId={p.id} demoType={p.demoType} demoSrc={p.demoSrc} />
                  <ul className="bullet-list">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <span className="project-read-more">Read full overview →</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <section className="section" id="other-projects">
            <h2 className="section-title">Other Projects</h2>
            <div className="projects-grid">
              {otherProjects.map((p) => (
                <button key={p.id} className="project-card card project-card-btn" onClick={() => setSelected(p)}>
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{p.title}</h3>
                      <div className="tech-tags">
                        {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                    </div>
                    <span className="card-date">{p.date}</span>
                  </div>
                  <DemoMedia projectId={p.id} demoType={p.demoType} demoSrc={p.demoSrc} />
                  <ul className="bullet-list">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <span className="project-read-more">Read full overview →</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Detail modal */}
      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
