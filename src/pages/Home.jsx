import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  ArrowRight, MapPin, BookOpen, Users, Briefcase, Globe,
  Atom, Zap, Eye, Star
} from 'lucide-react';

const researchAreas = [
  {
    icon: <Atom size={28} className="text-accent-blue-light" />,
    title: 'Relativistic Jets',
    desc: 'Studying ultra-relativistic plasma jets ejected from supermassive black holes at velocities approaching the speed of light.'
  },
  {
    icon: <Zap size={28} className="text-accent-blue-light" />,
    title: 'High-Energy Astrophysics',
    desc: 'Investigating the physical mechanisms behind extreme gamma-ray and X-ray emissions from active galactic nuclei (AGN).'
  },
  {
    icon: <Eye size={28} className="text-accent-blue-light" />,
    title: 'Multi-Wavelength Observations',
    desc: 'Combining data from radio, optical, X-ray, and gamma-ray telescopes for comprehensive source characterization.'
  },
  {
    icon: <Star size={28} className="text-accent-blue-light" />,
    title: 'Blazars & BL Lac Objects',
    desc: 'Characterizing variability, spectral energy distributions, and jet physics of blazar populations.'
  },
];

const Home = () => {
  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 md:mt-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-accent-cyan border border-accent-blue/30 px-4 py-1.5 rounded-full mb-6 md:mb-8 bg-accent-blue/5">
            Dept of Astronomy, Astrophysics &amp; Space Engineering · IIT Indore
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl">
            Ultra Relativistic Jet-based<br className="hidden sm:block" />
            <span className="text-gradient">Astronomy Laboratory</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            We probe the most energetic and exotic corners of the universe —
            relativistic jets, supermassive black holes, and extreme high-energy astrophysical phenomena.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <a 
              href="#research" 
              className="btn justify-center bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/50 hover:from-blue-400 hover:to-blue-600 shadow-[0_4px_15px_rgba(59,130,246,0.25)] group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Our Research</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link to="/people" className="btn btn-outline justify-center backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / PI ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-accent-cyan mb-3">Principal Investigator</span>
          <h2 className="text-3xl md:text-4xl">Dr. Amit Shukla</h2>
        </div>
        
        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true} glareMaxOpacity={0.15} glareColor="#60A5FA" glarePosition="all" scale={1.01}>
          <div className="glass-card flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
            <div className="relative shrink-0 mt-4 md:mt-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent-blue/40 flex items-center justify-center bg-accent-blue/10 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <span className="font-space text-4xl md:text-5xl font-bold text-accent-cyan">AS</span>
              </div>
              <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl mb-1">Dr. Amit Shukla</h3>
              <p className="text-lg md:text-xl font-semibold text-gradient mb-2">Assistant Professor</p>
              <p className="text-sm md:text-base text-slate-400 mb-6">Dept. of Astronomy, Astrophysics &amp; Space Engineering · IIT Indore</p>
              
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Dr. Shukla's research focuses on high-energy astrophysics with an emphasis on understanding
                the physical processes driving ultra-relativistic jets in active galactic nuclei.
                His work involves multi-wavelength observational campaigns and theoretical modelling
                of blazar variability, emission mechanisms, and jet formation.
              </p>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-8 text-sm text-slate-400">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-cyan transition-colors"
                >
                  POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link to="/pi" className="btn w-full sm:w-auto justify-center">Full Profile</Link>
                <Link to="/collaborations" className="btn btn-outline w-full sm:w-auto justify-center">View Collaborations</Link>
              </div>
            </div>
          </div>
        </Tilt>
      </section>

      {/* ── Research Focus Areas ── */}
      <section id="research" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-white/[0.02]">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-accent-cyan mb-3">What We Study</span>
          <h2 className="text-3xl md:text-4xl mb-4">Research Focus Areas</h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base">
            URJA Lab investigates extreme astrophysical phenomena across the electromagnetic spectrum,
            combining observations with cutting-edge theoretical models.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {researchAreas.map((area, i) => (
            <Tilt key={i} tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.1} glareColor="#60A5FA" glarePosition="all" scale={1.02} className="h-full">
              <div className="glass-card h-full flex flex-col items-start text-left hover:border-accent-blue/30 group">
                <div className="w-14 h-14 bg-accent-blue/10 border border-accent-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 group-hover:text-accent-cyan transition-colors">{area.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed m-0">{area.desc}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ── Quick Nav Cards ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <BookOpen size={24} />, label: 'Publications', path: '/publications', desc: 'Peer-reviewed research & preprints' },
            { icon: <Users size={24} />, label: 'People', path: '/people', desc: 'Active members & alumni' },
            { icon: <Briefcase size={24} />, label: 'Opportunities', path: '/opportunities', desc: 'Open positions & internships' },
          ].map((item) => (
            <Tilt key={item.path} tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.1} glareColor="#60A5FA" glarePosition="all" scale={1.02} className="h-full">
              <Link to={item.path} className="glass-card h-full block group relative pb-16 hover:border-accent-blue/30 transition-all">
                <div className="w-12 h-12 bg-accent-blue/10 border border-accent-blue/20 rounded-lg flex items-center justify-center mb-5 text-accent-cyan group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-accent-cyan transition-colors">{item.label}</h4>
                <p className="text-slate-400 text-xs m-0">{item.desc}</p>
                <div className="absolute bottom-6 right-6 text-slate-500 group-hover:text-accent-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </Tilt>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
