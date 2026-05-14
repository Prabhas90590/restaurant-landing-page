import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, destination = '/order' }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Save user data to localStorage
    const userData = {
      email: formData.email,
      fullName: formData.email.split('@')[0],
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('orderCheyProfile', JSON.stringify(userData));
    
    // Close modal and navigate to destination
    onClose();
    navigate(destination);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.fullName || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Save user data to localStorage
    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      isLoggedIn: true,
      joinDate: new Date().toISOString()
    };

    localStorage.setItem('orderCheyProfile', JSON.stringify(userData));
    
    // Close modal and navigate to destination
    onClose();
    navigate(destination);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    });
    setError('');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>

        <div className="auth-modal-header">
          <h2>{isLogin ? 'Login to Your Account' : 'Create Your Account'}</h2>
          <p>{isLogin ? 'Sign in to place your order' : 'Join us and start ordering'}</p>
        </div>

        <form className="auth-modal-form" onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={toggleAuthMode}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>Or continue as guest</span>
        </div>

        <button
          type="button"
          className="auth-guest-btn"
          onClick={() => {
            onClose();
            navigate(destination);
          }}
        >
          Browse as Guest
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
