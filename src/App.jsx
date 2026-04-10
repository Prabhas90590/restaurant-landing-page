import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import FeaturedDishes from './components/FeatureDishes/FeaturedDishes';
import Experience from './components/Experience/Experience';
import Chef from './components/chef/Chef';
import Reviews from './components/Review/Reviews';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';
import BookingPage from './components/BookingPage/BookingPage';

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
              <Experience />
              <Chef />
              <Reviews />
              <Gallery />
              <Footer />
            </div>
          }
        />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;