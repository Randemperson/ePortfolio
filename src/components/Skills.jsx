import { skills } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Skills</h2>
      <div className="card">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-row">
            <span className="skill-category">{category}:</span>
            <div className="tech-tags">
              {items.map((item) => (
                <span key={item} className="tech-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
