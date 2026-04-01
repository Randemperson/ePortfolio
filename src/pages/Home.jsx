import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, summary } from '../data/portfolioData';
import '../styles/Home.css';

export default function Home() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.6;
      const progress = Math.min(scrollY / maxScroll, 1);
      // Scale from 1.0 to 1.12 as user scrolls
      const scale = 1 + progress * 0.12;
      // Fade out slightly at the very bottom
      const opacity = scrollY > maxScroll * 1.4 ? Math.max(0, 1 - (scrollY - maxScroll * 1.4) / (maxScroll * 0.6)) : 1;

      if (heroRef.current) {
        heroRef.current.style.transform = `scale(${scale})`;
        heroRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { to: '/about', label: 'About Me', icon: '👤', desc: 'Biography & background' },
    { to: '/resume', label: 'Resume', icon: '📄', desc: 'View & download' },
    { to: '/career-goals', label: 'Career Goals', icon: '🎯', desc: 'Where I\'m headed' },
    { to: '/projects', label: 'Projects', icon: '🛠️', desc: 'My technical work' },
  ];

  return (
    <div className="home-page">
      {/* ── Full-viewport hero ───────────────────────────── */}
      <div className="home-hero-wrapper">
        <div className="home-hero-bg" />
        <div className="home-hero-content" ref={heroRef}>
          <p className="home-hero-eyebrow">👋 Welcome</p>
          <h1 className="home-hero-name">{personalInfo.name}</h1>
          <p className="home-hero-tagline">{summary.tagline}</p>
          <div className="home-hero-contacts">
            <a href={`mailto:${personalInfo.email}`} className="hero-contact-chip">
              ✉️ {personalInfo.email}
            </a>
            <a href={personalInfo.linkedin.url} target="_blank" rel="noreferrer" className="hero-contact-chip">
              🔗 {personalInfo.linkedin.label}
            </a>
            <a href={personalInfo.github.url} target="_blank" rel="noreferrer" className="hero-contact-chip">
              💻 {personalInfo.github.label}
            </a>
          </div>
          <div className="home-hero-scroll-hint">
            <span>Scroll to explore</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>

      {/* ── Intro / Summary ──────────────────────────────── */}
      <div className="home-intro" ref={contentRef}>
        <div className="home-intro-inner">
          <h2 className="home-section-heading">Introduction</h2>
          <div className="home-intro-bullets">
            {summary.intro.map((line, i) => (
              <p key={i} className="home-intro-line">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick-nav cards ──────────────────────────────── */}
      <div className="home-nav-section">
        <div className="home-nav-inner">
          <h2 className="home-section-heading">Explore the Portfolio</h2>
          <div className="home-nav-grid">
            {quickLinks.map(({ to, label, icon, desc }) => (
              <Link key={to} to={to} className="home-nav-card">
                <span className="home-nav-icon">{icon}</span>
                <span className="home-nav-label">{label}</span>
                <span className="home-nav-desc">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
