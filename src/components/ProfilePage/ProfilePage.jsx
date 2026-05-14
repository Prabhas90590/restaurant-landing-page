import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const PROFILE_STORAGE_KEY = 'orderCheyProfile';
const AUTH_STORAGE_KEY = 'orderCheyAuth';
const USERS_STORAGE_KEY = 'orderCheyUsers';

const defaultProfile = {
  fullName: 'Arjun Rao',
  email: 'arjun.rao@example.com',
  phone: '+1 (555) 201-7764',
  location: 'Downtown City Center',
  favoriteCuisine: 'Mediterranean',
  preferredSeating: 'Window Seat',
  dietaryNote: 'Vegetarian Friendly'
};

const normalizePhone = (value) => value.replace(/\D/g, '');

const getStoredUsers = () => {
  const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!savedUsers) return [];

  try {
    const parsed = JSON.parse(savedUsers);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const findUserByIdentifier = (users, identifier) => {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = normalizePhone(identifier);

  return users.find((user) => {
    const sameEmail = (user.email || '').toLowerCase() === normalizedIdentifier;
    const samePhone = normalizePhone(user.phone || '') === normalizedPhone;
    return sameEmail || samePhone;
  });
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
  const [authMode, setAuthMode] = useState('login');
  const [authMessage, setAuthMessage] = useState('');
  const [loginDetails, setLoginDetails] = useState({
    identifier: '',
    password: ''
  });
  const [signupDetails, setSignupDetails] = useState({
    fullName: initialProfileData.fullName,
    email: initialProfileData.email,
    phone: initialProfileData.phone,
    password: '',
    confirmPassword: ''
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value
    }));
    setAuthMessage('');
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prev) => ({
      ...prev,
      [name]: value
    }));
    setAuthMessage('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginDetails.identifier || !loginDetails.password) {
      setAuthMessage('Enter your email or mobile number and password.');
      return;
    }

    const users = getStoredUsers();
    const user = findUserByIdentifier(users, loginDetails.identifier);

    if (!user) {
      setAuthMessage('No account found. Please sign up first.');
      return;
    }

    if (user.password !== loginDetails.password) {
      setAuthMessage('Incorrect password. Please try again.');
      return;
    }

    const updatedProfile = {
      ...profileData,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    };

    setProfileData(updatedProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        isLoggedIn: true,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      })
    );

    setIsLoggedIn(true);
    setAuthMessage('Login successful.');
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const fullName = signupDetails.fullName.trim();
    const email = signupDetails.email.trim().toLowerCase();
    const phone = signupDetails.phone.trim();
    const normalizedPhone = normalizePhone(phone);

    if (!fullName || !email || !phone || !signupDetails.password || !signupDetails.confirmPassword) {
      setAuthMessage('Please complete all sign up fields.');
      return;
    }

    if (!email.includes('@')) {
      setAuthMessage('Please enter a valid email address.');
      return;
    }

    if (normalizedPhone.length < 10) {
      setAuthMessage('Please enter a valid mobile number.');
      return;
    }

    if (signupDetails.password.length < 6) {
      setAuthMessage('Password must be at least 6 characters.');
      return;
    }

    if (signupDetails.password !== signupDetails.confirmPassword) {
      setAuthMessage('Passwords do not match.');
      return;
    }

    const users = getStoredUsers();
    const emailExists = users.some((user) => (user.email || '').toLowerCase() === email);
    const phoneExists = users.some((user) => normalizePhone(user.phone || '') === normalizedPhone);

    if (emailExists || phoneExists) {
      setAuthMessage('User already exists. Please login.');
      setAuthMode('login');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName,
      email,
      phone,
      password: signupDetails.password
    };

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...users, newUser]));

    const updatedProfile = {
      ...profileData,
      fullName,
      email,
      phone
    };

    setProfileData(updatedProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        isLoggedIn: true,
        fullName,
        email,
        phone
      })
    );

    setIsLoggedIn(true);
    setAuthMessage('Account created successfully.');
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    setAuthMode('login');
    setLoginDetails({ identifier: '', password: '' });
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
            <h1>Login or Sign Up</h1>
          </div>

          <div className="auth-mode-toggle" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={`mode-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('login');
                setAuthMessage('');
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`mode-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('signup');
                setAuthMessage('');
              }}
            >
              Sign Up
            </button>
          </div>

          {authMode === 'login' ? (
            <form className="profile-edit-form auth-form" onSubmit={handleLogin}>
              <div className="form-grid">
                <label className="full-width">
                  Email or Mobile Number
                  <input
                    name="identifier"
                    value={loginDetails.identifier}
                    onChange={handleLoginInputChange}
                    placeholder="Enter email or mobile"
                    required
                  />
                </label>

                <label className="full-width">
                  Password
                  <input
                    name="password"
                    type="password"
                    value={loginDetails.password}
                    onChange={handleLoginInputChange}
                    placeholder="Enter password"
                    required
                  />
                </label>
              </div>

              <p className="auth-helper-text">Use your registered email or mobile number with password.</p>

              <div className="profile-edit-actions">
                <button type="submit" className="save-btn">
                  Login
                </button>
              </div>

              {authMessage && <p className="saved-message">{authMessage}</p>}
            </form>
          ) : (
            <form className="profile-edit-form auth-form" onSubmit={handleSignup}>
              <div className="form-grid">
                <label>
                  Full Name
                  <input
                    name="fullName"
                    value={signupDetails.fullName}
                    onChange={handleSignupInputChange}
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={signupDetails.email}
                    onChange={handleSignupInputChange}
                    required
                  />
                </label>

                <label className="full-width">
                  Mobile Number
                  <input
                    name="phone"
                    value={signupDetails.phone}
                    onChange={handleSignupInputChange}
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    value={signupDetails.password}
                    onChange={handleSignupInputChange}
                    required
                  />
                </label>

                <label>
                  Confirm Password
                  <input
                    name="confirmPassword"
                    type="password"
                    value={signupDetails.confirmPassword}
                    onChange={handleSignupInputChange}
                    required
                  />
                </label>
              </div>

              <div className="profile-edit-actions">
                <button type="submit" className="save-btn">
                  Create Account
                </button>
              </div>

              {authMessage && <p className="saved-message">{authMessage}</p>}
            </form>
          )}
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
