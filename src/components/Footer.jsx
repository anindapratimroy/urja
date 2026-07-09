import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Loader2 } from 'lucide-react';

const Footer = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  return (
    <footer className="bg-navy/95 border-t border-white/5 pt-14 mt-auto relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-accent-blue-light/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10">
          
          {/* Brand & Address */}
          <div className="lg:col-span-1.5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="font-space text-2xl font-bold text-white tracking-wide mb-3">
              <span className="text-gradient">URJA</span> LAB
            </div>
            <p className="text-base text-slate-400 mb-5 leading-relaxed">
              Ultra Relativistic Jet-based Astronomy Laboratory
            </p>
            <div className="flex items-start gap-2.5 text-base text-slate-400 leading-relaxed justify-center md:justify-start">
              <MapPin size={16} className="text-accent-blue-light shrink-0 mt-0.5" />
              <a 
                href="https://www.google.com/maps/search/?api=1&query=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-blue-light transition-colors text-left"
              >
                POD 1E 402, Dept. of Astronomy, Astrophysics &amp; Space Engineering,
                IIT Indore, Simrol, Khandwa Road, Indore — 453552
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-space text-sm font-bold tracking-[0.12em] uppercase text-slate-300 mb-4">Navigation</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">Home</Link></li>
              <li><Link to="/people" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">People</Link></li>
              <li><Link to="/publications" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">Publications</Link></li>
              <li><Link to="/opportunities" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">Opportunities</Link></li>
              <li><Link to="/collaborations" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">Collaborations</Link></li>
              <li><Link to="/pi" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">Principal Investigator</Link></li>
            </ul>
          </div>

          {/* Institute */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-space text-sm font-bold tracking-[0.12em] uppercase text-slate-300 mb-4">Institute</h5>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://www.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">
                  IIT Indore <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://astronomy.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">
                  DAASE Dept. <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://sites.google.com/iiti.ac.in/welcome/home" target="_blank" rel="noopener noreferrer" className="text-base text-slate-400 hover:text-accent-blue-light hover:translate-x-1 transition-all inline-flex items-center gap-1">
                  PI's Website <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Map Location */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start w-full">
            <h5 className="font-space text-sm font-bold tracking-[0.12em] uppercase text-slate-300 mb-4">Location</h5>
            <div 
              className="relative w-full h-[280px] rounded-xl overflow-hidden border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)] bg-slate-900/60 transition-colors hover:border-accent-blue-light/30 group"
            >
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-accent-cyan z-20">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              )}
              <iframe
                src="https://maps.google.com/maps?q=GWHF%2BF9C,%20Indore,%20Madhya%20Pradesh%20453552&t=k&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="URJA Lab Location"
                onLoad={() => setMapLoaded(true)}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-base md:text-lg text-slate-400 m-0">
            &copy; {new Date().getFullYear()} URJA Lab & Aninda Pratim Roy, IIT Indore. All rights reserved.
          </p>
          <p className="text-base md:text-lg text-slate-400 m-0 flex items-center gap-1">
            Website created by{' '}
            <a
              href="https://www.linkedin.com/in/aninda-pratim-roy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue-light font-semibold hover:text-white hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.4)] transition-all flex items-center gap-1.5 ml-1"
            >
              Aninda Pratim Roy
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
