import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Telescope,
  BookOpen,
  Award,
  Mail,
  MapPin,
  ExternalLink,
  Globe,
  Microscope,
  Star,
} from 'lucide-react';

const researchInterests = [
  { icon: Telescope, title: 'High-Energy Astrophysics', desc: 'Probing the most energetic phenomena in the universe through multi-wavelength observations.' },
  { icon: Star, title: 'Ultra-Relativistic Jets in AGN', desc: 'Studying the formation, propagation, and emission mechanisms of relativistic jets in Active Galactic Nuclei.' },
  { icon: Globe, title: 'Multi-Wavelength Campaigns', desc: 'Coordinating simultaneous observational campaigns across radio, optical, X-ray, and gamma-ray bands.' },
  { icon: Microscope, title: 'Blazar Variability & Emission', desc: 'Investigating flux and spectral variability, emission mechanisms, and jet formation in blazars.' },
  { icon: BookOpen, title: 'SED Modelling', desc: 'Constructing and fitting Spectral Energy Distributions to constrain physical jet parameters.' },
  { icon: Telescope, title: 'Gamma-ray & X-ray AGN', desc: 'Analysing high-energy emissions from AGN using data from Fermi-LAT, Swift, NuSTAR, and AstroSat.' },
];

const teachingCourses = [
  'Astronomy & Astrophysics',
  'Computational Methods in Astrophysics',
  'High-Energy Astrophysics Seminars',
];

const honors = [
  'Active referee for international astrophysics journals',
  'Organizer of multi-wavelength observation campaigns',
  'Collaborator with international research groups',
];

const telescopes = ['Fermi-LAT', 'Swift', 'XMM-Newton', 'NuSTAR', 'AstroSat'];

const PI = () => {
  return (
    <div className="pi-page">
      {/* ──── Page Hero ──── */}
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Lab Leadership</span>
          <h1>Principal <span className="text-gradient">Investigator</span></h1>
          <p className="page-hero-desc">
            Meet the researcher leading URJA Lab's exploration of high-energy astrophysical phenomena.
          </p>
        </div>
      </div>

      {/* ──── Page Body ──── */}
      <div className="container page-body">

        {/* ──── Profile Card ──── */}
        <section className="pi-profile-section">
          <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            glareEnable={true}
            glareMaxOpacity={0.08}
            glarePosition="all"
            glareBorderRadius="18px"
            scale={1.01}
            className="pi-tilt-wrapper"
          >
            <div className="glass-card pi-profile-card">
              {/* Avatar */}
              <div className="pi-avatar-ring">
                <span className="pi-avatar-initials">AS</span>
              </div>

              {/* Info */}
              <div className="pi-info">
                <h2 className="pi-name">Dr. Amit <span className="text-gradient">Shukla</span></h2>
                <p className="pi-title-role">Assistant Professor</p>
                <p className="pi-department">
                  Department of Astronomy, Astrophysics &amp; Space Engineering (DAASE)
                </p>
                <p className="pi-institute">Indian Institute of Technology (IIT) Indore</p>

                <div className="pi-meta-row">
                  <span className="pi-meta-item">
                    <MapPin size={15} />
                    POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
                  </span>
                </div>

                <div className="pi-links-row">
                  <a
                    href="https://sites.google.com/iiti.ac.in/welcome/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                  >
                    <Globe size={15} /> Personal Website <ExternalLink size={13} />
                  </a>
                  <Link to="/people" className="btn btn-sm btn-outline">
                    <Mail size={15} /> View Team
                  </Link>
                </div>
              </div>
            </div>
          </Tilt>
        </section>

        {/* ──── Research Interests ──── */}
        <section className="pi-section">
          <div className="pi-section-header">
            <Telescope size={20} className="pi-section-icon" />
            <h3>Research Interests</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {researchInterests.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="glass-card pi-interest-card">
                  <div className="pi-interest-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <h4 className="pi-interest-title">{item.title}</h4>
                  <p className="pi-interest-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Additional specialisations */}
          <div className="pi-tags-row">
            <span className="pi-tag">BL Lac Objects</span>
            <span className="pi-tag">FSRQs</span>
            <span className="pi-tag">Jet Formation</span>
            <span className="pi-tag">Flux Variability</span>
            <span className="pi-tag">Spectral Analysis</span>
          </div>
        </section>

        {/* ──── Academic & Professional ──── */}
        <section className="pi-section">
          <div className="pi-section-header">
            <GraduationCap size={20} className="pi-section-icon" />
            <h3>Academic &amp; Professional Background</h3>
          </div>
          <div className="glass-card pi-academic-card">
            <div className="pi-academic-grid">
              <div className="pi-academic-item">
                <GraduationCap size={28} className="pi-academic-icon" />
                <div>
                  <h5>PhD in Astrophysics</h5>
                  <p>Doctoral research focused on high-energy emission processes in Active Galactic Nuclei.</p>
                </div>
              </div>
              <div className="pi-academic-item">
                <Globe size={28} className="pi-academic-icon" />
                <div>
                  <h5>International Postdoctoral Fellow</h5>
                  <p>Postdoctoral research at various international institutions, expanding collaborative networks.</p>
                </div>
              </div>
              <div className="pi-academic-item">
                <Microscope size={28} className="pi-academic-icon" />
                <div>
                  <h5>Space-Based Telescope Expertise</h5>
                  <p>Extensive data-analysis experience with leading space observatories.</p>
                </div>
              </div>
            </div>

            {/* Telescope chips */}
            <div className="pi-telescope-row">
              <span className="pi-telescope-label">Telescope Expertise</span>
              <div className="pi-telescope-chips">
                {telescopes.map((t) => (
                  <span key={t} className="pi-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──── Teaching ──── */}
        <section className="pi-section">
          <div className="pi-section-header">
            <BookOpen size={20} className="pi-section-icon" />
            <h3>Teaching at IIT Indore</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {teachingCourses.map((course, i) => (
              <div key={i} className="glass-card pi-teaching-card">
                <BookOpen size={20} className="pi-teaching-icon" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ──── Honors & Activities ──── */}
        <section className="pi-section">
          <div className="pi-section-header">
            <Award size={20} className="pi-section-icon" />
            <h3>Selected Honors &amp; Activities</h3>
          </div>
          <div className="glass-card pi-honors-card">
            <ul className="pi-honors-list">
              {honors.map((h, i) => (
                <li key={i}>
                  <Star size={14} className="pi-honor-star" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Contact CTA ──── */}
        <section className="pi-section pi-contact-section">
          <div className="glass-card pi-contact-card text-center">
            <Mail size={32} className="pi-contact-icon" />
            <h3>Get in Touch</h3>
            <p>
              Interested in collaborating or joining URJA Lab? Reach out to explore research
              opportunities in high-energy astrophysics.
            </p>
            <div className="pi-contact-actions">
              <a
                href="https://sites.google.com/iiti.ac.in/welcome/home"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <Globe size={16} /> Visit Website <ExternalLink size={14} />
              </a>
              <Link to="/opportunities" className="btn btn-outline">
                Open Positions
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ──── Scoped Styles ──── */}
      <style>{`
        /* ── Profile Section ─────────────────── */
        .pi-profile-section {
          margin-bottom: var(--space-xl);
        }
        .pi-tilt-wrapper {
          width: 100%;
        }
        .pi-profile-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
        }
        .pi-avatar-ring {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 100%);
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 32px rgba(59,130,246,0.25), 0 0 64px rgba(139,92,246,0.12);
        }
        .pi-avatar-initials {
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          border-radius: 50%;
          background: var(--bg-void);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-blue-light);
          letter-spacing: 0.04em;
        }

        .pi-info { flex: 1; }
        .pi-name {
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          margin-bottom: 0.2rem;
        }
        .pi-title-role {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent-blue-light);
          margin-bottom: 0.25rem;
        }
        .pi-department {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: 0.15rem;
        }
        .pi-institute {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }
        .pi-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .pi-meta-item {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }
        .pi-meta-item svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pi-links-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        /* ── Section Headers ─────────────────── */
        .pi-section {
          margin-bottom: var(--space-xl);
        }
        .pi-section-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .pi-section-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }
        .pi-section-icon {
          color: var(--accent-blue-light);
        }

        /* ── Research Interest Cards ─────────── */
        .pi-interest-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .pi-interest-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue-light);
          margin-bottom: 0.25rem;
        }
        .pi-interest-title {
          font-size: 1.05rem;
          margin-bottom: 0;
        }
        .pi-interest-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 0;
        }

        /* Tags */
        .pi-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }
        .pi-tag {
          font-size: 0.78rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          color: var(--accent-blue-light);
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: var(--radius-pill);
          padding: 0.3rem 0.85rem;
          letter-spacing: 0.02em;
        }

        /* ── Academic Card ───────────────────── */
        .pi-academic-card {
          padding: 2rem;
        }
        .pi-academic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .pi-academic-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .pi-academic-icon {
          color: var(--accent-blue-light);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pi-academic-item h5 {
          margin-bottom: 0.35rem;
        }
        .pi-academic-item p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0;
          line-height: 1.5;
        }
        .pi-telescope-row {
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pi-telescope-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .pi-telescope-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pi-chip {
          font-size: 0.82rem;
          font-family: 'Space Grotesk', monospace;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: var(--radius-pill);
          padding: 0.25rem 0.75rem;
        }

        /* ── Teaching Cards ──────────────────── */
        .pi-teaching-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1.4rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .pi-teaching-icon {
          color: var(--accent-blue-light);
          flex-shrink: 0;
        }

        /* ── Honors ──────────────────────────── */
        .pi-honors-card {
          padding: 2rem;
        }
        .pi-honors-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pi-honors-list li {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .pi-honor-star {
          color: var(--accent-blue-light);
          flex-shrink: 0;
        }

        /* ── Contact CTA ─────────────────────── */
        .pi-contact-section {
          margin-bottom: 0;
        }
        .pi-contact-card {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(
            135deg,
            rgba(59,130,246,0.06) 0%,
            rgba(139,92,246,0.06) 100%
          ), var(--glass-bg);
          border: 1px solid rgba(59,130,246,0.15);
        }
        .pi-contact-icon {
          color: var(--accent-blue-light);
          margin-bottom: 0.25rem;
        }
        .pi-contact-card h3 {
          margin-bottom: 0;
        }
        .pi-contact-card p {
          max-width: 520px;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .pi-contact-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        /* ── Responsive ──────────────────────── */
        @media (max-width: 900px) {
          .pi-profile-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .pi-meta-row { justify-content: center; }
          .pi-links-row { justify-content: center; }
          .pi-academic-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .pi-avatar-ring {
            width: 100px;
            height: 100px;
          }
          .pi-avatar-initials {
            font-size: 2rem;
          }
          .pi-profile-card {
            padding: 1.75rem 1.25rem;
            gap: 1.5rem;
          }
          .pi-section-header h3 {
            font-size: 1.25rem;
          }
          .pi-interest-card {
            padding: 1.25rem;
          }
          .pi-academic-card {
            padding: 1.25rem;
          }
          .pi-teaching-card {
            padding: 1rem 1.25rem;
            font-size: 0.88rem;
          }
          .pi-contact-card {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PI;
