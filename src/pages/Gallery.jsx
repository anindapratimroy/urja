import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useGoogleAppsScript } from '../hooks/useGoogleAppsScript';
import { getDirectImageUrl } from '../utils/helpers';

const Gallery = () => {
  const { data, loading, error } = useGoogleAppsScript();
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="w-full pb-12">
        <div className="pt-16 md:pt-24 pb-6 md:pb-8 mb-6 md:mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-24 h-4 bg-white/10 rounded animate-pulse mb-4"></div>
          <div className="w-64 h-12 bg-white/10 rounded animate-pulse mb-4"></div>
          <div className="w-96 h-6 bg-white/10 rounded animate-pulse"></div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="glass-card p-3 flex flex-col h-72 animate-pulse">
                <div className="w-full h-48 md:h-56 rounded-xl bg-white/5 mb-3"></div>
                <div className="w-3/4 h-5 bg-white/5 rounded mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <p>Unable to load data. Please check back later.</p>
    </div>
  );

  const galleryData = Array.isArray(data.gallery) ? data.gallery : [];
  
  const images = galleryData.map(item => {
    // Robust key extraction (handles different casing/spacing from sheets)
    const url = item.photoLinkUrl || item.photoLink || item.url || item['Photo Link (URL)'] || item.photolink || '';
    const caption = item.nameCaption || item.caption || item.name || item['Name / Caption'] || item.namecaption || 'Untitled';
    const description = item.description || item.desc || '';
    const date = item.date || item.Date || '';
    
    return {
      url: getDirectImageUrl(url),
      caption,
      description,
      date
    };
  }).filter(img => img.url); // filter out empty rows

  return (
    <div className="w-full">
      <div className="pt-16 md:pt-24 pb-6 md:pb-8 mb-6 md:mb-8 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="inline-block text-sm font-bold tracking-[0.12em] uppercase text-accent-cyan mb-3">Visuals</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Our <span className="text-gradient">Gallery</span></h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 m-0">
          A glimpse into our lab life, events, and research activities.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-12">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="glass-card p-3 cursor-pointer group flex flex-col h-full hover:border-accent-blue/50"
                onClick={() => setSelectedImage(img.url)}
              >
                <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden mb-3 relative">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {img.date && (
                    <div className="absolute top-2 right-2 bg-navy/80 backdrop-blur text-xs font-space text-slate-300 px-2 py-1 rounded-md border border-white/10">
                      {img.date}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 px-2 pb-1 mt-auto">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-accent-cyan shrink-0" />
                    <span className="text-base font-semibold text-white truncate">{img.caption}</span>
                  </div>
                  {img.description && (
                    <p className="text-sm text-slate-400 line-clamp-2 mt-1">{img.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-20 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <ImageIcon size={32} className="text-slate-500" />
            </div>
            <h4 className="text-xl text-slate-400 m-0">Gallery images not available</h4>
          </div>
        )}
      </div>

      {/* Full Screen Image Overlay */}
      {selectedImage && createPortal(
        <div className="fixed inset-0 bg-navy/95 backdrop-blur-xl z-[999999] flex items-center justify-center cursor-pointer p-4 md:p-8 animate-in fade-in duration-200" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 hover:scale-110 z-[1000000]" 
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>
          <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full screen" 
              className="max-w-full max-h-[90vh] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.2)] object-contain animate-in zoom-in-95 duration-300 cursor-default" 
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
