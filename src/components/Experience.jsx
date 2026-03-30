import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      {experience.map((job, i) => (
        <div key={i} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">{job.title}</h3>
              <p className="card-subtitle">{job.company}</p>
            </div>
            <div className="card-meta">
              <span className="card-date">{job.date}</span>
              <span className="card-location">{job.location}</span>
            </div>
          </div>
          <ul className="bullet-list">
            {job.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
