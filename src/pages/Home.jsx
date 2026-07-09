import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  ArrowRight, MapPin, BookOpen, Users, Briefcase, Globe,
  Atom, Zap, Eye, Star, Activity, Cpu, Radio
} from 'lucide-react';

const researchAreas = [
  {
    icon: <Zap size={28} className="text-accent-blue-light" />,
    title: 'Gamma-Ray Bursts',
    data: 'Fermi, Konus Wind, Swift Telescope, CGRO, AstroSAT, GMRT',
    desc: 'Investigation of individual and population study of GRB jets in the prompt and afterglow emission.'
  },
  {
    icon: <Atom size={28} className="text-accent-blue-light" />,
    title: 'Active Galactic Nucleus',
    data: 'Fermi, Swift Telescope',
    desc: 'Investigation of individual and population study of AGN jets using observations. We also do simulation to correlate observation features via simulation using PLUTO.'
  },
  {
    icon: <Star size={28} className="text-accent-blue-light" />,
    title: 'Massive Stars Birth & Death',
    data: 'Fermi, Swift Telescope',
    desc: 'Investigation of population study of GRB & supernovae jets in the prompt emission. We perform the simulation of collapse of supernovae and correlate it with the observation evidences from the Gamma-ray and X-ray data obtained from Fermi, Swift Telescope respectively.'
  },
  {
    icon: <Activity size={28} className="text-accent-blue-light" />,
    title: 'Solar Time Series Analysis',
    data: 'Solar Digital Observatory, yearly averages sun spot SILSO data',
    desc: 'Prediction of sun spots using simulations based on different machine learning techniques like GPR, ARIMA, etc.'
  },
  {
    icon: <Cpu size={28} className="text-accent-blue-light" />,
    title: 'Machine Learning Models',
    data: 'Fermi-GBM Telescope',
    desc: 'Investigation of population study of GRB jets in the prompt and afterglow emission. We did classification of GRBs in the prompt emission using Fermi-GBM data. We also created the gap reconstruction technique using different models like PINN, Siamese image auto-encoder, ReFANN, Quantile Regression etc. to predict the gaps in the lightcurve of X-ray GRBs from the Swift archive.'
  },
  {
    icon: <Eye size={28} className="text-accent-blue-light" />,
    title: 'Detector development and Instrumentation',
    data: 'Fermi, Telescope',
    desc: 'Involved in the development of gamma-ray detectors to capture the extreme emissions from high-energy astrophysical sources, bridging observation and simulation to the instrumentation using GEANT4.'
  },
  {
    icon: <Radio size={28} className="text-accent-blue-light" />,
    title: 'Multi-messenger Astronomy',
    data: 'Fermi, Konus Wind, Swift Telescope, CGRO, AstroSAT, GMRT',
    desc: 'We investigate population study of astrophysical jets for different celestial events like GRBs, AGNs, merger events to do theoretical survey and identifying the electromagnetic counterpart along with the search of neutrino emission in the AGNs in not only from very high-energy domain but also in Optical to Radio observation.'
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
            We probe the most energetic and exotic corners of the universe—from relativistic jets and supermassive black holes to cosmic rays and gamma-ray bursts—by seamlessly uniting cutting-edge simulations, deep-space observations, and the in-house development of next-generation gamma-ray detectors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <a 
              href="#research" 
              className="btn px-8 py-3.5 md:py-4 text-base md:text-lg justify-center shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-accent-blue/15 group hover:scale-110 active:scale-95 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Our Research</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </a>
            <Link to="/people" className="btn btn-outline px-8 py-3.5 md:py-4 text-base md:text-lg justify-center bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/40 text-white hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / PI ── */}
      <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="glass-card flex flex-col text-center items-center !py-6 md:!py-8 !px-6">
          <h3 className="text-2xl md:text-3xl mb-1">Dr. Amit Shukla</h3>
          <p className="text-lg font-semibold text-gradient mb-1">Principal Investigator</p>
          <p className="text-sm text-slate-400 mb-4">Department of Astronomy, Astrophysics & Space Engineering</p>
          
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-400">
            <MapPin size={16} className="text-accent-blue-light shrink-0" />
            <span>POD 1D 512, IIT Indore, Simrol, Khandwa Road, Indore — 453552</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link to="/pi" className="btn justify-center">View Profile</Link>
            <Link to="/collaborations" className="btn btn-outline justify-center">View Collaborations</Link>
          </div>
        </div>
      </section>

      {/* ── Research Focus Areas ── */}
      <section id="research" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                {area.data && (
                  <div className="text-base text-accent-blue-light/80 font-mono mb-3 bg-accent-blue/10 px-2 py-1 rounded border border-accent-blue/20">
                    <span className="text-slate-400">Data:</span> {area.data}
                  </div>
                )}
                <p className="text-slate-400 text-base leading-relaxed m-0">{area.desc}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ── Quick Nav Cards ── */}
      <section className="pt-10 md:pt-16 pb-6 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                <p className="text-slate-400 text-sm m-0">{item.desc}</p>
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
