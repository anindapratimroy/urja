import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Users, BookOpen, Briefcase, Link as LinkIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket size={18} /> },
    { name: 'People', path: '/people', icon: <Users size={18} /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen size={18} /> },
    { name: 'Opportunities', path: '/opportunities', icon: <Briefcase size={18} /> },
    { name: 'Collaborations', path: '/collaborations', icon: <LinkIcon size={18} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
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
        }

        .navbar-logo:hover {
          transform: translateZ(20px) scale(1.05);
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
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
          gap: 2rem;
          list-style: none;
          perspective: 1000px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: var(--text-sm);
          font-weight: 500;
          padding: 0.5rem 0.8rem;
          border-radius: 8px;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      color 0.3s ease, 
                      background 0.3s ease,
                      box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-3px) translateZ(30px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(59, 130, 246, 0.2);
        }

        @media (max-width: 768px) {
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
