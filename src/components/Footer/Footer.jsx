import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div>
          <h3>FOODIE</h3>
          <p>Exquisite dining experience since 1998.</p>
        </div>
        <div>
          <h4>Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#experience">Experience</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>123 Culinary Ave, Food City</p>
          <p>+1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Foodie Restaurant. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;