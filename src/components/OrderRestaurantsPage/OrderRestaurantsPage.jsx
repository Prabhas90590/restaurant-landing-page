import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantsData } from '../../data/restaurantsData';
import './OrderRestaurantsPage.css';

const OrderRestaurantsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="order-restaurants-page">
      <div className="order-restaurants-container">
        <div className="order-page-top">
          <button className="order-back-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
          <h1>Restaurants Near You</h1>
          <p>Delivering to: Your Location</p>
        </div>

        <div className="restaurants-list-grid">
          {restaurantsData.map((restaurant) => (
            <button
              key={restaurant.id}
              type="button"
              className="restaurant-list-card"
              onClick={() => navigate(`/order/${restaurant.id}`)}
            >
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="restaurant-ambience-scroll" aria-hidden="true">
                {(restaurant.ambiencePhotos || []).map((photo) => (
                  <img key={photo} src={photo} alt="" />
                ))}
              </div>
              <div className="restaurant-list-content">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.cuisine}</p>
                <div className="restaurant-meta-row">
                  <span>Rating: {restaurant.rating} / 5</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span>{restaurant.distance}</span>
                </div>
                <span className="view-menu-pill">View Menu</span>
              </div>
            </button>
          ))}
        </div>

        <div className="dining-cta-wrap">
          <button type="button" className="dining-btn" onClick={() => navigate('/#dining')}>
            Dining In
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderRestaurantsPage;
