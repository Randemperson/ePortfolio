import { achievements } from '../data/portfolioData';

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <h2 className="section-title">Achievements</h2>
      <div className="card">
        {achievements.map((a, i) => (
          <div key={i} className="achievement-row">
            <span className="achievement-title">{a.title}</span>
            <span className="achievement-year badge">{a.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
