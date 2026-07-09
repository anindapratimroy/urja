import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon } from 'lucide-react';

// Automatically load all images from the gallery folder
const galleryFiles = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

const images = Object.keys(galleryFiles).map((path) => {
  const filename = path.split('/').pop();
  const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
  return {
    url: galleryFiles[path],
    caption: nameWithoutExt, // Use filename as caption
  };
});

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
                <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden mb-3">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-2 px-2 pb-1 mt-auto">
                  <ImageIcon size={14} className="text-accent-cyan shrink-0" />
                  <span className="text-sm font-medium text-slate-300 truncate">{img.caption}</span>
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
