import React from 'react';
import Tilt from 'react-parallax-tilt';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import {
  GraduationCap, Telescope, BookOpen, MapPin, ExternalLink,
  Globe, Star, Briefcase, FileText, MonitorPlay, Users, CheckCircle2, Bookmark, Loader2
} from 'lucide-react';

const researchInterests = [
  { icon: Telescope, title: 'High-Energy Astrophysics', desc: 'Probing the most energetic phenomena in the universe through multi-wavelength and multi-messenger observations.' },
  { icon: Star, title: 'Ultra-Relativistic Jets in AGN', desc: 'Studying the formation, propagation, and emission mechanisms of relativistic jets in Active Galactic Nuclei and GRBs.' },
  { icon: MonitorPlay, title: 'Time-domain Astronomy', desc: 'Analysing transient and variable high-energy astrophysical events across the electromagnetic spectrum.' },
  { icon: Telescope, title: 'Cherenkov Telescopes', desc: 'Working with Atmospheric Cherenkov Telescopes and detectors for gamma-ray astronomy.' }
];

const positions = [
  { title: 'Associate Professor', institution: 'IIT Indore, India', duration: 'Oct 2019 – Present' },
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
  const { data, loading, error } = useGoogleAppsScript();

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      <p>Loading PI Profile...</p>
    </div>
  );

  const activeMembers = (data.people || []).filter(member => {
    if (member.affiliation && member.affiliation.trim() !== '') return false;
    if (member.gradYear && parseInt(member.gradYear) < new Date().getFullYear()) return false;
    return true;
  });

  const highlights = data.publications || [];

  return (
    <div className="w-full">
      {/* ──── Page Hero ──── */}
      <div className="py-20 md:py-28 bg-gradient-to-b from-slate-800/40 to-transparent border-b border-white/5 mb-12 text-center">
        <span className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-accent-cyan mb-4">Lab Leadership</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl">Principal <span className="text-gradient">Investigator</span></h1>
      </div>

      {/* ──── Page Body ──── */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-12 md:gap-16 pb-8 md:pb-12">

        {/* ──── Profile Card ──── */}
        <section>
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true} glareMaxOpacity={0.05} glarePosition="all" scale={1.01}>
            <div className="glass-card flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 md:gap-12 p-8 md:p-12">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[3px] border-accent-blue/50 flex items-center justify-center bg-accent-blue/10 shrink-0 relative shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <span className="font-space text-4xl md:text-5xl font-bold text-accent-blue">AS</span>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-3xl md:text-5xl font-extrabold m-0">Dr. Amit <span className="text-gradient">Shukla</span></h2>
                <p className="text-lg md:text-xl font-semibold text-accent-cyan m-0">Associate Professor</p>
                <div className="text-slate-400 space-y-1 text-sm md:text-base">
                  <p className="m-0">Discipline of Astronomy, Astrophysics &amp; Space Engineering (DAASE)</p>
                  <p className="m-0">Indian Institute of Technology (IIT) Indore</p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm mt-2 md:mt-4">
                  <MapPin size={18} className="shrink-0 text-slate-500" />
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-cyan transition-colors"
                  >
                    POD 1E 402, IIT Indore, Simrol, Khandwa Road, Indore — 453552
                  </a>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                  <a href="https://sites.google.com/iiti.ac.in/welcome/home" target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                    <Globe size={16} /> Personal Website <ExternalLink size={14} />
                  </a>
                  <a href="https://scholar.google.com/citations?hl=en&authuser=2&user=A-bgSX5TSyMC" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                    <FileText size={16} /> Google Scholar
                  </a>
                  <a href="https://orcid.org/0000-0002-5656-2657" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                    <FileText size={16} /> ORCID
                  </a>
                </div>
              </div>
            </div>
          </Tilt>
        </section>

        {/* ──── Bio ──── */}
        <section>
          <div className="glass-card p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Users size={28} className="text-accent-cyan" /> About Me
            </h3>
            <div className="space-y-4 text-base md:text-lg text-slate-300 leading-relaxed">
              <p>
                Hi, I am an Associate Professor at the Discipline of Astronomy, Astrophysics and Space Engineering at the Indian Institute of Technology Indore.
              </p>
              <p>
                My primary research interest is to study gamma-ray Astronomy, Active Galactic Nuclei (AGN), Blazars, and High Energy Astrophysics using multi-wavelength & multi-messenger observations. In particular, my research interests include the study of astrophysical jets, AGN, and Gamma-Ray Bursts (GRBs).
              </p>
            </div>
          </div>
        </section>

        {/* ──── Research Interests ──── */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Telescope size={28} className="text-accent-cyan" /> Broad Research Interests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {researchInterests.map((item, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8 hover:border-blue-400/40 hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center text-accent-cyan mb-6">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──── Research Highlights ──── */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Star size={28} className="text-accent-cyan" /> Research Highlights
          </h3>
          <div className="glass-card p-8 md:p-10">
            {highlights.length > 0 ? (
              <ul className="space-y-6 md:space-y-8">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-accent-cyan shrink-0 mt-1" />
                    <div>
                      <strong className="text-lg md:text-xl text-slate-200 block mb-2">{h.title}</strong>
                      <span className="text-sm md:text-base text-slate-400 block">{h.journalInfo || h.journal} {h.authors && `— ${h.authors}`}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 m-0">Highlights will be updated soon from the lab database.</p>
            )}
          </div>
        </section>

        {/* ──── Academic & Research Positions ──── */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Briefcase size={28} className="text-accent-cyan" /> Academic & Research Positions
          </h3>
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col gap-8 md:gap-10">
              {positions.map((pos, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row gap-4 md:gap-10 md:pb-10 last:pb-0">
                  <div className="hidden md:block absolute left-3 top-8 bottom-[-40px] w-0.5 bg-white/10 last-of-type:hidden" />
                  <div className="hidden md:block w-6 h-6 rounded-full bg-accent-cyan shrink-0 mt-1.5 relative z-10 shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
                  <div>
                    <span className="block text-sm md:text-base font-bold text-accent-blue tracking-wider uppercase mb-2">{pos.duration}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{pos.title}</h4>
                    <p className="text-base md:text-lg text-slate-400 m-0">{pos.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── Education ──── */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap size={28} className="text-accent-cyan" /> Education
          </h3>
          <div className="glass-card p-8 md:p-10">
            <ul className="space-y-6 md:space-y-8">
              {education.map((edu, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Bookmark size={24} className="text-accent-cyan shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg md:text-xl text-slate-200 block mb-2">{edu.degree}</strong>
                    <span className="text-sm md:text-base text-slate-400 block">{edu.institute}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Media Attention ──── */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <MonitorPlay size={28} className="text-accent-cyan" /> Media Attention to Our Research
          </h3>
          <div className="glass-card p-8 md:p-10">
            <ul className="space-y-6 md:space-y-8">
              {media.map((m, i) => (
                <li key={i} className="flex items-start gap-4">
                  <ExternalLink size={24} className="text-accent-cyan shrink-0 mt-1" />
                  <div>
                    <p className="text-base md:text-lg text-slate-300 m-0 mb-3 leading-relaxed">
                      <strong className="text-white">{m.source}</strong>: {m.desc}
                    </p>
                    {m.link !== '#' && (
                      <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-accent-cyan transition-colors font-semibold inline-flex items-center gap-1">
                        Read Article &rarr;
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ──── Teaching & Collaborations ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <section>
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen size={28} className="text-accent-cyan" /> Teaching (Courses)
            </h3>
            <div className="glass-card p-6 md:p-8 h-[calc(100%-4rem)]">
              <ul className="space-y-4">
                {courses.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300 leading-relaxed">
                    <CheckCircle2 size={20} className="text-accent-blue shrink-0 mt-0.5" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <Users size={28} className="text-accent-cyan" /> Collaborations & Group
            </h3>
            <div className="glass-card p-6 md:p-8 h-[calc(100%-4rem)]">
              <h4 className="text-lg md:text-xl font-bold text-white mb-4">Collaborations & Memberships</h4>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8">
                <strong className="text-slate-300">Member:</strong> FACT, CTA-India, & HAGAR<br/>
                <strong className="text-slate-300">Collaborate with:</strong> MAGIC, HESS, Fermi-LAT & AstroSat
              </p>
              
              <h4 className="text-lg md:text-xl font-bold text-white mb-4">Current Group Members</h4>
              {activeMembers.length > 0 ? (
                <ul className="space-y-4">
                  {activeMembers.map((member, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-slate-300">
                      <Users size={18} className="text-accent-blue shrink-0" /> {member.name} {member.role ? `(${member.role})` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 m-0">Group members will be updated soon.</p>
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default PI;
