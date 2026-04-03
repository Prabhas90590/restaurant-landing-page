import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <h2>Our Culinary Journey</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601" alt="Gallery" />
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" alt="Gallery" />
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Gallery" />
          <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" alt="Gallery" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;