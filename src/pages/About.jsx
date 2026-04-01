import { biography, personalInfo } from '../data/portfolioData';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Responsibilities from '../components/Responsibilities';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import '../styles/Page.css';

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="page-hero about-hero">
        <h1 className="page-hero-title">{biography.headline}</h1>
        <p className="page-hero-subtitle">{personalInfo.name} · Computer Engineering @ Georgia Tech</p>
      </div>

      <div className="page-content">
        {/* Biography narrative */}
        <section className="section" id="biography">
          <h2 className="section-title">Biography</h2>
          <div className="card biography-card">
            {biography.paragraphs.map((para, i) => (
              <p key={i} className="bio-paragraph">{para}</p>
            ))}
          </div>
        </section>

        <Education />
        <Experience />
        <Responsibilities />
        <Skills />
        <Achievements />
      </div>
    </div>
  );
}
