import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated constellation background */}
      <ParticleBackground />

      <Navbar />

      <main className="flex-1 pt-[80px] animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out pb-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
