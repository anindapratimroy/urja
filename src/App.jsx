import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import People from './pages/People';
import Publications from './pages/Publications';
import Opportunities from './pages/Opportunities';
import Collaborations from './pages/Collaborations';
import PI from './pages/PI';
import Gallery from './pages/Gallery';
import Preloader from './components/Preloader';
function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Only show preloader if it hasn't been shown in this session
    return !sessionStorage.getItem('urja_preloader_shown');
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('urja_preloader_shown', 'true');
    setShowPreloader(false);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pi" element={<PI />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
