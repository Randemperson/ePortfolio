import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import CareerGoals from './pages/CareerGoals';
import ProjectsPage from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/career-goals" element={<CareerGoals />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Alfred Tang · Built with React</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
