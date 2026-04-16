import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const PROFILE_STORAGE_KEY = 'orderCheyProfile';
const AUTH_STORAGE_KEY = 'orderCheyAuth';

const defaultProfile = {
  fullName: 'Arjun Rao',
  email: 'arjun.rao@example.com',
  phone: '+1 (555) 201-7764',
  location: 'Downtown City Center',
  favoriteCuisine: 'Mediterranean',
  preferredSeating: 'Window Seat',
  dietaryNote: 'Vegetarian Friendly'
};

const ProfilePage = () => {
  const navigate = useNavigate();

  const initialProfileData = useMemo(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return defaultProfile;

    try {
      return { ...defaultProfile, ...JSON.parse(saved) };
    } catch {
      return defaultProfile;
    }
  }, []);

  const initialAuthState = useMemo(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return false;

    try {
      const parsed = JSON.parse(saved);
      return parsed?.isLoggedIn === true;
    } catch {
      return false;
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isSaved, setIsSaved] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loginDetails, setLoginDetails] = useState({
    fullName: initialProfileData.fullName,
    email: initialProfileData.email,
    phone: initialProfileData.phone
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value
    }));
    setAuthMessage('');
  };

  const handleGenerateOtp = () => {
    if (!loginDetails.fullName || !loginDetails.email || !loginDetails.phone) {
      setAuthMessage('Please fill in name, email, and phone first.');
      return;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setAuthMessage('OTP generated. Enter it below to log in.');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!generatedOtp) {
      setAuthMessage('Generate OTP first.');
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setAuthMessage('Invalid OTP. Please try again.');
      return;
    }

    const updatedProfile = {
      ...profileData,
      fullName: loginDetails.fullName,
      email: loginDetails.email,
      phone: loginDetails.phone
    };

    setProfileData(updatedProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        isLoggedIn: true,
        fullName: loginDetails.fullName,
        email: loginDetails.email
      })
    );

    setIsLoggedIn(true);
    setAuthMessage('Login successful.');
    setGeneratedOtp('');
    setEnteredOtp('');
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    setGeneratedOtp('');
    setEnteredOtp('');
    setAuthMessage('Logged out successfully.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    setIsSaved(true);
  };

  if (!isLoggedIn) {
    return (
      <section className="profile-edit-page">
        <div className="profile-edit-container">
          <div className="profile-edit-topbar">
            <button className="back-btn" onClick={() => navigate('/')}>
              Back to Home
            </button>
            <h1>Login to Your Profile</h1>
          </div>

          <form className="profile-edit-form auth-form" onSubmit={handleLogin}>
            <div className="form-grid">
              <label>
                Full Name
                <input
                  name="fullName"
                  value={loginDetails.fullName}
                  onChange={handleLoginInputChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={loginDetails.email}
                  onChange={handleLoginInputChange}
                  required
                />
              </label>

              <label className="full-width">
                Phone
                <input
                  name="phone"
                  value={loginDetails.phone}
                  onChange={handleLoginInputChange}
                  required
                />
              </label>

              <label className="full-width">
                Enter OTP
                <input
                  name="otp"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </label>
            </div>

            <div className="profile-edit-actions">
              <button type="button" className="cancel-btn" onClick={handleGenerateOtp}>
                Generate OTP
              </button>
              <button type="submit" className="save-btn">
                Login
              </button>
            </div>

            {generatedOtp && <p className="otp-preview">Demo OTP: {generatedOtp}</p>}
            {authMessage && <p className="saved-message">{authMessage}</p>}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-edit-page">
      <div className="profile-edit-container">
        <div className="profile-edit-topbar">
          <button className="back-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
          <h1>Profile</h1>
        </div>

        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full Name
              <input name="fullName" value={profileData.fullName} onChange={handleChange} required />
            </label>

            <label>
              Email
              <input name="email" type="email" value={profileData.email} onChange={handleChange} required />
            </label>

            <label>
              Phone
              <input name="phone" value={profileData.phone} onChange={handleChange} required />
            </label>

            <label>
              Location
              <input name="location" value={profileData.location} onChange={handleChange} />
            </label>

            <label>
              Favorite Cuisine
              <input name="favoriteCuisine" value={profileData.favoriteCuisine} onChange={handleChange} />
            </label>

            <label>
              Preferred Seating
              <input name="preferredSeating" value={profileData.preferredSeating} onChange={handleChange} />
            </label>

            <label className="full-width">
              Dietary Note
              <textarea
                name="dietaryNote"
                rows="4"
                value={profileData.dietaryNote}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="profile-edit-actions">
            <button type="submit" className="save-btn">Save Profile</button>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>

          {isSaved && <p className="saved-message">Profile updated successfully.</p>}
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
