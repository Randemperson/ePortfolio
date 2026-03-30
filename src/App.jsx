import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Responsibilities from './components/Responsibilities';
import Skills from './components/Skills';
import Achievements from './components/Achievements';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Hero />
        <Education />
        <Projects />
        <Experience />
        <Responsibilities />
        <Skills />
        <Achievements />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Alfred Tang · Built with React</p>
      </footer>
    </>
  );
}

export default App;
