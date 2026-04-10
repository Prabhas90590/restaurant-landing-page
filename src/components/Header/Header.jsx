import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        <div className="logo">FOODIE</div>
        <div className="nav-links desktop-only">
          <a href="#">Home</a>
          <a href="#menu">Menu</a>
          <a href="#experience">Experience</a>
          <button className="book-btn" onClick={handleBooking}>Book a Table</button>
        </div>
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="mobile-menu">
          <a href="#">Home</a>
          <a href="#menu">Menu</a>
          <a href="#experience">Experience</a>
          <button className="book-btn w-full" onClick={handleBooking}>Book a Table</button>
        </div>
      )}
    </nav>
  );
};

export default Header;