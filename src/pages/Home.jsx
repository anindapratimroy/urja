import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  ArrowRight, MapPin, BookOpen, Users, Briefcase, Globe,
  Atom, Zap, Eye, Star
} from 'lucide-react';

const researchAreas = [
  {
    icon: <Atom size={28} color="#60A5FA" />,
    title: 'Relativistic Jets',
    desc: 'Studying ultra-relativistic plasma jets ejected from supermassive black holes at velocities approaching the speed of light.'
  },
  {
    icon: <Zap size={28} color="#60A5FA" />,
    title: 'High-Energy Astrophysics',
    desc: 'Investigating the physical mechanisms behind extreme gamma-ray and X-ray emissions from active galactic nuclei (AGN).'
  },
  {
    icon: <Eye size={28} color="#60A5FA" />,
    title: 'Multi-Wavelength Observations',
    desc: 'Combining data from radio, optical, X-ray, and gamma-ray telescopes for comprehensive source characterization.'
  },
  {
    icon: <Star size={28} color="#60A5FA" />,
    title: 'Blazars & BL Lac Objects',
    desc: 'Characterizing variability, spectral energy distributions, and jet physics of blazar populations.'
  },
];

const Home = () => {
  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-backdrop" />
        <div className="container hero-inner">
          <div className="hero-tag">Department of Astronomy, Astrophysics &amp; Space Engineering · IIT Indore</div>
          <h1 className="hero-title">
            Ultra Relativistic Jet-based<br />
            <span className="text-gradient">Astronomy Laboratory</span>
          </h1>
          <p className="hero-desc">
            We probe the most energetic and exotic corners of the universe —
            relativistic jets, supermassive black holes, and extreme high-energy astrophysical phenomena.
          </p>
          <div className="hero-cta">
            <Link to="/research" className="btn hero-btn-primary">
              <span>Our Research</span>
              <ArrowRight size={18} className="btn-arrow" />
            </Link>
            <Link to="/people" className="btn hero-btn-secondary">
              Meet the Team
            </Link>
          </div>

        </div>
      </section>

      {/* ── About / PI ── */}
      <section className="pi-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Principal Investigator</span>
            <h2>Dr. Amit Shukla</h2>
          </div>
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.15} glareColor="#60A5FA" glarePosition="all" scale={1.01}>
            <div className="pi-card glass-card">
              <div className="pi-avatar">
                <div className="pi-avatar-ring">
                  <div className="pi-avatar-initials">AS</div>
                </div>
                <div className="pi-avatar-glow" />
              </div>
              <div className="pi-body">
                <h3>Dr. Amit Shukla</h3>
                <p className="pi-title text-gradient">Assistant Professor</p>
                <p className="pi-dept">Dept. of Astronomy, Astrophysics &amp; Space Engineering · IIT Indore</p>
                <p>
                  Dr. Shukla's research focuses on high-energy astrophysics with an emphasis on understanding
                  the physical processes driving ultra-relativistic jets in active galactic nuclei.
                  His work involves multi-wavelength observational campaigns and theoretical modelling
                  of blazar variability, emission mechanisms, and jet formation.
                </p>
                <div className="pi-meta-row" style={{ marginBottom: '1.5rem' }}>
                  <span className="pi-meta-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <MapPin size={15} style={{ flexShrink: 0 }} />
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                      onMouseLeave={(e) => e.target.style.color = 'inherit'}
                    >
                      POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
                    </a>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/pi" className="btn">Full Profile</Link>
                  <Link to="/collaborations" className="btn btn-outline">View Collaborations</Link>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* ── Research Focus Areas ── */}
      <section className="research-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">What We Study</span>
            <h2>Research Focus Areas</h2>
            <p style={{ maxWidth: '580px', margin: '0 auto' }}>
              URJA Lab investigates extreme astrophysical phenomena across the electromagnetic spectrum,
              combining observations with cutting-edge theoretical models.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {researchAreas.map((area, i) => (
              <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="#60A5FA" glarePosition="all" scale={1.02} style={{ height: '100%' }}>
                <div className="glass-card research-card" style={{ height: '100%' }}>
                  <div className="research-icon">{area.icon}</div>
                  <h4>{area.title}</h4>
                  <p style={{ marginBottom: 0 }}>{area.desc}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Nav Cards ── */}
      <section className="quicknav-section">
        <div className="container">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <BookOpen size={24} />, label: 'Publications', path: '/publications', desc: 'Peer-reviewed research & preprints' },
              { icon: <Users size={24} />, label: 'People', path: '/people', desc: 'Active members & alumni' },
              { icon: <Briefcase size={24} />, label: 'Opportunities', path: '/opportunities', desc: 'Open positions & internships' },
            ].map((item) => (
              <Tilt key={item.path} tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="#60A5FA" glarePosition="all" scale={1.02} style={{ height: '100%' }}>
                <Link to={item.path} className="glass-card quicknav-card" style={{ display: 'block', height: '100%' }}>
                  <div className="quicknav-icon">{item.icon}</div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{item.label}</h4>
                  <p style={{ marginBottom: 0, fontSize: 'var(--font-xs)' }}>{item.desc}</p>
                  <div className="quicknav-arrow"><ArrowRight size={18} /></div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ─ Hero ─ */
        .hero-section {
          min-height: 40vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 5rem 0 1rem;
        }
        .hero-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
        }
        .hero-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          border: 1px solid rgba(59,130,246,0.3);
          padding: 0.3rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
          background: rgba(59,130,246,0.06);
        }
        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .hero-desc {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin-bottom: 2.5rem;
        }
        .hero-cta {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        
        .hero-btn-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: 1px solid rgba(59, 130, 246, 0.5);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2.25rem;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 1.05rem;
          position: relative;
          overflow: hidden;
        }
        
        .hero-btn-primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #4f8bf9, #2563eb);
          border-color: rgba(96, 165, 250, 0.8);
        }
        
        .hero-btn-primary .btn-arrow {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hero-btn-primary:hover .btn-arrow {
          transform: translateX(5px);
        }

        .hero-btn-secondary {
          background: rgba(20, 25, 40, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          padding: 0.9rem 2.25rem;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1.05rem;
          backdrop-filter: blur(8px);
        }
        
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          color: white;
        }
        
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding: 2.5rem 2rem;
          border-top: 1px solid rgba(96, 165, 250, 0.15);
          background: rgba(15, 23, 42, 0.4);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .stat-item { display: flex; flex-direction: column; gap: 0.35rem; }
        .stat-number { font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 700; }
        .stat-label { font-size: 0.95rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .stat-divider { width: 1px; height: 48px; background: linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.3), transparent); }

        /* ─ Section Header ─ */
        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 0.75rem;
        }
        .section-header { margin-bottom: 1.5rem; }
        .section-header h2 { margin-bottom: 0.5rem; }
        .pi-section, .research-section, .quicknav-section { padding: 2rem 0; }
        
        /* ─ PI Card ─ */
        .pi-card {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
        }
        .pi-avatar {
          position: relative;
          flex-shrink: 0;
        }
        .pi-avatar-ring {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59,130,246,0.06);
          position: relative;
          z-index: 1;
        }
        .pi-avatar-initials {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .pi-avatar-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
          pointer-events: none;
        }
        .pi-body { flex: 1; }
        .pi-body h3 { font-size: 2.2rem; margin-bottom: 0.25rem; }
        .pi-title { font-size: 1.3rem; font-weight: 600; margin-bottom: 0.4rem; }
        .pi-dept { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.25rem; }

        /* ─ Research Cards ─ */
        .research-card { display: flex; flex-direction: column; gap: 0.75rem; }
        .research-icon {
          width: 56px; height: 56px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }

        /* ─ Quick Nav ─ */
        .quicknav-card {
          cursor: pointer;
          text-decoration: none;
          position: relative;
          padding-bottom: 2.5rem;
        }
        .quicknav-icon {
          width: 48px; height: 48px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          color: var(--accent-cyan);
        }
        .quicknav-arrow {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          color: var(--text-muted);
          transition: all 0.2s ease;
        }
        .quicknav-card:hover .quicknav-arrow {
          color: var(--accent-cyan);
          transform: translate(4px, -2px);
        }
        .quicknav-card:hover h4 { color: var(--accent-cyan); }

        @media (max-width: 768px) {
          .hero-section { padding: 5rem 0 3rem; min-height: auto; }
          .hero-stats { gap: 1.5rem; }
          .pi-card { flex-direction: column; align-items: center; text-align: center; }
          .pi-dept { font-size: 0.85rem; }
          .pi-location { justify-content: center; }
          .pi-section, .research-section, .quicknav-section { padding: 3rem 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
