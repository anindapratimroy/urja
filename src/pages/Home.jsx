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
          <div className="hero-tag">IIT Indore · Department of Astronomy, Astrophysics &amp; Space Engineering</div>
          <h1 className="hero-title">
            Ultra Relativistic Jet-based<br />
            <span className="text-gradient">Astronomy Laboratory</span>
          </h1>
          <p className="hero-desc">
            We probe the most energetic and exotic corners of the universe —
            relativistic jets, supermassive black holes, and extreme high-energy astrophysical phenomena.
          </p>
          <div className="hero-cta">
            <Link to="/research" className="btn">
              Our Research <ArrowRight size={18} />
            </Link>
            <Link to="/people" className="btn btn-outline">
              Meet the Team
            </Link>
          </div>

          {/* stats row */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number text-gradient">2021</span>
              <span className="stat-label">Founded</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number text-gradient">IIT</span>
              <span className="stat-label">Indore</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number text-gradient">AGN</span>
              <span className="stat-label">Specialisation</span>
            </div>
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
                <div className="pi-location flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginBottom: '1.5rem' }}>
                  <MapPin size={16} color="var(--accent-blue-light)" />
                  POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
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
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 6rem 0 4rem;
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
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
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
        .section-header { margin-bottom: 3rem; }
        .section-header h2 { margin-bottom: 1rem; }
        .pi-section, .research-section, .quicknav-section { padding: 5rem 0; }
        
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
        .pi-body h3 { font-size: 1.8rem; margin-bottom: 0.25rem; }
        .pi-title { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
        .pi-dept { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem; }

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
