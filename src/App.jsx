import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import CareerGoals from './pages/CareerGoals';
import ProjectsPage from './pages/Projects';

function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="route-shell page-enter">
      {children}
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-orb site-orb-one" />
        <div className="site-orb site-orb-two" />
        <div className="site-orb site-orb-three" />
      </div>
      <Navbar />
      <main className="app-main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/career-goals" element={<CareerGoals />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </PageTransition>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-title">Alfred Tang</p>
          <p className="footer-copy">Computer Engineering student building systems, software, and applied AI.</p>
          <p className="footer-meta">(c) {new Date().getFullYear()} Alfred Tang · Built with React and Vite</p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
