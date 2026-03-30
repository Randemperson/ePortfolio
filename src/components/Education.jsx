import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      {education.map((edu, i) => (
        <div key={i} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">{edu.school}</h3>
              <p className="card-subtitle">
                {edu.degree}
                {edu.gpa && <span className="badge">GPA: {edu.gpa}</span>}
              </p>
            </div>
            <div className="card-meta">
              <span className="card-date">{edu.date}</span>
              <span className="card-location">{edu.location}</span>
            </div>
          </div>
          {edu.coursework && (
            <p className="card-coursework">
              <span className="label">Relevant Coursework:</span>{' '}
              {edu.coursework.join(', ')}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
