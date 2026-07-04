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
    <div className="gallery-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Visuals</span>
          <h1>Our <span className="text-gradient">Gallery</span></h1>
          <p className="page-hero-desc">
            A glimpse into our lab life, events, and research activities.
          </p>
        </div>
      </div>

      <div className="container page-body">
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="gallery-item glass-card"
                onClick={() => setSelectedImage(img.url)}
              >
                <div className="gallery-img-container">
                  <img src={img.url} alt={img.caption} loading="lazy" />
                </div>
                <div className="gallery-caption">
                  <ImageIcon size={14} className="caption-icon" />
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-card glass-card text-center">
            <div className="empty-icon"><ImageIcon size={36} color="var(--text-muted)" /></div>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Gallery images not available</h4>
          </div>
        )}
      </div>

      {/* Full Screen Image Overlay */}
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
        .gallery-page { padding-bottom: 4rem; }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          padding: 0.75rem;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .gallery-item:hover {
          transform: translateY(-5px);
          border-color: rgba(59,130,246,0.5);
        }
        .gallery-img-container {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }
        .gallery-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover .gallery-img-container img {
          transform: scale(1.05);
        }
        .gallery-caption {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0 0.5rem 0.25rem;
        }
        .caption-icon {
          color: var(--accent-cyan);
        }
        .empty-state-card {
          padding: 4rem 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
