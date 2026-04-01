import { careerGoals } from '../data/portfolioData';
import '../styles/Page.css';
import '../styles/CareerGoals.css';

export default function CareerGoals() {
  return (
    <div className="page-wrapper">
      <div className="page-hero goals-hero">
        <h1 className="page-hero-title">{careerGoals.headline}</h1>
        <p className="page-hero-subtitle">Where I'm headed — and how I'll get there</p>
      </div>

      <div className="page-content">
        {/* Long-term vision */}
        <section className="section" id="vision">
          <h2 className="section-title">Long-Term Vision</h2>
          <div className="card">
            <p className="goals-vision-text">{careerGoals.longTerm}</p>
          </div>
        </section>

        {/* Roadmap */}
        <section className="section" id="roadmap">
          <h2 className="section-title">Roadmap</h2>
          <div className="goals-timeline">
            {careerGoals.steps.map((step, i) => (
              <div key={i} className="goals-phase">
                <div className="goals-phase-marker">
                  <span className="goals-phase-dot">{i + 1}</span>
                  {i < careerGoals.steps.length - 1 && <div className="goals-phase-line" />}
                </div>
                <div className="goals-phase-content card">
                  <h3 className="goals-phase-title">{step.phase}</h3>
                  <ul className="bullet-list">
                    {step.actions.map((action, j) => (
                      <li key={j}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap note */}
        <section className="section">
          <div className="card goals-note">
            <span className="goals-note-icon">🗺️</span>
            <p>{careerGoals.roadmapNote}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
