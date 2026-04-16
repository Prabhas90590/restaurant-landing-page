import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const LATEST_ORDER_STORAGE_KEY = 'orderCheyLatestOrder';

const formatInr = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

const defaultAddress = {
  fullName: '',
  phone: '',
  line1: '',
  city: '',
  pincode: ''
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialDraft = useMemo(() => {
    if (location.state?.items?.length) return location.state;

    const savedDraft = localStorage.getItem('orderCheyCheckoutDraft');
    if (!savedDraft) return null;

    try {
      const parsed = JSON.parse(savedDraft);
      return parsed?.items?.length ? parsed : null;
    } catch {
      return null;
    }
  }, [location.state]);

  const [items, setItems] = useState(initialDraft?.items || []);
  const [address, setAddress] = useState(defaultAddress);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [instructions, setInstructions] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isPlaced, setIsPlaced] = useState(false);
  const [showPlacedAnimation, setShowPlacedAnimation] = useState(false);

  const restaurant = initialDraft?.restaurant;

  const changeQty = (itemId, action) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== itemId) return item;
          const nextQty = action === 'inc' ? item.quantity + 1 : Math.max(0, item.quantity - 1);
          return { ...item, quantity: nextQty, total: nextQty * item.price };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const pricing = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.total, 0);
    const deliveryFee = 49;
    const platformFee = 12;
    const tax = subtotal * 0.05;

    let discount = 0;
    let finalDelivery = deliveryFee;

    if (appliedCoupon === 'FOOD10') {
      discount = subtotal * 0.1;
    }

    if (appliedCoupon === 'FREESHIP') {
      finalDelivery = 0;
    }

    const grandTotal = Math.max(0, subtotal + finalDelivery + platformFee + tax - discount);

    return {
      subtotal,
      deliveryFee: finalDelivery,
      platformFee,
      tax,
      discount,
      grandTotal
    };
  }, [items, appliedCoupon]);

  const handleApplyCoupon = () => {
    const normalized = couponCode.trim().toUpperCase();

    if (normalized === 'FOOD10' || normalized === 'FREESHIP') {
      setAppliedCoupon(normalized);
      setStatusMessage(`Coupon ${normalized} applied.`);
      return;
    }

    setAppliedCoupon('');
    setStatusMessage('Invalid coupon. Try FOOD10 or FREESHIP.');
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!items.length) {
      setStatusMessage('Your cart is empty. Add items to continue.');
      return;
    }

    if (!address.fullName || !address.phone || !address.line1 || !address.city || !address.pincode) {
      setStatusMessage('Please complete delivery details.');
      return;
    }

    const etaMin = 20 + Math.floor(Math.random() * 15);
    const etaWindow = `${etaMin}-${etaMin + 10} mins`;

    localStorage.setItem(
      LATEST_ORDER_STORAGE_KEY,
      JSON.stringify({
        restaurantName: restaurant.name,
        etaWindow,
        placedAt: Date.now(),
        items: items.map(({ id, name, quantity, total }) => ({
          id,
          name,
          quantity,
          total
        }))
      })
    );

    localStorage.removeItem('orderCheyCheckoutDraft');
    setStatusMessage(`Order placed successfully. ETA ${etaWindow}.`);
    setIsPlaced(true);
    setShowPlacedAnimation(true);

    setTimeout(() => {
      setShowPlacedAnimation(false);
    }, 1800);
  };

  if (!initialDraft || !restaurant) {
    return (
      <section className="checkout-page">
        <div className="checkout-container empty-checkout">
          <h1>Checkout</h1>
          <p>No items found for checkout.</p>
          <button type="button" onClick={() => navigate('/order')}>Back to Restaurants</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <button className="checkout-back-btn" onClick={() => navigate(`/order/${restaurant.id}`)}>
          Back to Menu
        </button>

        <div className="checkout-top">
          <h1>Checkout</h1>
          <p>{restaurant.name} • {restaurant.cuisine}</p>
        </div>

        <div className="checkout-grid">
          <div className="checkout-main">
            <div className="checkout-card">
              <h2>Ordered Items</h2>
              {items.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatInr(item.price)} each</p>
                  </div>
                  <div className="checkout-item-actions">
                    <button type="button" onClick={() => changeQty(item.id, 'dec')}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => changeQty(item.id, 'inc')}>+</button>
                    <strong>{formatInr(item.total)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-card">
              <h2>Delivery Details</h2>
              <div className="checkout-form-grid">
                <input name="fullName" value={address.fullName} onChange={handleAddressChange} placeholder="Full Name" />
                <input name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" />
                <input className="full" name="line1" value={address.line1} onChange={handleAddressChange} placeholder="Address Line" />
                <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" />
                <input name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder="Pincode" />
              </div>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Delivery instructions (optional)"
                rows="3"
              />
            </div>

            <div className="checkout-card">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label><input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery</label>
                <label><input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label>
                <label><input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} /> Card</label>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>Bill Summary</h2>

            <div className="coupon-row">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
              />
              <button type="button" onClick={handleApplyCoupon}>Apply</button>
            </div>

            <div className="price-row"><span>Subtotal</span><span>{formatInr(pricing.subtotal)}</span></div>
            <div className="price-row"><span>Delivery Fee</span><span>{formatInr(pricing.deliveryFee)}</span></div>
            <div className="price-row"><span>Platform Fee</span><span>{formatInr(pricing.platformFee)}</span></div>
            <div className="price-row"><span>Tax</span><span>{formatInr(pricing.tax)}</span></div>
            <div className="price-row discount"><span>Discount</span><span>-{formatInr(pricing.discount)}</span></div>
            <div className="price-row total"><span>Total</span><span>{formatInr(pricing.grandTotal)}</span></div>

            <button
              type="button"
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isPlaced}
            >
              {isPlaced ? 'Order Placed' : 'Place Order'}
            </button>

            {statusMessage && <p className="checkout-status">{statusMessage}</p>}
          </aside>
        </div>
      </div>

      {showPlacedAnimation && (
        <div className="order-placed-overlay" role="status" aria-live="polite">
          <div className="order-placed-card">
            <div className="success-ring">
              <div className="checkmark">✓</div>
            </div>
            <h3>Your Order Is Placed!</h3>
            <p>Thanks for ordering. Your food is on the way.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
