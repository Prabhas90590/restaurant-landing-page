import React, { useState } from 'react';
import './FeatureDishes.css';

const restaurants = [
  {
    id: 'spice-garden',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop',
    cuisine: 'Indian Fusion',
    menu: [
      {
        name: 'Paneer Tikka Sizzler',
        price: '12.99',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Malai Kofta',
        price: '11.49',
        image: 'https://images.unsplash.com/photo-1701579231378-37208785a2cc?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Butter Naan Basket',
        price: '5.99',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Jeera Rice',
        price: '6.99',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'dragon-bowl',
    name: 'Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1000&auto=format&fit=crop',
    cuisine: 'Chinese Kitchen',
    menu: [
      {
        name: 'Hakka Noodles',
        price: '10.49',
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Chilli Paneer',
        price: '11.49',
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Schezwan Fried Rice',
        price: '9.99',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Veg Manchurian',
        price: '10.99',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'dosa-corner',
    name: 'Dosa Corner',
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1000&auto=format&fit=crop',
    cuisine: 'South Indian',
    menu: [
      {
        name: 'Masala Dosa',
        price: '8.99',
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Idli Sambar',
        price: '7.49',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Medu Vada',
        price: '7.99',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Pongal',
        price: '8.49',
        image: 'https://images.unsplash.com/photo-1680997210275-91b49f06fcb2?w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'olive-table',
    name: 'Olive Table',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&auto=format&fit=crop',
    cuisine: 'Continental',
    menu: [
      {
        name: 'Grilled Fish Fillet',
        price: '13.99',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Pasta Alfredo',
        price: '12.49',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Roasted Chicken',
        price: '14.49',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1000&auto=format&fit=crop'
      },
      {
        name: 'Caesar Salad',
        price: '9.49',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop'
      }
    ]
  }
];

const FeaturedDishes = () => {
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurants[0].id);
  const activeRestaurant = restaurants.find((restaurant) => restaurant.id === activeRestaurantId) || restaurants[0];

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <h2>Popular Dishes</h2>
        <p className="menu-subtitle">Pick a restaurant to view its menu</p>

        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              type="button"
              className={`restaurant-card ${activeRestaurantId === restaurant.id ? 'active' : ''}`}
              onClick={() => setActiveRestaurantId(restaurant.id)}
            >
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
              <div className="restaurant-content">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine}</p>
              </div>
            </button>
          ))}
        </div>

        <h3 className="active-menu-title">{activeRestaurant.name} Menu</h3>

        <div className="scroll-container">
          {activeRestaurant.menu.map((dish, index) => (
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

        <div className="support-box">
          <h3>Customer Support</h3>
          <p>Need help with menu selection, allergies, or group bookings? Contact our support team.</p>
          <div className="support-actions">
            <a href="tel:+919876543210" className="support-btn">Call Support</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="support-btn">WhatsApp</a>
            <a href="mailto:support@foodhaven.com" className="support-btn">Email Us</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;