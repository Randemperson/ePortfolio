import { resumeInfo, personalInfo, education, experience, responsibilities, skills, achievements } from '../data/portfolioData';
import '../styles/Page.css';
import '../styles/Resume.css';

export default function Resume() {
  return (
    <div className="page-wrapper">
      <div className="page-hero resume-hero">
        <h1 className="page-hero-title">Resume</h1>
        <p className="page-hero-subtitle">Last updated {resumeInfo.lastUpdated}</p>
        <a
          href={resumeInfo.downloadPath}
          download
          className="resume-download-btn"
        >
          ⬇ Download PDF
        </a>
      </div>

      <div className="page-content">
        {/* Inline HTML resume — always readable even without a PDF viewer */}
        <div className="resume-sheet card" id="resume-print">
          {/* Header */}
          <div className="resume-header">
            <h2 className="resume-name">{personalInfo.name}</h2>
            <div className="resume-contacts">
              <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
              <span className="resume-sep">·</span>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              <span className="resume-sep">·</span>
              <a href={personalInfo.linkedin.url} target="_blank" rel="noreferrer">{personalInfo.linkedin.label}</a>
              <span className="resume-sep">·</span>
              <a href={personalInfo.github.url} target="_blank" rel="noreferrer">{personalInfo.github.label}</a>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <h3 className="resume-section-title">Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <strong>{edu.school}</strong>
                    <span className="resume-entry-sub"> — {edu.degree}</span>
                    {edu.gpa && <span className="resume-badge">GPA: {edu.gpa}</span>}
                  </div>
                  <div className="resume-entry-meta">
                    <span>{edu.date}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
                {edu.coursework && (
                  <p className="resume-coursework">
                    <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="resume-section">
            <h3 className="resume-section-title">Technical Skills</h3>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="resume-skills-row">
                <strong>{cat}:</strong>
                <span> {items.join(', ')}</span>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="resume-section">
            <h3 className="resume-section-title">Experience</h3>
            {experience.map((job, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <strong>{job.title}</strong>
                    <span className="resume-entry-sub"> — {job.company}</span>
                  </div>
                  <div className="resume-entry-meta">
                    <span>{job.date}</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <ul className="resume-bullets">
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Responsibilities */}
          <div className="resume-section">
            <h3 className="resume-section-title">Positions of Responsibility</h3>
            {responsibilities.map((role, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <strong>{role.title}</strong>
                    <span className="resume-entry-sub"> — {role.org}</span>
                  </div>
                  <span className="resume-entry-meta">{role.date}</span>
                </div>
                <ul className="resume-bullets">
                  {role.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="resume-section">
            <h3 className="resume-section-title">Achievements</h3>
            {achievements.map((a, i) => (
              <div key={i} className="resume-achievement">
                <span>{a.title}</span>
                <span className="resume-badge">{a.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PDF viewer (shown if resume.pdf is present) */}
        <div className="resume-pdf-section">
          <h2 className="section-title">PDF Version</h2>
          <div className="resume-pdf-wrapper card">
            <iframe
              src={resumeInfo.downloadPath}
              title="Resume PDF"
              className="resume-pdf-iframe"
              aria-label="Resume PDF viewer"
            />
            <p className="resume-pdf-fallback">
              Can&apos;t see the PDF?{' '}
              <a href={resumeInfo.downloadPath} download>Download it here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
