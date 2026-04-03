import React from 'react';
import './Review.css';

const reviews = [
  { name: "John Doe", text: "The best steak I've had in years! Highly recommend the atmosphere.", rating: 5 },
  { name: "Sarah Smith", text: "A hidden gem. The service was impeccable and the food was art.", rating: 5 },
  { name: "Mike Ross", text: "Perfect for date nights. Try the signature pasta!", rating: 4 }
];

const Reviews = () => {
  return (
    <section className="review-section">
      <div className="review-container">
        <h2>What Our Customers Say</h2>
        <div className="review-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="review-card">
              <div className="stars">{"★".repeat(rev.rating)}</div>
              <p>"{rev.text}"</p>
              <h4>- {rev.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;