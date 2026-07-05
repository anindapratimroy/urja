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
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
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

  const rolePriority = {
    'post doc': 1,
    'ph.d.': 2,
    'm.tech': 3,
    'm.sc.': 3,
    'b.tech': 4,
    'b.sc.': 4,
  };

  const getRolePriority = (role) => {
    const r = (role || '').toLowerCase();
    for (const key in rolePriority) {
      if (r.includes(key)) return rolePriority[key];
    }
    return 5;
  };

  const sortedActiveMembers = [...activeMembers].sort((a, b) => {
    const pA = getRolePriority(a.role);
    const pB = getRolePriority(b.role);
    if (pA !== pB) return pA - pB;
    
    const getBatchNum = (member) => {
      const val = member.batch || member['joining year'] || member.joiningYear || member.joining_year || member.year;
      if (!val) return 9999999999;
      const num = parseInt(String(val).replace(/\D/g, ''));
      return isNaN(num) ? 9999999999 : num;
    };
    
    const batchA = getBatchNum(a);
    const batchB = getBatchNum(b);
    if (batchA !== batchB) return batchA - batchB;
    
    return (a.name || '').localeCompare(b.name || '');
  });

  const sortedAlumniMembers = [...alumniMembers].sort((a, b) => {
    const pA = getRolePriority(a.role);
    const pB = getRolePriority(b.role);
    if (pA !== pB) return pA - pB;
    
    const getBatchNum = (member) => {
      const val = member.batch || member['joining year'] || member.joiningYear || member.joining_year || member.year;
      if (!val) return 9999999999;
      const num = parseInt(String(val).replace(/\D/g, ''));
      return isNaN(num) ? 9999999999 : num;
    };
    
    const batchA = getBatchNum(a);
    const batchB = getBatchNum(b);
    if (batchA !== batchB) return batchA - batchB;
    
    return (a.name || '').localeCompare(b.name || '');
  });

  const MemberCard = ({ member }) => (
    <div className="glass-card flex flex-col items-center text-center p-4 md:p-8 hover:border-accent-blue/30 group transition-colors">
      <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl border-2 border-accent-blue/30 bg-accent-blue/5 flex items-center justify-center mb-3 md:mb-5 overflow-hidden shadow-lg group-hover:border-accent-blue-light/50 transition-colors">
        {getPhoto(member)
          ? <img 
              src={getPhoto(member)} 
              alt={member.name} 
              className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300" 
              onClick={() => setSelectedImage(getPhoto(member))}
            />
          : <User size={36} className="text-accent-cyan" />
        }
      </div>
      <div className="w-full">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 group-hover:text-accent-cyan transition-colors line-clamp-1">{member.name || '—'}</h4>
        <p className="text-xs sm:text-sm md:text-base font-bold text-gradient mb-3 md:mb-4">{member.role || 'Researcher'}</p>
        
        {member.research && (
          <div className="text-sm text-slate-400 mb-4 px-2 text-center leading-relaxed">
            <span className="block text-xs text-accent-cyan uppercase tracking-widest mb-1.5">Research Interests</span>
            <p>{member.research}</p>
          </div>
        )}
        
        {member.email && (
          <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg mx-auto w-fit transition-colors hover:border-accent-blue-light/50 group/email">
            <Mail size={14} className="text-slate-400 group-hover/email:text-accent-blue-light transition-colors" />
            <span className="text-xs md:text-sm text-slate-400 group-hover/email:text-accent-blue-light transition-colors">
              {member.email.includes('@') ? member.email.split('@')[0] : member.email}
            </span>
          </div>
        )}

        <div className="flex justify-center gap-3 mt-5">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          )}
          {member.page && (
            <a href={member.page} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="Personal Website">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          )}
          {(member.googleScholar || member.scholar || member.google_scholar) && (
            <a href={member.googleScholar || member.scholar || member.google_scholar} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="Google Scholar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ label }) => (
    <div className="glass-card text-center col-span-full py-16">
      <div className="flex justify-center mb-4"><User size={42} className="text-slate-600" /></div>
      <h4 className="text-xl text-slate-400 mb-2">{label} data updating soon</h4>
      <p className="text-slate-500 max-w-md mx-auto m-0">
        Member information will appear here once published to the Google Sheet.
      </p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="py-20 md:py-28 bg-gradient-to-b from-blue-500/5 to-transparent border-b border-white/5 mb-12 md:mb-16 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-accent-cyan mb-3">The Lab</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Our <span className="text-gradient">Team</span></h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0">
          Meet the researchers, students, and collaborators driving discovery at URJA Lab.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {/* Active Members */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 pb-4 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl m-0">Active Members</h2>
            <div className="bg-accent-blue/15 text-accent-cyan border border-accent-blue/30 rounded-full px-3 py-1 text-sm font-bold font-space">
              {activeMembers.length}
            </div>
            <span className="md:ml-auto text-sm md:text-base font-medium text-slate-400 tracking-wide mt-2 md:mt-0 text-center md:text-left">
              * add @iiti.ac.in for the emails
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {sortedActiveMembers.length > 0
              ? sortedActiveMembers.map((m, i) => <MemberCard key={i} member={m} />)
              : <EmptyState label="Active members" />
            }
          </div>
        </section>

        {/* Alumni */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 pb-4 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl m-0">Alumni</h2>
            <div className="bg-accent-blue/15 text-accent-cyan border border-accent-blue/30 rounded-full px-3 py-1 text-sm font-bold font-space">
              {alumniMembers.length}
            </div>
            <span className="md:ml-auto text-sm md:text-base font-medium text-slate-400 tracking-wide mt-2 md:mt-0 text-center md:text-left">
              * add @iiti.ac.in for the emails
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {sortedAlumniMembers.length > 0
              ? sortedAlumniMembers.map((m, i) => <MemberCard key={i} member={m} />)
              : <EmptyState label="Alumni" />
            }
          </div>
        </section>
      </div>

      {/* Full Screen Image Overlay via Portal */}
      {selectedImage && createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-navy/95 backdrop-blur-xl z-[999999] flex items-center justify-center cursor-pointer p-4 md:p-8 animate-in fade-in duration-200" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 hover:scale-110 z-[1000000]" onClick={() => setSelectedImage(null)}>
            <X size={28} />
          </button>
          <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full screen" className="max-w-full max-h-[90vh] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.2)] object-contain animate-in zoom-in-95 duration-300 cursor-default" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default People;
