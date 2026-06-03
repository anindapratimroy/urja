import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Loader2, ExternalLink, FileText, Calendar, Users as AuthorsIcon } from 'lucide-react';

const Publications = () => {
  const { data, loading, error } = useGoogleAppsScript();

  if (loading) return (
    <div className="loading-screen">
      <Loader2 size={40} className="spinner" />
      <p>Loading publications...</p>
    </div>
  );

  if (error) return (
    <div className="loading-screen">
      <p style={{ color: 'var(--text-muted)' }}>Unable to load data. Please check back later.</p>
    </div>
  );

  const publications = data.publications || [];

  return (
    <div className="publications-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Research Output</span>
          <h1><span className="text-gradient">Publications</span></h1>
          <p className="page-hero-desc">
            Peer-reviewed research articles, conference proceedings, and preprints from URJA Lab.
          </p>
        </div>
      </div>

      <div className="container page-body">
        {publications.length > 0 ? (
          <div className="pub-list">
            {publications.map((pub, index) => (
              <div key={index} className="glass-card pub-card">
                <div className="pub-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="pub-content">
                  <h3 className="pub-title">{pub.title || 'Untitled'}</h3>
                  <div className="pub-meta-row">
                    {pub.authors && (
                      <span className="pub-meta-item">
                        <AuthorsIcon size={14} />
                        {pub.authors}
                      </span>
                    )}
                    {pub.year && (
                      <span className="pub-meta-item">
                        <Calendar size={14} />
                        {pub.year}
                      </span>
                    )}
                  </div>
                  {pub.journal && (
                    <div className="pub-journal">
                      <FileText size={14} />
                      <span className="text-gradient">{pub.journal}</span>
                    </div>
                  )}
                  {pub.abstract && (
                    <p className="pub-abstract">{pub.abstract}</p>
                  )}
                  <div className="pub-footer">
                    {pub.doi && (
                      <span className="pub-doi">DOI: {pub.doi}</span>
                    )}
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                        Read Paper <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center empty-pub">
            <FileText size={48} color="var(--text-muted)" />
            <h3 style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Publications Coming Soon</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 0, maxWidth: '480px', margin: '0 auto' }}>
              Research articles will appear here once added to the lab database.
              In the meantime, check our collaborators' pages or arXiv for recent work.
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

        .pub-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .pub-card {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          padding: 2rem;
        }
        .pub-index {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255,255,255,0.08);
          line-height: 1;
          flex-shrink: 0;
          min-width: 48px;
          padding-top: 0.2rem;
        }
        .pub-content { flex: 1; }
        .pub-title {
          font-size: 1.2rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .pub-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .pub-meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .pub-journal {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .pub-abstract {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pub-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }
        .pub-doi {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: monospace;
          background: rgba(255,255,255,0.04);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.82rem;
        }

        .empty-pub {
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .loading-screen {
          min-height: 60vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem;
          color: var(--text-muted);
        }
        .spinner { animation: spin 1.2s linear infinite; color: var(--accent-cyan); }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .pub-card { flex-direction: column; gap: 1rem; }
          .pub-index { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
};

export default Publications;
