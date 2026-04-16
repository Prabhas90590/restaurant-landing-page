import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileInitial, setProfileInitial] = useState('P');
  const [sidebarNote, setSidebarNote] = useState('');
  const navigate = useNavigate();

  const syncUserState = () => {
    const savedAuth = localStorage.getItem('orderCheyAuth');
    const savedProfile = localStorage.getItem('orderCheyProfile');
    let loggedIn = false;
    let nextInitial = 'P';

    try {
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        loggedIn = parsedAuth?.isLoggedIn === true;
      }
    } catch {
      loggedIn = false;
    }

    try {
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        nextInitial = (parsedProfile?.fullName || 'P').trim().charAt(0).toUpperCase() || 'P';
      }
    } catch {
      nextInitial = 'P';
    }

    setIsLoggedIn(loggedIn);
    setProfileInitial(nextInitial);
  };

  useEffect(() => {
    syncUserState();
    const savedTheme = localStorage.getItem('orderCheyTheme') || 'light';
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(savedTheme === 'dark' ? 'theme-dark' : 'theme-light');

    const handleStorage = () => {
      syncUserState();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleTheme = (mode) => {
    localStorage.setItem('orderCheyTheme', mode);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light');
    setSidebarNote(mode === 'dark' ? 'Dark mode enabled.' : 'Light mode enabled.');
  };

  const openRoute = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
    setIsOpen(false);
  };

  const handleSidebarNote = (message) => {
    setSidebarNote(message);
  };

  const handleLogout = () => {
    localStorage.removeItem('orderCheyAuth');
    syncUserState();
    setSidebarNote('Logged out successfully.');
    navigate('/profile');
  };

  const handleBooking = () => {
    openRoute('/booking');
  };

  const handleProfile = () => {
    openRoute('/profile');
  };

  return (
    <>
    <nav className="header-nav">
      <div className="header-container">
        <button
          type="button"
          className="logo"
          aria-label="Open app menu"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="logo-mark" aria-hidden="true">
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
          <span className="logo-text">ORDER KARO</span>
        </button>
        <div className="nav-links desktop-only">
          <a href="#">Home</a>
          <a href="#dining">Dining In</a>
          <button className="book-btn" onClick={handleBooking}>Book a Table</button>
          {isLoggedIn ? (
            <button className="book-btn profile-initial-btn" onClick={handleProfile} aria-label="Profile">
              {profileInitial}
            </button>
          ) : (
            <button className="book-btn" onClick={handleProfile}>Login</button>
          )}
        </div>
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="mobile-menu">
          <a href="#">Home</a>
          <a href="#dining">Dining In</a>
          <button className="book-btn w-full" onClick={handleBooking}>Book a Table</button>
          {isLoggedIn ? (
            <button className="book-btn profile-initial-btn" onClick={handleProfile} aria-label="Profile">
              {profileInitial}
            </button>
          ) : (
            <button className="book-btn w-full" onClick={handleProfile}>Login</button>
          )}
        </div>
      )}
    </nav>
    {isSidebarOpen && <button type="button" className="sidebar-overlay" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} />}
    <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-top">
        <h3>Quick Access</h3>
        <button type="button" className="sidebar-close" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">✕</button>
      </div>

      <div className="sidebar-section">
        <button type="button" className="sidebar-item" onClick={() => openRoute('/profile')}>Your Profile</button>
        <button type="button" className="sidebar-item" onClick={() => openRoute('/order')}>Your Orders</button>
        <button type="button" className="sidebar-item" onClick={() => handleSidebarNote('Settings panel coming soon.')}>Settings</button>
        <button type="button" className="sidebar-item" onClick={() => handleSidebarNote('Support: +1 234 567 890')}>Support</button>
      </div>

      <div className="sidebar-section">
        <button type="button" className="sidebar-item" onClick={() => handleSidebarNote('Offers refreshed: 2 new coupons available.')}>Offers & Coupons</button>
        <button type="button" className="sidebar-item" onClick={() => handleSidebarNote('Saved addresses: Home, Work')}>Saved Addresses</button>
        <button type="button" className="sidebar-item" onClick={() => handleSidebarNote('Favorites synced with your account.')}>Favorites</button>
      </div>

      <div className="sidebar-theme-toggle">
        <button type="button" onClick={() => handleTheme('dark')}>Dark Mode</button>
        <button type="button" onClick={() => handleTheme('light')}>Light Mode</button>
      </div>

      {isLoggedIn ? (
        <button type="button" className="sidebar-logout" onClick={handleLogout}>Logout</button>
      ) : (
        <button type="button" className="sidebar-logout" onClick={() => openRoute('/profile')}>Login</button>
      )}

      {sidebarNote && <p className="sidebar-note">{sidebarNote}</p>}
    </aside>
    </>
  );
};

export default Header;