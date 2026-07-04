import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { User, Loader2, Mail, ExternalLink, X } from 'lucide-react';

import imgAyush from '../assets/people/ayush_garg.jpeg';
import imgChandan from '../assets/people/chandan_kumar.jpg';
import imgShraddha from '../assets/people/shraddha.jpg';

const People = () => {
  const { data, error } = useGoogleAppsScript();
  const [selectedImage, setSelectedImage] = useState(null);


  if (error) return (
    <div className="loading-screen">
      <p style={{ color: 'var(--text-muted)' }}>Unable to load data. Please check back later.</p>
    </div>
  );

  const activeMembers = data.people?.active || [];
  const alumniMembers = data.people?.alumni || [];

  const getPhoto = (member) => {
    const name = (member.name || '').toLowerCase();
    if (name.includes('ayush')) return imgAyush;
    if (name.includes('chandan')) return imgChandan;
    if (name.includes('shraddha')) return imgShraddha;
    return member.photo;
  };

  const MemberCard = ({ member }) => (
    <div className="glass-card member-card">
      <div className="member-avatar">
        {getPhoto(member)
          ? <img 
              src={getPhoto(member)} 
              alt={member.name} 
              className="avatar-img" 
              onClick={() => setSelectedImage(getPhoto(member))}
              style={{ cursor: 'pointer' }}
            />
          : <User size={32} color="var(--accent-cyan)" />
        }
      </div>
      <div className="member-info">
        <h4 className="member-name">{member.name || '—'}</h4>
        <p className="member-role text-gradient">{member.role || 'Researcher'}</p>
        {member.topic && <p className="member-topic">{member.topic}</p>}
        <div className="member-links">
          {member.email && (
            <a href={`mailto:${member.email}`} className="icon-link" title="Email">
              <Mail size={16} />
            </a>
          )}
          {member.link && (
            <a href={member.link} target="_blank" rel="noopener noreferrer" className="icon-link" title="Profile">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ label }) => (
    <div className="empty-state-card glass-card text-center" style={{ gridColumn: '1 / -1' }}>
      <div className="empty-icon"><User size={36} color="var(--text-muted)" /></div>
      <h4 style={{ color: 'var(--text-muted)' }}>{label} data updating soon</h4>
      <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
        Member information will appear here once published to the Google Sheet.
      </p>
    </div>
  );

  return (
    <div className="people-page">
      {/* Page Header */}
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">The Lab</span>
          <h1>Our <span className="text-gradient">Team</span></h1>
          <p className="page-hero-desc">
            Meet the researchers, students, and collaborators driving discovery at URJA Lab.
          </p>
        </div>
      </div>

      <div className="container page-body">
        {/* Active Members */}
        <section className="team-section">
          <div className="team-section-header">
            <h2>Active Members</h2>
            <div className="count-badge">{activeMembers.length}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {activeMembers.length > 0
              ? activeMembers.map((m, i) => <MemberCard key={i} member={m} />)
              : <EmptyState label="Active members" />
            }
          </div>
        </section>

        {/* Alumni */}
        <section className="team-section" style={{ marginTop: '4rem' }}>
          <div className="team-section-header">
            <h2>Alumni</h2>
            <div className="count-badge">{alumniMembers.length}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {alumniMembers.length > 0
              ? alumniMembers.map((m, i) => <MemberCard key={i} member={m} />)
              : <EmptyState label="Alumni" />
            }
          </div>
        </section>
      </div>

      {/* Full Screen Image Overlay via Portal */}
      {selectedImage && createPortal(
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <X size={28} />
          </button>
          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full screen" className="lightbox-image" />
          </div>
        </div>,
        document.body
      )}

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

        .team-section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .team-section-header h2 { margin-bottom: 0; font-size: 1.6rem; }
        .count-badge {
          background: rgba(59,130,246,0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 100px;
          padding: 0.1rem 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
        }

        .member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1.5rem;
          gap: 0;
        }
        .member-avatar {
          width: 140px; height: 140px;
          border-radius: 16px;
          border: 2px solid rgba(59,130,246,0.3);
          background: rgba(59,130,246,0.06);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          overflow: hidden;
        }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .member-name { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .member-role { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }
        .member-topic { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.4; }
        .member-links { display: flex; gap: 0.75rem; justify-content: center; }
        .icon-link {
          color: var(--text-muted);
          display: flex; align-items: center;
          padding: 0.4rem;
          border-radius: 6px;
          border: 1px solid var(--glass-border);
          transition: all 0.2s ease;
        }
        .icon-link:hover {
          color: var(--accent-cyan);
          border-color: rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.08);
        }

        .empty-state-card { padding: 3rem; }
        .empty-icon { margin-bottom: 1rem; }

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

        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(2, 6, 23, 0.95);
          backdrop-filter: blur(12px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: fadeIn 0.2s ease-out;
          padding: 2rem;
        }
        
        .lightbox-image-container {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.2);
          object-fit: contain;
          cursor: default;
          animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1000000;
        }

        .lightbox-close:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default People;
