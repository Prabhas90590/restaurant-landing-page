import React from 'react';
import './FeatureDishes.css';

// 1. We define our data here instead of fetching it
const dishes = [
  {
    name: "Classic Cheeseburger",
    price: "12.99",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
  },
  {
    name: "Spaghetti Carbonara",
    price: "11.99",
    image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500"
  },
  {
    name: "Grilled Ribeye Steak",
    price: "13.99",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500"
  },
  {
    name: "Fresh Caesar Salad",
    price: "9.99",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
  }
];

const FeaturedDishes = () => {
  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <h2>Popular Dishes</h2>
        <div className="scroll-container">
          {dishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <img src={dish.image} alt={dish.name} className="dish-img" />
              <div className="dish-info">
                <div className="dish-header">
                  <h3>{dish.name}</h3>
                  <span className="price">${dish.price}</span>
                </div>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;