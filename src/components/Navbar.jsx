const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#responsibilities', label: 'Responsibilities' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#about" className="navbar-brand">AT</a>
      <ul className="navbar-links">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
