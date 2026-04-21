import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/career-goals', label: 'Career Goals' },
  { to: '/projects', label: 'Projects' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" end>
          <span className="navbar-brand-mark">AT</span>
          <span className="navbar-brand-copy">
            <strong>Alfred Tang</strong>
            <span>ePortfolio</span>
          </span>
        </NavLink>
        <ul className="navbar-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? 'nav-link nav-active' : 'nav-link')}
                end={to === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
