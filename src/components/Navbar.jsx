import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Users, BookOpen, Briefcase, Link as LinkIcon, Image as ImageIcon, Menu, X } from 'lucide-react';
import urjaLogo from '../assets/logo/urja_logo_processed.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket size={18} /> },
    { name: 'People', path: '/people', icon: <Users size={18} /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen size={18} /> },
    { name: 'Opportunities', path: '/opportunities', icon: <Briefcase size={18} /> },
    { name: 'Collaborations', path: '/collaborations', icon: <LinkIcon size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon size={18} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src={urjaLogo} 
            alt="URJA Lab Logo" 
            className="navbar-logo-img" 
            onClick={(e) => {
              e.preventDefault();
              setIsLogoOpen(true);
            }}
          />
          <span className="text-gradient">URJA</span> LAB
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logo Lightbox */}
      {isLogoOpen && createPortal(
        <div className="logo-lightbox" onClick={() => setIsLogoOpen(false)}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setIsLogoOpen(false); }}>
            <X size={32} />
          </button>
          <img src={urjaLogo} alt="URJA Lab Logo Full" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>,
        document.body
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(2, 6, 23, 0.85); /* Deep Navy */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          z-index: 1000;
          height: 80px;
          display: flex;
          align-items: center;
          perspective: 1000px; /* For 3D effects */
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 6rem; /* Guarantees space between logo and links */
        }

        .navbar-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.3s ease, text-shadow 0.3s ease;
          white-space: nowrap;
        }

        .navbar-logo:hover {
          transform: translateZ(20px) scale(1.05);
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
        }

        .navbar-logo-img {
          height: 48px;
          width: auto;
          margin-right: 0.5rem;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
          transition: transform 0.3s ease;
        }
        .navbar-logo-img:hover {
          transform: scale(1.1);
        }

        /* Lightbox Styles */
        .logo-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          cursor: pointer;
        }
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          cursor: default;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .mobile-toggle:hover {
          transform: scale(1.1);
        }

        .navbar-links {
          display: flex;
          gap: 0.75rem;
          list-style: none;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 0.85rem;
          border-radius: 100px;
          position: relative;
          transition: all 0.25s ease;
          background: transparent;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: var(--text-primary);
          background: rgba(59, 130, 246, 0.12);
          border-color: rgba(59, 130, 246, 0.25);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15), inset 0 0 10px rgba(59, 130, 246, 0.05);
        }

        @media (max-width: 1200px) {
          .mobile-toggle {
            display: block;
          }
          
          .navbar-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(2, 6, 23, 0.98);
            flex-direction: column;
            gap: 0;
            padding: 0;
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease;
            border-bottom: 1px solid transparent;
          }
          
          .navbar-links.active {
            height: calc(100vh - 80px);
            padding: 2rem 0;
            border-bottom-color: var(--glass-border);
          }

          .nav-link {
            padding: 1.5rem 2rem;
            font-size: 1.25rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            border-radius: 0;
            transform: none !important;
            box-shadow: none !important;
          }
          
          .nav-link.active {
            background: rgba(59, 130, 246, 0.1);
            color: var(--accent-blue-light);
            border-left: 4px solid var(--accent-blue-light);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
