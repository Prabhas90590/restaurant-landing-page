import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="exp-section">
      <div className="exp-container">
        <div className="exp-images">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" className="img-1" alt="Interior" />
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9" className="img-2" alt="Dining" />
        </div>
        <div className="exp-text">
          <h2>Exceptional Dining <br /> Experience</h2>
          <p>We offer more than just food. Our atmosphere is designed to provide a memorable journey for your senses, from the soft ambient lighting to the curated playlists.</p>
          <button className="book-table-btn">Book Table</button>
        </div>
      </div>
    </section>
  );
};

export default Experience;