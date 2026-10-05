import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { NotePage } from './pages/NotePage';

import './styles/index.css';
import './styles/terminal.css';
import './styles/desktop.css';
import './styles/retro-computer.css';
import './styles/projects.css';
import './styles/timeline.css';
import './styles/notes.css';
import './styles/contact.css';
import './styles/responsive.css';

function AppLayout() {
  const location = useLocation();
  const isNotePage = location.pathname.startsWith('/notes/');
  const fromSite = !!(location.state as { fromSite?: boolean })?.fromSite;

  // Hide navbar/footer when blog is opened via direct link (standalone mode)
  const isStandalone = isNotePage && !fromSite;

  return (
    <>
      {!isStandalone && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<CaseStudyPage />} />
        <Route path="/notes/:slug" element={<NotePage />} />
      </Routes>
      {!isStandalone && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
