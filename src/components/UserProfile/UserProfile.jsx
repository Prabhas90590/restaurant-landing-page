import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const defaultProfile = {
  fullName: 'Arjun Rao',
  email: 'arjun.rao@example.com',
  phone: '+1 (555) 201-7764',
  location: 'Downtown City Center',
  favoriteCuisine: 'Mediterranean',
  preferredSeating: 'Window Seat',
  dietaryNote: 'Vegetarian Friendly'
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(defaultProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem('orderCheyProfile');
      if (saved) {
        try {
          const userData = JSON.parse(saved);
          setProfileData({ ...defaultProfile, ...userData });
          setIsLoggedIn(true);
        } catch (error) {
          setProfileData(defaultProfile);
          setIsLoggedIn(false);
        }
      } else {
        setProfileData(defaultProfile);
        setIsLoggedIn(false);
      }
    };

    loadProfile();

    // Listen for storage changes across tabs
    window.addEventListener('storage', loadProfile);
    return () => window.removeEventListener('storage', loadProfile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('orderCheyProfile');
    setProfileData(defaultProfile);
    setIsLoggedIn(false);
  };

  const avatarLetter = (profileData.fullName || 'U').trim().charAt(0).toUpperCase();

  return (
    <section id="profile" className="user-profile-section">
      <div className="user-profile-container">
        <div className="profile-card">
          <div className={`avatar ${isLoggedIn ? 'logged-in' : ''}`}>{avatarLetter}</div>
          <div className="profile-main">
            <h2>{profileData.fullName}</h2>
            <p className={isLoggedIn ? 'logged-in-badge' : 'guest-badge'}>
              {isLoggedIn ? '✓ Logged In' : 'Guest User'}
            </p>
          </div>
          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={() => navigate('/profile')}>
              Profile
            </button>
            {isLoggedIn && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-panel">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Phone:</strong> {profileData.phone}</p>
            <p><strong>Location:</strong> {profileData.location}</p>
          </div>

          <div className="profile-panel">
            <h3>Dining Preferences</h3>
            <p><strong>Favorite Cuisine:</strong> {profileData.favoriteCuisine}</p>
            <p><strong>Preferred Seating:</strong> {profileData.preferredSeating}</p>
            <p><strong>Dietary Note:</strong> {profileData.dietaryNote}</p>
          </div>

          <div className="profile-panel">
            <h3>Recent Activity</h3>
            <p><strong>Last Booking:</strong> April 8, 2026 at 7:30 PM</p>
            <p><strong>Total Visits:</strong> 14</p>
            <p><strong>Loyalty Points:</strong> 2,450</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
