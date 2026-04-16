import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { restaurantsData } from '../../data/restaurantsData';
import './RestaurantMenuPage.css';

const RestaurantMenuPage = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [quantities, setQuantities] = useState({});

  const formatInr = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

  const restaurant = useMemo(
    () => restaurantsData.find((item) => item.id === restaurantId),
    [restaurantId]
  );

  const changeQuantity = (itemId, action) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const nextQty = action === 'inc' ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [itemId]: nextQty };
    });
  };

  const cartSummary = useMemo(() => {
    if (!restaurant) return { totalItems: 0, totalPrice: 0 };

    return restaurant.menu.reduce(
      (acc, item) => {
        const qty = quantities[item.id] || 0;
        acc.totalItems += qty;
        acc.totalPrice += qty * item.price;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [quantities, restaurant]);

  const selectedItems = useMemo(() => {
    if (!restaurant) return [];

    return restaurant.menu
      .filter((item) => (quantities[item.id] || 0) > 0)
      .map((item) => {
        const quantity = quantities[item.id] || 0;
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          total: quantity * item.price
        };
      });
  }, [quantities, restaurant]);

  const handleCheckout = () => {
    if (!restaurant || selectedItems.length === 0) return;

    const payload = {
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        image: restaurant.image,
        deliveryTime: restaurant.deliveryTime,
        deliveryTo: restaurant.deliveryTo
      },
      items: selectedItems
    };

    localStorage.setItem('orderCheyCheckoutDraft', JSON.stringify(payload));
    navigate('/checkout', { state: payload });
  };

  if (!restaurant) {
    return (
      <section className="restaurant-menu-page">
        <div className="restaurant-menu-container">
          <button className="menu-back-btn" onClick={() => navigate('/order')}>
            Back to Restaurants
          </button>
          <h1>Restaurant not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="restaurant-menu-page">
      <div className="restaurant-menu-container">
        <button className="menu-back-btn" onClick={() => navigate('/order')}>
          Back to Restaurants
        </button>

        <div className="restaurant-header">
          <img src={restaurant.image} alt={restaurant.name} />
          <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <div className="restaurant-header-meta">
              <span>Rating: {restaurant.rating} / 5</span>
              <span>Delivery: {restaurant.deliveryTime}</span>
              <span>To: {restaurant.deliveryTo}</span>
            </div>
          </div>
        </div>

        <div className="menu-layout">
          <div className="food-items-list">
            {restaurant.menu.map((item) => (
              <article key={item.id} className="food-item-card">
                <div>
                  <h2>{item.name}</h2>
                  <p>{formatInr(item.price)}</p>
                </div>
                <div className="qty-controls">
                  <button type="button" onClick={() => changeQuantity(item.id, 'dec')}>-</button>
                  <span>{quantities[item.id] || 0}</span>
                  <button type="button" onClick={() => changeQuantity(item.id, 'inc')}>+</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h3>Your Cart</h3>
            <p>Total Items: {cartSummary.totalItems}</p>
            <p>Total Price: {formatInr(cartSummary.totalPrice)}</p>
            <button type="button" onClick={handleCheckout} disabled={cartSummary.totalItems === 0}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenuPage;
