import { responsibilities } from '../data/portfolioData';

export default function Responsibilities() {
  return (
    <section id="responsibilities" className="section">
      <h2 className="section-title">Positions of Responsibility</h2>
      {responsibilities.map((role, i) => (
        <div key={i} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">{role.title}</h3>
              <p className="card-subtitle">{role.org}</p>
            </div>
            <span className="card-date">{role.date}</span>
          </div>
          <ul className="bullet-list">
            {role.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
