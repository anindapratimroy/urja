import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Users, BookOpen, Briefcase, Link as LinkIcon, Image as ImageIcon, Menu, X } from 'lucide-react';
import urjaLogo from '../assets/logo/urja_logo_processed.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket size={20} /> },
    { name: 'People', path: '/people', icon: <Users size={20} /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen size={20} /> },
    { name: 'Opportunities', path: '/opportunities', icon: <Briefcase size={20} /> },
    { name: 'Collaborations', path: '/collaborations', icon: <LinkIcon size={20} /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon size={20} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-navy/85 backdrop-blur-md border-b border-white/5 z-50 h-[80px] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-space text-2xl font-bold text-white transition-all hover:scale-105"
          onClick={closeMenu}
        >
          <img 
            src={urjaLogo} 
            alt="URJA Lab Logo" 
            className="h-10 md:h-12 w-auto drop-shadow-md transition-transform hover:scale-110" 
          />
          <div className="flex items-center">
            <span className="text-gradient">URJA</span>
            <span className="ml-1.5 text-slate-100">LAB</span>
          </div>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-slate-200 hover:text-white transition-transform hover:scale-110 p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-base font-semibold transition-all ${
                  location.pathname === link.path 
                  ? 'text-white bg-accent-blue/15 border border-accent-blue/25 shadow-[0_4px_15px_rgba(59,130,246,0.15)]' 
                  : 'text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:-translate-y-0.5'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Links */}
        <div className={`absolute top-[80px] left-0 w-full bg-navy/98 backdrop-blur-xl border-b border-white/10 lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[calc(100vh-80px)] py-4' : 'max-h-0 py-0 border-b-0'}`}>
          <ul className="flex flex-col px-4 space-y-1 pb-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`flex items-center gap-4 px-4 py-4 rounded-lg text-lg font-medium transition-colors ${
                    location.pathname === link.path 
                    ? 'text-accent-blue-light bg-accent-blue/10 border-l-4 border-accent-blue-light' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={closeMenu}
                >
                  {React.cloneElement(link.icon, { size: 22 })}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
