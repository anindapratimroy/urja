import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Loader2, ChevronRight, GraduationCap, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const { data, error } = useGoogleAppsScript();

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
    </div>
  );

  const opportunities = data.opportunities || [];

  return (
    <div className="w-full">
      <div className="pt-16 md:pt-24 pb-6 md:pb-8 mb-6 md:mb-8 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="inline-block text-sm font-bold tracking-[0.12em] uppercase text-accent-cyan mb-3">Join Us</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Open <span className="text-gradient">Opportunities</span></h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0 leading-relaxed">
          We welcome motivated students and researchers eager to explore the frontiers of
          high-energy astrophysics and relativistic jet physics.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-12">

        {/* General invite */}
        <div className="glass-card flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="w-16 h-16 shrink-0 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl flex items-center justify-center shadow-inner">
            <GraduationCap size={32} className="text-accent-cyan" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl mb-2 font-semibold">Interested in Joining URJA Lab?</h3>
            <p className="text-base md:text-lg text-slate-400 mb-6 leading-relaxed">
              We are always looking for passionate PhD students, Master's students, and postdoctoral
              researchers. If you are interested in high-energy astrophysics, multi-wavelength
              observations, or jet physics — feel free to reach out to Dr. Amit Shukla directly.
            </p>
            <a href="mailto:amit@iiti.ac.in" className="btn w-full sm:w-auto justify-center">
              <Mail size={16} /> Contact the PI
            </a>
          </div>
        </div>

        {/* Specific openings */}
        {opportunities.length > 0 && (
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl mb-8">Current Openings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {opportunities.map((opp, index) => (
                <div key={index} className="glass-card flex flex-col hover:border-accent-blue/30 transition-colors group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl md:text-3xl font-semibold group-hover:text-accent-cyan transition-colors">{opp.title || 'Position Title'}</h3>
                    {opp.type && <span className="shrink-0 text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-accent-blue/10 text-accent-cyan border border-accent-blue/25 self-start">{opp.type}</span>}
                  </div>
                  {opp.description && <p className="text-base md:text-lg text-slate-400 flex-1 mb-6 leading-relaxed">{opp.description}</p>}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5 mt-auto">
                    {opp.deadline && (
                      <span className="flex items-center gap-2 text-base text-slate-500">
                        <Clock size={16} /> Deadline: {opp.deadline}
                      </span>
                    )}
                    {opp.link && (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base font-semibold text-accent-cyan font-space hover:gap-2 hover:text-blue-300 transition-all self-end sm:self-auto">
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
          <div className="glass-card text-center mt-12 py-16">
            <p className="text-slate-500 m-0">
              No specific openings listed at this time. Please check back later or reach out directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
