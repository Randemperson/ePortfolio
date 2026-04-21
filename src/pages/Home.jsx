import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, summary } from '../data/portfolioData';
import '../styles/Home.css';

const quickLinks = [
  { to: '/about', label: 'About Me', detail: 'Background, leadership, and technical narrative' },
  { to: '/resume', label: 'Resume', detail: 'Experience, coursework, and PDF download' },
  { to: '/career-goals', label: 'Career Goals', detail: 'Roadmap into ML, vision, and next steps' },
  { to: '/projects', label: 'Projects', detail: 'Hands-on builds across embedded systems and software' },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.65;
      const progress = Math.min(scrollY / maxScroll, 1);
      const translateY = progress * 36;
      const scale = 1 + progress * 0.04;
      const opacity = 1 - progress * 0.22;

      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
        heroRef.current.style.opacity = String(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero-wrapper">
        <div className="home-hero-bg" />
        <div className="home-hero-content" ref={heroRef}>
          <p className="home-hero-eyebrow">Computer Engineering at Georgia Tech</p>
          <h1 className="home-hero-name">{personalInfo.name}</h1>
          <p className="home-hero-tagline">{summary.tagline}</p>

          <div className="home-hero-actions">
            <Link to="/projects" className="home-hero-button home-hero-button-primary">View Projects</Link>
            <Link to="/resume" className="home-hero-button home-hero-button-secondary">Open Resume</Link>
          </div>

          <div className="home-hero-contacts">
            <a href={`mailto:${personalInfo.email}`} className="hero-contact-chip">{personalInfo.email}</a>
            <a href={personalInfo.linkedin.url} target="_blank" rel="noreferrer" className="hero-contact-chip">
              {personalInfo.linkedin.label}
            </a>
            <a href={personalInfo.github.url} target="_blank" rel="noreferrer" className="hero-contact-chip">
              {personalInfo.github.label}
            </a>
          </div>

          <div className="home-hero-scroll-hint">
            <span>Scroll to explore</span>
            <span className="scroll-arrow">v</span>
          </div>
        </div>
      </section>

      <section className="home-intro">
        <div className="home-intro-inner">
          <div className="section-kicker">Snapshot</div>
          <div className="home-intro-header">
            <h2 className="home-display-heading">{summary.headline}</h2>
            <p className="home-intro-summary">
              I like building things that cross boundaries: hardware into software, raw ideas into systems,
              and early concepts into polished, working projects.
            </p>
          </div>

          <div className="home-intro-bullets">
            {summary.intro.map((line, index) => (
              <article key={index} className="home-intro-card">
                <span className="home-intro-index">0{index + 1}</span>
                <p className="home-intro-line">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-nav-section">
        <div className="home-nav-inner">
          <div className="home-section-copy">
            <div className="section-kicker">Explore</div>
            <h2 className="home-display-heading">Move through the portfolio like a guided story.</h2>
            <p className="home-intro-summary">
              Each page now acts like a chapter, with smoother transitions and a more cinematic presentation.
            </p>
          </div>

          <div className="home-nav-grid">
            {quickLinks.map(({ to, label, detail }) => (
              <Link key={to} to={to} className="home-nav-card">
                <span className="home-nav-number">{label.slice(0, 2).toUpperCase()}</span>
                <span className="home-nav-label">{label}</span>
                <span className="home-nav-desc">{detail}</span>
                <span className="home-nav-link">Open page</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
