import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import FeaturedDishes from './components/FeatureDishes/FeaturedDishes';
import Experience from './components/Experience/Experience';
import Chef from './components/chef/Chef';
import Reviews from './components/Review/Reviews';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';

function App() {
  return (
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
  );
}

export default App;