import React from 'react';
import Tilt from 'react-parallax-tilt';
import {
  GraduationCap,
  Telescope,
  BookOpen,
  MapPin,
  ExternalLink,
  Globe,
  Star,
  Briefcase,
  FileText,
  MonitorPlay,
  Users,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

const researchInterests = [
  { icon: Telescope, title: 'High-Energy Astrophysics', desc: 'Probing the most energetic phenomena in the universe through multi-wavelength and multi-messenger observations.' },
  { icon: Star, title: 'Ultra-Relativistic Jets in AGN', desc: 'Studying the formation, propagation, and emission mechanisms of relativistic jets in Active Galactic Nuclei and GRBs.' },
  { icon: MonitorPlay, title: 'Time-domain Astronomy', desc: 'Analysing transient and variable high-energy astrophysical events across the electromagnetic spectrum.' },
  { icon: Telescope, title: 'Cherenkov Telescopes', desc: 'Working with Atmospheric Cherenkov Telescopes and detectors for gamma-ray astronomy.' }
];

const positions = [
  { title: 'Assistant Professor', institution: 'IIT Indore, India', duration: 'Oct 2019 – Present' },
  { title: 'Visitor Post Doctoral Fellow', institution: 'IUCAA, Pune, India', duration: 'Jan 2019 – Aug 2019' },
  { title: 'Post Doctoral Fellow', institution: 'University of Würzburg, Germany', duration: 'Mar 2016 – Sep 2018' },
  { title: 'Post Doctoral Fellow', institution: 'ETH Zurich, Switzerland', duration: 'Nov 2014 – Nov 2015' },
  { title: 'Post Doctoral Fellow', institution: 'TIFR, Mumbai, India', duration: 'May 2013 – Nov 2014' },
];

const education = [
  { degree: 'Ph.D. in Astrophysics', institute: 'Indian Institute of Astrophysics, Bangalore' },
  { degree: 'M.Sc. in Physics', institute: 'University of Pune' },
  { degree: 'B.Sc.', institute: 'P. P. N. College, C. S. J. M. University, Kanpur' },
];

const highlights = [
  { title: 'Detection of the observational signature of Poynting flux dominated jet', details: 'Nature Communications, Volume 11, article id. 4176 (2020)', authors: 'Shukla and Mannheim' },
  { title: 'Detection of minute-scale γ-ray variability in CTA 102', details: 'The Astrophysical Journal Letters, Vol. 854, L26 (2018)', authors: '' },
  { title: 'Detection of hardest γ-ray spectrum above 10 GeV in Mrk 501', details: 'The Astrophysical Journal, Vol. 832, 177 (2016)', authors: '' },
];

const media = [
  { source: 'PhysicsWorld', desc: 'Magnetic reconnection drives mini-jets in blazar | Spinning black hole powers jet by magnetic flux', link: 'https://www.eurekalert.org/pub_releases/2020-08/uow-sbh082120.php' },
  { source: 'Physics.Org', desc: 'Research investigates variability of the blazar Mrk 421', link: 'https://phys.org/news/2021-02-variability-blazar-mrk.html' },
  { source: 'Dainik Bhaskar', desc: 'Where do light rays come from the black holes... Professor of Indore IIT found out in research', link: '#' },
];

const courses = [
  'AA 201: Introduction to Astronomy and Astrophysics',
  'AA 202N: Astronomical Techniques',
  'AA 472/672: Galactic and Extra-galactic Astronomy',
  'AA 601N: Astrophysical Fluids and Plasma',
  'AA 602: Advanced Topics in Astronomy and Astrophysics',
  'AA 608: Astrostatistics',
  'AA 652: Astronomy Laboratory I'
];

const PI = () => {
  return (
    <div className="pi-page">
      {/* ──── Page Hero ──── */}
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Lab Leadership</span>
          <h1>Principal <span className="text-gradient">Investigator</span></h1>
        </div>
      </div>

      {/* ──── Page Body ──── */}
      <div className="container page-body">

        {/* ──── Profile Card ──── */}
        <section className="pi-profile-section">
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glareMaxOpacity={0.05}
            glarePosition="all"
            glareBorderRadius="18px"
            scale={1.01}
            className="pi-tilt-wrapper"
          >
            <div className="glass-card pi-profile-card">
              <div className="pi-avatar-ring">
                <span className="pi-avatar-initials">AS</span>
              </div>

              <div className="pi-info">
                <h2 className="pi-name">Dr. Amit <span className="text-gradient">Shukla</span></h2>
                <p className="pi-title-role">Assistant Professor</p>
                <p className="pi-department">
                  Discipline of Astronomy, Astrophysics &amp; Space Engineering (DAASE)
                </p>
                <p className="pi-institute">Indian Institute of Technology (IIT) Indore</p>

                <div className="pi-meta-row">
                  <span className="pi-meta-item">
                    <MapPin size={18} style={{ flexShrink: 0 }} />
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Department+of+Astronomy,+Astrophysics+%26+Space+Engineering,+IIT+Indore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pi-meta-link"
                    >
                      POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
                    </a>
                  </span>
                </div>

                <div className="pi-links-row">
                  <a
                    href="https://sites.google.com/iiti.ac.in/welcome/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                  >
                    <Globe size={18} /> Personal Website <ExternalLink size={15} />
                  </a>
                  <a
                    href="https://scholar.google.com/citations?hl=en&authuser=2&user=A-bgSX5TSyMC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    <FileText size={18} /> Google Scholar
                  </a>
                  <a
                    href="https://orcid.org/0000-0002-5656-2657"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    <FileText size={18} /> ORCID
                  </a>
                </div>
              </div>
            </div>
          </Tilt>
        </section>

        {/* ──── Bio ──── */}
        <section className="pi-bio-section">
          <div className="glass-card bio-card">
            <h3 className="section-title"><Users size={28} className="title-icon" /> About Me</h3>
            <p className="large-text">
              Hi, I am an Assistant Professor at the Discipline of Astronomy, Astrophysics and Space Engineering at the Indian Institute of Technology Indore.
            </p>
            <p className="large-text">
              My primary research interest is to study gamma-ray Astronomy, Active Galactic Nuclei (AGN), Blazars, and High Energy Astrophysics using multi-wavelength & multi-messenger observations. In particular, my research interests include the study of astrophysical jets, AGN, and Gamma-Ray Bursts (GRBs).
            </p>
          </div>
        </section>

        {/* ──── Research Interests ──── */}
        <section className="pi-content-section">
          <h3 className="section-title"><Telescope size={28} className="title-icon" /> Broad Research Interests</h3>
          <div className="interests-grid">
            {researchInterests.map((item, idx) => (
              <div key={idx} className="glass-card interest-card">
                <div className="interest-icon-wrapper">
                  <item.icon size={26} className="interest-icon" />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──── Research Highlights ──── */}
        <section className="pi-content-section">
          <h3 className="section-title"><Star size={28} className="title-icon" /> Research Highlights</h3>
          <div className="glass-card highlights-card">
            <ul className="large-list">
              {highlights.map((h, i) => (
                <li key={i}>
                  <CheckCircle2 size={24} className="list-icon" />
                  <div>
                    <strong>{h.title}</strong>
                    <br />
                    <span className="highlight-details">{h.details} {h.authors && `— ${h.authors}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Academic & Research Positions ──── */}
        <section className="pi-content-section">
          <h3 className="section-title"><Briefcase size={28} className="title-icon" /> Academic & Research Positions</h3>
          <div className="glass-card timeline-card">
            {positions.map((pos, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-duration">{pos.duration}</span>
                  <h4 className="timeline-title">{pos.title}</h4>
                  <p className="timeline-institute">{pos.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──── Education ──── */}
        <section className="pi-content-section">
          <h3 className="section-title"><GraduationCap size={28} className="title-icon" /> Education</h3>
          <div className="glass-card education-card">
            <ul className="large-list">
              {education.map((edu, i) => (
                <li key={i}>
                  <Bookmark size={24} className="list-icon" />
                  <div>
                    <strong>{edu.degree}</strong>
                    <br />
                    <span className="education-institute">{edu.institute}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Media Attention ──── */}
        <section className="pi-content-section">
          <h3 className="section-title"><MonitorPlay size={28} className="title-icon" /> Media Attention to Our Research</h3>
          <div className="glass-card media-card">
            <ul className="large-list">
              {media.map((m, i) => (
                <li key={i}>
                  <ExternalLink size={24} className="list-icon" />
                  <div>
                    <strong>{m.source}</strong>: {m.desc}
                    <br />
                    {m.link !== '#' && (
                      <a href={m.link} target="_blank" rel="noopener noreferrer" className="media-link">Read Article &rarr;</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Teaching & Collaborations ──── */}
        <div className="pi-grid-2">
          <section className="pi-content-section">
            <h3 className="section-title"><BookOpen size={28} className="title-icon" /> Teaching (Courses)</h3>
            <div className="glass-card list-card">
              <ul className="compact-list">
                {courses.map((c, i) => (
                  <li key={i}><CheckCircle2 size={20} className="list-icon-sm" /> {c}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="pi-content-section">
            <h3 className="section-title"><Users size={28} className="title-icon" /> Collaborations & Group</h3>
            <div className="glass-card list-card">
              <h4 className="sub-heading">Collaborations & Memberships</h4>
              <p className="compact-text">
                <strong>Member:</strong> FACT, CTA-India, & HAGAR<br/>
                <strong>Collaborate with:</strong> MAGIC, HESS, Fermi-LAT & AstroSat
              </p>
              
              <h4 className="sub-heading mt-4">Current Group Members</h4>
              <ul className="compact-list">
                <li><Users size={18} className="list-icon-sm" /> Ms. Sushmita Agarwal (PhD)</li>
                <li><Users size={18} className="list-icon-sm" /> Mr. Anurag Arya (M.Sc)</li>
                <li><Users size={18} className="list-icon-sm" /> Mr. Chandan K Das (M.Sc)</li>
                <li><Users size={18} className="list-icon-sm" /> Mr. Jincen Jose (M.Sc)</li>
                <li><Users size={18} className="list-icon-sm" /> Mr. Jishnu Vijayan (M.Sc)</li>
              </ul>
            </div>
          </section>
        </div>

      </div>

      <style>{`
        .pi-page {
          min-height: 100vh;
          padding-bottom: 2rem;
        }

        .page-hero {
          padding: 4rem 0 1rem;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, transparent 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .page-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .page-hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .page-body {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }
        
        .title-icon {
          color: var(--accent-cyan);
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 2rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ──── Profile Card ──── */
        .pi-profile-card {
          display: flex;
          gap: 4rem;
          align-items: center;
        }

        .pi-avatar-ring {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 3px solid rgba(59, 130, 246, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 130, 246, 0.1);
          flex-shrink: 0;
        }

        .pi-avatar-initials {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--accent-blue);
        }

        .pi-info {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .pi-name {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }

        .pi-title-role {
          font-size: 1.3rem;
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .pi-department, .pi-institute {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        .pi-meta-row {
          margin: 1.8rem 0;
        }
        
        .pi-meta-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.1rem;
          color: var(--text-secondary);
        }
        
        .pi-meta-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .pi-meta-link:hover {
          color: var(--accent-cyan);
        }

        .pi-links-row {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        
        .btn-sm {
          font-size: 1.05rem;
          padding: 0.6rem 1.4rem;
        }

        /* ──── General Typography ──── */
        .large-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
        }

        .large-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .large-list li {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }

        .list-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .highlight-details, .education-institute {
          font-size: 1.1rem;
          color: var(--text-secondary);
          display: inline-block;
          margin-top: 0.5rem;
        }
        
        .media-link {
          color: var(--accent-blue);
          font-size: 1.05rem;
          text-decoration: none;
          display: inline-block;
          margin-top: 0.8rem;
          transition: color 0.2s ease;
        }
        .media-link:hover {
          color: var(--accent-cyan);
        }

        /* ──── Grid Sections ──── */
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
        }

        .interest-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .interest-card:hover {
          transform: translateY(-5px);
          border-color: rgba(96, 165, 250, 0.4);
        }

        .interest-icon-wrapper {
          width: 65px;
          height: 65px;
          border-radius: 12px;
          background: rgba(59, 130, 246, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .interest-card h4 {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
        }

        .interest-card p {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* ──── Timeline ──── */
        .timeline-card {
          padding: 2rem 2.5rem;
        }

        .timeline-item {
          display: flex;
          gap: 2.5rem;
          position: relative;
          padding-bottom: 2.5rem;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 11px; /* Center of dot */
          top: 35px;
          bottom: -10px;
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
        }
        .timeline-item:last-child::before {
          display: none;
        }

        .timeline-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 5px;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 15px rgba(45, 212, 191, 0.5);
        }

        .timeline-duration {
          font-size: 1.05rem;
          color: var(--accent-blue);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }

        .timeline-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .timeline-institute {
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        /* ──── 2 Column Grid ──── */
        .pi-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        
        .compact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .compact-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.5;
        }
        
        .list-icon-sm {
          color: var(--accent-blue);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        
        .sub-heading {
          font-size: 1.35rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.2rem;
        }
        
        .mt-4 {
          margin-top: 2rem;
        }
        
        .compact-text {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* ──── Responsive ──── */
        @media (max-width: 1024px) {
          .pi-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .pi-profile-card {
            flex-direction: column;
            text-align: center;
            gap: 2.5rem;
            padding: 2.5rem;
          }
          .pi-meta-item {
            justify-content: center;
          }
          .pi-links-row {
            justify-content: center;
          }
          .page-hero h1 {
            font-size: 3rem;
          }
          .pi-name {
            font-size: 2.8rem;
          }
          .large-text, .large-list li {
            font-size: 1.4rem;
          }
          .timeline-card {
            padding: 2.5rem;
          }
          .interests-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PI;
