
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/order');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Side: Text and Buttons */}
        <div className="hero-content">
          <h1>Order Food From Your <br/><span className="highlight">Fav Restaurents</span></h1>
          <p>Experience culinary excellence with our carefully crafted dishes, made from the freshest local ingredients.</p>
          <button className="explore-btn" onClick={handleExploreClick}>Order Now</button>
        </div>

        {/* Right Side: Brand Logo */}
        <div className="hero-image-wrapper" aria-label="ORDER KARO logo">
          <div className="hero-logo">
            <span className="hero-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M8.2 7.2c.7-1.5 1.9-2.2 3.8-2.2s3.1.7 3.8 2.2" />
                <path d="M6 11a6 6 0 0 1 12 0" />
                <path d="M4.8 12.8h14.4" />
                <path d="M5.8 15.2h12.4" />
                <path d="M8.2 17.2h7.6" />
                <path d="M12 4.4v1.8" />
                <path d="M9.8 5.2c-.2.4-.2.9.1 1.3" />
                <path d="M14.2 5.2c.2.4.2.9-.1 1.3" />
              </svg>
            </span>
            <span className="hero-logo-text">ORDER KARO</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;