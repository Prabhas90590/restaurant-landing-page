
import React from 'react';
import './Hero.css';

// 1. IMPORT YOUR IMAGE HERE
// You can use 'hero.png' that you already have, or download a new picture
// and drag it into your assets folder just like you did before!
import mainImage from '../../assets/hero.png'; 

const Hero = () => {
  const handleExploreClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Side: Text and Buttons */}
        <div className="hero-content">
          <h1>Taste the <br/><span className="highlight">Difference</span></h1>
          <p>Experience culinary excellence with our carefully crafted dishes, made from the freshest local ingredients.</p>
          <button className="explore-btn" onClick={handleExploreClick}>Explore Menu</button>
        </div>

        {/* Right Side: The Image Circle */}
        <div className="hero-image-wrapper">
          {/* 2. PUT YOUR IMPORTED IMAGE HERE */}
          <img src={mainImage} alt="Delicious Food" className="hero-img" />
        </div>

      </div>
    </section>
  );
};

export default Hero;