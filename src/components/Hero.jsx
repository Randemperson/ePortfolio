import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <h1 className="hero-name">{personalInfo.name}</h1>
        <p className="hero-subtitle">Computer Engineering @ Georgia Tech</p>
        <ul className="hero-contacts">
          <li>
            <a href={`tel:${personalInfo.phone}`}>📞 {personalInfo.phone}</a>
          </li>
          <li>
            <a href={`mailto:${personalInfo.email}`}>✉️ {personalInfo.email}</a>
          </li>
          <li>
            <a href={personalInfo.linkedin.url} target="_blank" rel="noreferrer">
              🔗 {personalInfo.linkedin.label}
            </a>
          </li>
          <li>
            <a href={personalInfo.github.url} target="_blank" rel="noreferrer">
              💻 {personalInfo.github.label}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
