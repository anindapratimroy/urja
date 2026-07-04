import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Globe, ExternalLink, Building2, User, MapPin, Network } from 'lucide-react';

const Collaborations = () => {
  const { data, error } = useGoogleAppsScript();

  if (error) return (
    <div className="loading-screen">
      <p style={{ color: 'var(--text-muted)' }}>Unable to load data. Please check back later.</p>
    </div>
  );

  const collaborations = data.collaborations || [];

  // Group collaborations by country
  const groupedCollabs = collaborations.reduce((acc, collab) => {
    const country = collab.country?.trim() || 'Global';
    if (!acc[country]) acc[country] = [];
    acc[country].push(collab);
    return acc;
  }, {});

  // Sort countries by number of collaborations (descending), then alphabetically
  const sortedCountries = Object.keys(groupedCollabs).sort((a, b) => {
    const diff = groupedCollabs[b].length - groupedCollabs[a].length;
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  return (
    <div className="collaborations-page">
      <div className="page-hero collab-hero">
        <div className="hero-background-icons">
          <Globe size={400} strokeWidth={0.5} className="bg-globe" />
        </div>
        <div className="container relative" style={{ zIndex: 1 }}>
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
          <div className="collaborations-list">
            {sortedCountries.map(country => (
              <div key={country} className="collab-country-group">
                <div className="country-header">
                  <MapPin size={22} className="country-icon" />
                  <h2>{country}</h2>
                  <div className="country-badge">{groupedCollabs[country].length}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  {groupedCollabs[country].map((collab, index) => (
                    <div key={index} className="glass-card collab-card">
                      <div className="collab-icon-wrapper">
                        <div className="collab-icon">
                          <User size={22} color="var(--accent-cyan)" />
                        </div>
                      </div>
                      
                      <div className="collab-body">
                        <h4 className="collab-name">{collab.name || 'Collaborator'}</h4>
                        {collab.type && <p className="collab-pi">{collab.type}</p>}
                        
                        {collab.affiliation && (
                          <p className="collab-affiliation">
                            <Building2 size={13} /> 
                            <span>{collab.affiliation}</span>
                          </p>
                        )}
                        
                        {collab.area && (
                          <div className="collab-area-wrapper">
                            <span className="area-label">Research Area</span>
                            <p className="collab-area">{collab.area}</p>
                          </div>
                        )}
                      </div>
                      
                      {collab.website && collab.website.trim() !== '' && (
                        <a 
                          href={collab.website.startsWith('http') ? collab.website : (collab.website.toLowerCase() === 'website' ? '#' : `https://${collab.website}`)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="collab-link"
                          title="Visit Website"
                          onClick={(e) => {
                            if(collab.website.toLowerCase() === 'website') {
                              e.preventDefault();
                              alert('Please update the Google Sheet to contain the raw URL (e.g., https://example.com) instead of the hyperlinked word "Website".');
                            }
                          }}
                        >
                          <ExternalLink size={24} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center empty-collab">
            <Network size={52} color="var(--text-muted)" />
            <h3 style={{ color: 'var(--text-secondary)', marginTop: '1.5rem' }}>Collaborations Updating</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 0' }}>
              Our network of global research partnerships will be listed here once the database is synchronized.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .collab-hero {
          padding: 6rem 0 4rem;
          background: radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%);
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }
        .hero-background-icons {
          position: absolute;
          right: -5%;
          top: -20%;
          color: rgba(59,130,246,0.03);
          pointer-events: none;
        }
        .bg-globe {
          animation: slowSpin 60s linear infinite;
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .page-hero h1 { margin-bottom: 0.75rem; font-size: clamp(2.5rem, 5vw, 3.5rem); }
        .page-hero-desc { font-size: 1.15rem; color: var(--text-secondary); max-width: 560px; margin: 0; line-height: 1.6; }
        
        .page-body { padding-bottom: 6rem; }

        .country-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 4rem 0 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .country-header h2 {
          margin: 0;
          font-size: 1.6rem;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .country-icon {
          color: var(--accent-blue-light);
        }
        .country-badge {
          background: rgba(59,130,246,0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 100px;
          padding: 0.1rem 0.6rem;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .collab-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.75rem;
          position: relative;
          background: rgba(20, 25, 40, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255,255,255,0.03);
        }
        .collab-card:hover {
          transform: translateY(-6px);
          background: rgba(30, 40, 60, 0.6);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 12px 30px -10px rgba(59, 130, 246, 0.15);
        }

        .collab-icon-wrapper {
          position: relative;
        }
        .collab-icon {
          flex-shrink: 0;
          width: 50px; height: 50px;
          background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.05));
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease;
        }
        .collab-card:hover .collab-icon {
          transform: scale(1.05) rotate(-5deg);
          border-color: rgba(59,130,246,0.5);
        }

        .collab-body { flex: 1; min-width: 0; }
        .collab-name { 
          font-size: 1.25rem; 
          margin-bottom: 0.2rem; 
          color: var(--text-primary);
        }
        .collab-pi { 
          font-size: 0.95rem; 
          color: var(--accent-cyan); 
          font-weight: 500; 
          margin-bottom: 0.75rem;
        }
        
        .collab-affiliation {
          display: flex; align-items: flex-start; gap: 0.4rem;
          font-size: 0.95rem; color: var(--text-secondary);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .collab-affiliation svg {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--text-muted);
        }
        
        .collab-area-wrapper {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px dashed rgba(255,255,255,0.08);
        }
        .area-label {
          display: block;
          font-size: 0.75rem; 
          text-transform: uppercase; 
          color: var(--text-muted); 
          letter-spacing: 0.08em;
          margin-bottom: 0.3rem;
        }
        .collab-area { 
          font-size: 1rem; 
          color: var(--text-secondary); 
          line-height: 1.5;
          margin: 0;
        }
        
        .collab-link {
          flex-shrink: 0;
          color: var(--text-muted);
          width: 50px; height: 50px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.02);
        }
        .collab-link:hover {
          color: var(--accent-cyan);
          border-color: rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.1);
          transform: translateY(-2px);
        }

        .empty-collab {
          padding: 6rem 2rem;
          display: flex; flex-direction: column; align-items: center;
        }

        .loading-screen {
          min-height: 60vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; color: var(--text-muted);
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--accent-cyan); margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Collaborations;
