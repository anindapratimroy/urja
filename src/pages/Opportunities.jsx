import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Loader2, ChevronRight, GraduationCap, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const { data, loading, error } = useGoogleAppsScript();

  if (loading) return (
    <div className="loading-screen">
      <Loader2 size={40} className="spinner" />
      <p>Loading opportunities...</p>
    </div>
  );

  if (error) return (
    <div className="loading-screen">
      <p style={{ color: 'var(--text-muted)' }}>Unable to load data. Please check back later.</p>
    </div>
  );

  const opportunities = data.opportunities || [];

  return (
    <div className="opportunities-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Join Us</span>
          <h1>Open <span className="text-gradient">Opportunities</span></h1>
          <p className="page-hero-desc">
            We welcome motivated students and researchers eager to explore the frontiers of
            high-energy astrophysics and relativistic jet physics.
          </p>
        </div>
      </div>

      <div className="container page-body">

        {/* General invite */}
        <div className="glass-card invite-card">
          <div className="invite-icon"><GraduationCap size={32} color="var(--accent-cyan)" /></div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Interested in Joining URJA Lab?</h3>
            <p style={{ marginBottom: '1rem' }}>
              We are always looking for passionate PhD students, Master's students, and postdoctoral
              researchers. If you are interested in high-energy astrophysics, multi-wavelength
              observations, or jet physics — feel free to reach out to Dr. Amit Shukla directly.
            </p>
            <a href="mailto:amit@iiti.ac.in" className="btn">
              <Mail size={16} /> Contact the PI
            </a>
          </div>
        </div>

        {/* Specific openings */}
        {opportunities.length > 0 && (
          <div className="opp-list" style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Current Openings</h2>
            <div className="grid grid-cols-2 gap-4">
              {opportunities.map((opp, index) => (
                <div key={index} className="glass-card opp-card">
                  <div className="opp-header">
                    <h4 className="opp-title">{opp.title || 'Position Title'}</h4>
                    {opp.type && <span className="opp-type-badge">{opp.type}</span>}
                  </div>
                  {opp.description && <p className="opp-desc">{opp.description}</p>}
                  <div className="opp-footer">
                    {opp.deadline && (
                      <span className="opp-deadline">
                        <Clock size={14} /> Deadline: {opp.deadline}
                      </span>
                    )}
                    {opp.link && (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer" className="opp-apply">
                        Apply <ChevronRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {opportunities.length === 0 && (
          <div className="glass-card text-center" style={{ marginTop: '2rem', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
              No specific openings listed at this time. Please check back later or reach out directly.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .page-hero {
          padding: 5rem 0 3rem;
          background: linear-gradient(to bottom, rgba(59,130,246,0.05), transparent);
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 4rem;
        }
        .page-hero h1 { margin-bottom: 0.75rem; font-size: clamp(2rem, 5vw, 3rem); }
        .page-hero-desc { font-size: 1.15rem; color: var(--text-secondary); max-width: 560px; margin: 0; }
        .page-body { padding-bottom: 5rem; }

        .invite-card {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .invite-icon {
          width: 64px; height: 64px; flex-shrink: 0;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }

        .opp-card { display: flex; flex-direction: column; }
        .opp-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; }
        .opp-title { margin-bottom: 0; font-size: 1.1rem; }
        .opp-type-badge {
          flex-shrink: 0;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.7rem;
          border-radius: 100px;
          background: rgba(59,130,246,0.12);
          color: var(--accent-cyan);
          border: 1px solid rgba(59,130,246,0.25);
        }
        .opp-desc { font-size: 0.95rem; color: var(--text-secondary); flex: 1; margin-bottom: 1.25rem; }
        .opp-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
          margin-top: auto;
        }
        .opp-deadline {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem; color: var(--text-muted);
        }
        .opp-apply {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 0.9rem; font-weight: 600;
          color: var(--accent-cyan);
          font-family: 'Space Grotesk', sans-serif;
          transition: gap 0.2s;
        }
        .opp-apply:hover { gap: 0.5rem; color: #93C5FD; }

        .loading-screen {
          min-height: 60vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; color: var(--text-muted);
        }
        .spinner { animation: spin 1.2s linear infinite; color: var(--accent-cyan); }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent-cyan); margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .invite-card { flex-direction: column; gap: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default Opportunities;
