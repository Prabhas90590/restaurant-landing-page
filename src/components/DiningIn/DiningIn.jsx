import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiningIn.css';

const diningHighlights = [
  {
    title: 'Cozy Indoor Seating',
    detail: 'Warm lighting, elegant table settings, and a relaxing ambience.'
  },
  {
    title: 'Chef Curated Meals',
    detail: 'Seasonal menus crafted daily using fresh local ingredients.'
  },
  {
    title: 'Family Friendly Space',
    detail: 'Comfortable seating for couples, families, and group celebrations.'
  }
];

const ambiencePhotos = [
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    alt: 'Warm restaurant dining room with candlelight',
    label: 'Warm Lighting'
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    alt: 'Elegant restaurant tables set for a special dinner',
    label: 'Elegant Tables'
  },
  {
    src: 'https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern restaurant interior with stylish seating',
    label: 'Modern Comfort'
  }
];

const DiningIn = () => {
  const navigate = useNavigate();

  return (
    <section id="dining" className="dining-section">
      <div className="dining-container">
        <div className="dining-content">
          <p className="dining-eyebrow">Dining In</p>
          <h2>Enjoy Dining In With Comfort And Style</h2>
          <p>
            Step into a welcoming space where every table feels special. Whether it is a casual
            lunch or a celebration dinner, we make each moment memorable.
          </p>

          <div className="dining-highlights">
            {diningHighlights.map((item) => (
              <div key={item.title} className="dining-highlight-item">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="ambience-section">
            <div className="ambience-header">
              <p className="ambience-eyebrow">Ambience</p>
              <h3>Spaces Designed To Feel Warm, Stylish, And Relaxed</h3>
            </div>

            <div className="ambience-grid">
              {ambiencePhotos.map((photo) => (
                <figure key={photo.label} className="ambience-card">
                  <img src={photo.src} alt={photo.alt} className="ambience-photo" />
                  <figcaption>{photo.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button className="dining-book-btn" onClick={() => navigate('/booking')}>
            Book Table
          </button>
        </div>

        <div className="dining-image" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default DiningIn;
