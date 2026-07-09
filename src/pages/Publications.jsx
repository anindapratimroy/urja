import React from 'react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { Loader2, ExternalLink, FileText, Calendar, Users as AuthorsIcon } from 'lucide-react';

const Publications = () => {
  const { data, error } = useGoogleAppsScript();

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
    </div>
  );

  const publications = data.publications || [];

  return (
    <div className="w-full">
      <div className="pt-16 md:pt-24 pb-6 md:pb-8 mb-6 md:mb-8 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="inline-block text-sm font-bold tracking-[0.12em] uppercase text-accent-cyan mb-3">Research Output</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4"><span className="text-gradient">Publications</span></h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0">
          Peer-reviewed research articles, conference proceedings, and preprints from URJA Lab.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-12">
        {publications.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-8">
            {publications.map((pub, index) => (
              <div key={index} className="glass-card flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 md:p-8 hover:border-accent-blue/30 group transition-all">
                <div className="font-space text-4xl md:text-5xl font-bold text-white/10 leading-none shrink-0 md:min-w-[48px] pt-1">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-inter font-semibold mb-4 text-white group-hover:text-accent-cyan transition-colors">{pub.title || 'Untitled'}</h3>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {pub.authors && (
                      <span className="flex items-center gap-2 text-sm text-slate-400">
                        <AuthorsIcon size={16} className="text-accent-blue-light/70" />
                        {pub.authors}
                      </span>
                    )}
                    {(pub.year || pub.publishedDate) && (
                      <span className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar size={16} className="text-accent-blue-light/70" />
                        {pub.year || pub.publishedDate}
                      </span>
                    )}
                  </div>
                  {(pub.journal || pub.journalInfo) && (
                    <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                      <FileText size={16} className="text-accent-blue-light" />
                      <span className="text-gradient">{pub.journal || pub.journalInfo}</span>
                    </div>
                  )}
                  {pub.abstract && (
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 line-clamp-3 hover:line-clamp-none transition-all">
                      {pub.abstract}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    {pub.doi && (
                      <span className="text-xs md:text-sm text-slate-400 font-mono bg-white/5 px-3 py-1.5 rounded">DOI: {pub.doi}</span>
                    )}
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm whitespace-nowrap self-stretch sm:self-auto justify-center">
                        Read Paper <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-20 flex flex-col items-center gap-4">
            <FileText size={56} className="text-slate-600 mb-2" />
            <h3 className="text-2xl text-slate-400 mb-1">Publications Coming Soon</h3>
            <p className="text-slate-500 max-w-lg m-0">
              Research articles will appear here once added to the lab database.
              In the meantime, check our collaborators' pages or arXiv for recent work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
