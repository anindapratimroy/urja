import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Animated constellation background */}
      <ParticleBackground />

      <Navbar />

      <main className="main-content page-transition">
        {children}
      </main>

      <Footer />

      <style>{`
        .layout-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .main-content {
          flex: 1;
          padding-top: 80px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
