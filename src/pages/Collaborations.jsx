import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Loader2, Globe, ExternalLink, Building2 } from 'lucide-react';

const Collaborations = () => {
  const { data, error } = useGoogleAppsScript();


  if (error) return (
    <div className="loading-screen">
      <p style={{ color: 'var(--text-muted)' }}>Unable to load data. Please check back later.</p>
    </div>
  );

  const collaborations = data.collaborations || [];

  return (
    <div className="collaborations-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Global Network</span>
          <h1>Research <span className="text-gradient">Collaborations</span></h1>
          <p className="page-hero-desc">
            URJA Lab maintains active collaborations with leading research institutes,
            observatories, and universities around the world.
          </p>
        </div>
      </div>

      <div className="container page-body">
        {collaborations.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {collaborations.map((collab, index) => (
              <div key={index} className="glass-card collab-card">
                <div className="collab-icon">
                  <Building2 size={24} color="var(--accent-cyan)" />
                </div>
                <div className="collab-body">
                  <h4 className="collab-name">{collab.institution || 'Institution'}</h4>
                  {collab.country && <p className="collab-country"><Globe size={13} /> {collab.country}</p>}
                  {collab.project && <p className="collab-project">{collab.project}</p>}
                  {collab.pi && <p className="collab-pi">PI: <span style={{ color: 'var(--text-secondary)' }}>{collab.pi}</span></p>}
                </div>
                {collab.link && (
                  <a href={collab.link} target="_blank" rel="noopener noreferrer" className="collab-link">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center empty-collab">
            <Globe size={52} color="var(--text-muted)" />
            <h3 style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Collaborations Updating</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 0' }}>
              Our network of global research partnerships will be listed here once the database is updated.
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

        .collab-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.75rem;
          position: relative;
        }
        .collab-icon {
          flex-shrink: 0;
          width: 52px; height: 52px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .collab-body { flex: 1; }
        .collab-name { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .collab-country {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.82rem; color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .collab-project { font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 0.4rem; }
        .collab-pi { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0; font-weight: 500; }
        .collab-link {
          flex-shrink: 0;
          color: var(--text-muted);
          padding: 0.4rem;
          border-radius: 6px;
          border: 1px solid var(--glass-border);
          display: flex; align-items: center;
          transition: all 0.2s;
        }
        .collab-link:hover {
          color: var(--accent-cyan);
          border-color: rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.08);
        }

        .empty-collab {
          padding: 5rem 2rem;
          display: flex; flex-direction: column; align-items: center;
        }

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
      `}</style>
    </div>
  );
};

export default Collaborations;
