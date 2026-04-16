import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeOrderTracker.css';

const LATEST_ORDER_STORAGE_KEY = 'orderCheyLatestOrder';

const HomeOrderTracker = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem(LATEST_ORDER_STORAGE_KEY);
    if (!savedOrder) return;

    try {
      const parsed = JSON.parse(savedOrder);
      if (parsed?.items?.length) {
        setOrder(parsed);
      }
    } catch {
      setOrder(null);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.removeItem(LATEST_ORDER_STORAGE_KEY);
    setOrder(null);
  };

  if (!order) return null;

  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside className="home-order-tracker" role="status" aria-live="polite">
      <button type="button" className="tracker-close" onClick={handleDismiss} aria-label="Close order tracker">
        x
      </button>

      <p className="tracker-eyebrow">Live Order</p>
      <h3>{order.restaurantName || 'Your Order'}</h3>
      <p className="tracker-eta">Delivery in {order.etaWindow}</p>

      <div className="tracker-items-wrap">
        {order.items.slice(0, 3).map((item) => (
          <p key={item.id} className="tracker-item-row">
            <span>{item.name}</span>
            <strong>x{item.quantity}</strong>
          </p>
        ))}
        {order.items.length > 3 && <p className="tracker-more">+{order.items.length - 3} more items</p>}
      </div>

      <p className="tracker-total">Total items: {totalItems}</p>

      <button type="button" className="tracker-action" onClick={() => navigate('/order')}>
        Track Order
      </button>
    </aside>
  );
};

export default HomeOrderTracker;
