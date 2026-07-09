import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Globe, ExternalLink, Building2, User, MapPin, Network, Loader2 } from 'lucide-react';

const Collaborations = () => {
  const { data, loading, error } = useGoogleAppsScript();

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      <p>Loading collaborations...</p>
    </div>
  );
  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
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
    <div className="w-full">
      <div className="relative pt-20 md:pt-28 pb-8 md:pb-10 mb-6 md:mb-8 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute -right-[5%] -top-[20%] text-blue-500/[0.03] pointer-events-none">
          <Globe size={400} strokeWidth={0.5} className="animate-[spin_60s_linear_infinite]" />
        </div>
        <div className="relative z-10">
          <span className="inline-block text-sm font-bold tracking-[0.15em] uppercase text-accent-cyan mb-4">Global Network</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Research <span className="text-gradient">Collaborations</span></h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0 leading-relaxed">
            URJA Lab maintains active collaborations with leading research institutes,
            observatories, and universities around the world.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-12">
        {collaborations.length > 0 ? (
          <div className="flex flex-col gap-12 md:gap-16">
            {sortedCountries.map(country => (
              <div key={country} className="flex flex-col">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10 mt-10 md:mt-16 first:mt-0">
                  <MapPin size={24} className="text-accent-blue-light" />
                  <h2 className="text-2xl md:text-3xl m-0 tracking-wide">{country}</h2>
                  <div className="bg-accent-blue/15 text-accent-cyan border border-accent-blue/30 rounded-full px-3 py-1 text-sm font-bold font-space ml-2">
                    {groupedCollabs[country].length}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {groupedCollabs[country].map((collab, index) => (
                    <div key={index} className="glass-card flex flex-col sm:flex-row items-start gap-3 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 bg-slate-900/40 hover:bg-slate-800/60 hover:-translate-y-1.5 transition-all duration-400 group relative">
                      <div className="shrink-0 relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500/10 to-emerald-500/5 border border-accent-blue/20 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:border-accent-blue/50">
                          <User size={20} className="text-accent-cyan sm:hidden" />
                          <User size={24} className="text-accent-cyan hidden sm:block" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 w-full break-words">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 text-white break-words">{collab.name || 'Collaborator'}</h4>
                        {collab.type && <p className="text-sm sm:text-base md:text-lg font-medium text-accent-cyan mb-2 sm:mb-3 break-words">{collab.type}</p>}
                        
                        {collab.affiliation && (
                          <div className="flex items-start gap-2 text-base text-slate-400 mb-2 leading-relaxed w-full">
                            <Building2 size={16} className="shrink-0 mt-0.5 text-slate-500" /> 
                            <span className="flex-1 min-w-0 break-words">{collab.affiliation}</span>
                          </div>
                        )}
                        
                        {collab.area && (
                          <div className="mt-4 pt-3 border-t border-dashed border-white/10">
                            <span className="block text-xs sm:text-sm uppercase text-slate-500 tracking-widest mb-1.5 break-words">Research Area</span>
                            <p className="text-sm sm:text-base md:text-lg text-slate-400 m-0 leading-relaxed line-clamp-2 sm:line-clamp-none break-words">{collab.area}</p>
                          </div>
                        )}
                      </div>
                      
                      {collab.website && collab.website.trim() !== '' && (
                        <a 
                          href={collab.website.startsWith('http') ? collab.website : (collab.website.toLowerCase() === 'website' ? '#' : `https://${collab.website}`)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg border border-white/10 bg-white/[0.02] text-slate-500 flex items-center justify-center transition-all hover:text-accent-cyan hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:-translate-y-0.5 absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
                          title="Visit Website"
                          onClick={(e) => {
                            if(collab.website.toLowerCase() === 'website') {
                              e.preventDefault();
                              alert('Please update the Google Sheet to contain the raw URL (e.g., https://example.com) instead of the hyperlinked word "Website".');
                            }
                          }}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-24 flex flex-col items-center">
            <Network size={64} className="text-slate-600 mb-6" />
            <h3 className="text-2xl text-slate-400 mb-2">Collaborations Updating</h3>
            <p className="text-slate-500 max-w-lg m-0">
              Our network of global research partnerships will be listed here once the database is synchronized.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaborations;
