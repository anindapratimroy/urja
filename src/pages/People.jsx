import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { User, Loader2, Mail, ExternalLink, X, ChevronDown } from 'lucide-react';

import imgAyush from '../assets/people/ayush_garg.jpeg';
import imgChandan from '../assets/people/chandan_kumar.jpg';
import imgShraddha from '../assets/people/shraddha.jpg';

const People = () => {
  const { data, loading, error } = useGoogleAppsScript();
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('role') || 'all';

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      <p>Loading members...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
    </div>
  );

  const peopleData = Array.isArray(data.people) ? data.people : [];

  const isAlumni = (member) => {
    if (member.affiliation && member.affiliation.trim() !== '') return true;
    if (member.gradYear && parseInt(member.gradYear) < new Date().getFullYear()) return true;
    return false;
  };

  const activeMembers = peopleData.filter(m => !isAlumni(m));
  const alumniMembers = peopleData.filter(m => isAlumni(m));

  const getPhoto = (member) => {
    const name = (member.name || '').toLowerCase();
    if (name.includes('ayush')) return imgAyush;
    if (name.includes('chandan')) return imgChandan;
    if (name.includes('shraddha')) return imgShraddha;
    return member.photo;
  };

  const getRolePriority = (role) => {
    const r = (role || '').toLowerCase();
    if (r.includes('phd') || r.includes('ph.d')) return 1;
    if (r.includes('pg') || r.includes('m.tech') || r.includes('m.sc')) return 2;
    if (r.includes('ug') || r.includes('b.tech') || r.includes('b.sc')) return 3;
    if (r.includes('srf')) return 4;
    if (r.includes('jrf')) return 5;
    return 6;
  };

  const sortedMembers = [...peopleData].sort((a, b) => {
    const isAlumA = isAlumni(a);
    const isAlumB = isAlumni(b);
    
    if (isAlumA && !isAlumB) return 1;
    if (!isAlumA && isAlumB) return -1;

    const pA = getRolePriority(a.role);
    const pB = getRolePriority(b.role);
    if (pA !== pB) return pA - pB;
    
    const getBatchNum = (member) => {
      if (member.entryYear) return parseInt(member.entryYear, 10);
      
      let val = '';
      for (const key in member) {
        const k = key.toLowerCase();
        if (k.includes('batch') || k.includes('join') || k.includes('year')) {
          val = member[key];
          break;
        }
      }
      if (!val && member.email) {
        const emailMatch = String(member.email).match(/^[a-zA-Z]+(\d{2})/);
        if (emailMatch) {
          const yy = parseInt(emailMatch[1], 10);
          return yy > 50 ? 1900 + yy : 2000 + yy;
        }
      }
      
      if (!val) return 9999;
      
      const matches = String(val).match(/\d{4}/g);
      if (matches && matches.length > 0) {
        return parseInt(matches[matches.length - 1], 10);
      }
      return 9999;
    };
    
    const batchA = getBatchNum(a);
    const batchB = getBatchNum(b);
    if (batchA !== batchB) return batchA - batchB;
    
    return (a.name || '').localeCompare(b.name || '');
  });

  const getRoleCategory = (role) => {
    const r = (role || '').toLowerCase();
    if (r.includes('phd') || r.includes('ph.d')) return 'phd';
    if (r.includes('pg') || r.includes('m.tech') || r.includes('m.sc')) return 'pg';
    if (r.includes('ug') || r.includes('b.tech') || r.includes('b.sc')) return 'ug';
    if (r.includes('srf')) return 'srf';
    if (r.includes('jrf')) return 'jrf';
    return 'other';
  };

  const filteredMembers = sortedMembers.filter(m => {
    if (activeFilter === 'all') return true;
    return getRoleCategory(m.role) === activeFilter;
  });

  const displayActive = filteredMembers.filter(m => !isAlumni(m));
  const displayAlumni = filteredMembers.filter(m => isAlumni(m));

  const categories = [
    { value: 'all', label: 'All Roles' },
    { value: 'phd', label: 'PhD' },
    { value: 'pg', label: 'PG' },
    { value: 'ug', label: 'UG' },
    { value: 'jrf', label: 'JRF' },
    { value: 'srf', label: 'SRF' }
  ];

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
      <div className="w-full min-w-0 break-words">
        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 group-hover:text-accent-cyan transition-colors break-words line-clamp-2">{member.name || '—'}</h4>
        <p className="text-sm sm:text-base md:text-lg font-bold text-gradient mb-3 md:mb-4 break-words">{member.role || 'Researcher'}</p>
        
        {member.research && (
          <div className="text-base text-slate-400 mb-4 px-2 text-center leading-relaxed break-words">
            <span className="block text-sm text-accent-cyan uppercase tracking-widest mb-1.5 break-words">Research Interests</span>
            <p className="break-words">{member.research}</p>
          </div>
        )}
        
        {member.email && (
          <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg mx-auto w-fit transition-all hover:border-accent-blue/40 hover:bg-accent-blue/10 group/email">
            <Mail size={14} className="text-slate-400 group-hover/email:text-accent-cyan transition-colors" />
            <span className="text-sm md:text-base text-slate-400 group-hover/email:text-white transition-colors break-words truncate max-w-full">
              {member.email.includes('@') ? member.email.split('@')[0] : member.email}
            </span>
          </div>
        )}

        {member.affiliation && (
          <div className="mt-3 text-base text-accent-cyan font-medium break-words w-full">
            {member.affiliation}
          </div>
        )}

        <div className="flex justify-center gap-3 mt-5">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 bg-white/[0.03] text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          )}
          {member.page && (
            <a href={member.page} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 bg-white/[0.03] text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="Personal Website">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          )}
          {(member.googleScholar || member.scholar || member.google_scholar) && (
            <a href={member.googleScholar || member.scholar || member.google_scholar} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 bg-white/[0.03] text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="Google Scholar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </a>
          )}
          {member.orcid && (
            <a href={member.orcid} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/10 bg-white/[0.03] text-slate-400 flex items-center justify-center hover:text-accent-cyan hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-all" title="ORCID">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.025-2.625 4.025-3.738 0-1.553-1.1-3.706-4.025-3.706H11.653z" />
              </svg>
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
      <div className="pt-16 md:pt-24 pb-6 md:pb-8 mb-6 md:mb-8 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="inline-block text-sm font-bold tracking-[0.12em] uppercase text-accent-cyan mb-3">The Lab</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Our <span className="text-gradient">Team</span></h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0">
          Meet the researchers, students, and collaborators driving discovery at URJA Lab.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-12">
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 pb-4 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl m-0">{categories.find(c => c.value === activeFilter)?.label || 'Members'}</h2>
            <div className="bg-accent-blue/15 text-accent-cyan border border-accent-blue/30 rounded-full px-3 py-1 text-sm font-bold font-space">
              {filteredMembers.length}
            </div>
            <div className="flex-grow"></div>
            <span className="text-sm md:text-base font-medium text-slate-400 tracking-wide mt-2 md:mt-0 text-center md:text-left">
              * add @iiti.ac.in for the emails
            </span>
          </div>

          {/* Active Members Section */}
          {displayActive.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-200 border-l-4 border-accent-blue pl-4">Active Members</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {displayActive.map((m, i) => <MemberCard key={`active-${i}`} member={m} />)}
              </div>
            </div>
          )}

          {/* Alumni Section */}
          {displayAlumni.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-200 border-l-4 border-accent-cyan pl-4">Alumni</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {displayAlumni.map((m, i) => <MemberCard key={`alumni-${i}`} member={m} />)}
              </div>
            </div>
          )}

          {displayActive.length === 0 && displayAlumni.length === 0 && (
            <EmptyState label={categories.find(c => c.value === activeFilter)?.label || 'Members'} />
          )}
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
