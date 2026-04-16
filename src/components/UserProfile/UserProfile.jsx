import React, { useMemo } from 'react';
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

  const profileData = useMemo(() => {
    const saved = localStorage.getItem('orderCheyProfile');
    if (!saved) return defaultProfile;

    try {
      return { ...defaultProfile, ...JSON.parse(saved) };
    } catch {
      return defaultProfile;
    }
  }, []);

  const avatarLetter = (profileData.fullName || 'U').trim().charAt(0).toUpperCase();

  return (
    <section id="profile" className="user-profile-section">
      <div className="user-profile-container">
        <div className="profile-card">
          <div className="avatar">{avatarLetter}</div>
          <div className="profile-main">
            <h2>{profileData.fullName}</h2>
            <p>Food Explorer Member</p>
          </div>
          <button className="edit-profile-btn" onClick={() => navigate('/profile')}>Profile</button>
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
