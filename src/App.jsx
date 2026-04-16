import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import FeaturedDishes from './components/FeatureDishes/FeaturedDishes';
import DiningIn from './components/DiningIn/DiningIn';
import Reviews from './components/Review/Reviews';
import Gallery from './components/Gallery/Gallery';
import UserProfile from './components/UserProfile/UserProfile';
import Footer from './components/Footer/Footer';
import BookingPage from './components/BookingPage/BookingPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import OrderRestaurantsPage from './components/OrderRestaurantsPage/OrderRestaurantsPage';
import RestaurantMenuPage from './components/RestaurantMenuPage/RestaurantMenuPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import SupportChatBot from './components/SupportChatBot/SupportChatBot';
import HomeOrderTracker from './components/HomeOrderTracker/HomeOrderTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Hero />
              <FeaturedDishes />
              <DiningIn />
              <Reviews />
              <Gallery />
              <UserProfile />
              <Footer />
              <SupportChatBot />
              <HomeOrderTracker />
            </div>
          }
        />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<OrderRestaurantsPage />} />
        <Route path="/order/:restaurantId" element={<RestaurantMenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;