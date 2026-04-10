import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    partySize: '2',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
    seatingPreference: 'indoor',
    specialRequests: '',
    terms: false
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [availableTimes] = useState(['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const isRestaurantClosed = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    return dayOfWeek === 0; // Close on Sundays (0)
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && formData.date && formData.time && formData.partySize) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone && formData.terms) {
      setBookingConfirmed(true);
      // In a real app, you would send this data to a backend
      console.log('Booking submitted:', formData);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="booking-page">
        <div className="confirmation-container">
          <div className="confirmation-card">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you for your reservation, {formData.fullName}!</p>
            
            <div className="confirmation-details">
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">{formData.date}</span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span className="value">{formData.time}</span>
              </div>
              <div className="detail-item">
                <span className="label">Party Size:</span>
                <span className="value">{formData.partySize} Guests</span>
              </div>
              <div className="detail-item">
                <span className="label">Seating:</span>
                <span className="value">{formData.seatingPreference}</span>
              </div>
            </div>

            <div className="confirmation-message">
              <p>A confirmation email has been sent to <strong>{formData.email}</strong></p>
              <p>You can modify or cancel your reservation using the link in the email.</p>
            </div>

            <button className="back-home-btn" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <button className="close-booking" onClick={() => navigate('/')}>✕</button>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${step === 1 ? 'active' : 'completed'}`}>
            <div className="step-number">1</div>
            <p>Date & Time</p>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <p>Your Details</p>
          </div>
        </div>

        <h1>Reserve Your Table</h1>
        
        {step === 1 ? (
          // Step 1: Date and Time
          <div className="booking-form step-1">
            <div className="form-section">
              <label>Party Size *</label>
              <div className="party-size-selector">
                <button
                  type="button"
                  onClick={() => handleInputChange({ target: { name: 'partySize', value: Math.max(1, parseInt(formData.partySize) - 1).toString() } })}
                  className="size-btn"
                >
                  −
                </button>
                <span className="size-display">{formData.partySize} Guests</span>
                <button
                  type="button"
                  onClick={() => handleInputChange({ target: { name: 'partySize', value: Math.min(12, parseInt(formData.partySize) + 1).toString() } })}
                  className="size-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label>Select Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  max={getMaxDate()}
                  className={isRestaurantClosed(formData.date) ? 'error' : ''}
                />
                {isRestaurantClosed(formData.date) && (
                  <p className="error-text">We're closed on Sundays</p>
                )}
              </div>

              <div className="form-section">
                <label>Select Time *</label>
                {formData.date ? (
                  <select name="time" value={formData.time} onChange={handleInputChange}>
                    <option value="">Choose a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                ) : (
                  <select disabled>
                    <option>Select date first</option>
                  </select>
                )}
              </div>
            </div>

            <div className="form-section">
              <label>Seating Preference</label>
              <select name="seatingPreference" value={formData.seatingPreference} onChange={handleInputChange}>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor/Patio</option>
                <option value="bar">Bar</option>
                <option value="window">Window Seat</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!formData.date || !formData.time || isRestaurantClosed(formData.date)}
              className="next-btn"
            >
              Next: Your Details →
            </button>
          </div>
        ) : (
          // Step 2: Guest Information
          <form className="booking-form step-2" onSubmit={handleSubmit}>
            <div className="form-section">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-section">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-section">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <label>Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Dietary restrictions, allergies, special occasion, etc."
                rows="4"
              ></textarea>
            </div>

            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-item">
                <span>{formData.date} at {formData.time}</span>
                <span className="highlight">{formData.partySize} Guests</span>
              </div>
              <div className="summary-item">
                <span>Seating:</span>
                <span className="highlight">{formData.seatingPreference}</span>
              </div>
            </div>

            <div className="form-section checkbox">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <label>I agree to the cancellation policy. Tables are held for 15 minutes past reservation time.</label>
            </div>

            <div className="button-group">
              <button type="button" onClick={handlePrevious} className="back-btn">
                ← Back
              </button>
              <button type="submit" className="confirm-btn">
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
