import React from 'react';
import './Chef.css';

const Chef = () => {
  return (
    <section className="chef-section">
      <div className="chef-container">
        <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c" alt="Master Chef" className="chef-img" />
        <div className="chef-info">
          <span className="chef-title">MASTER CHEF</span>
          <h2>Gordon Smith</h2>
          <p>With over 20 years of experience in Michelin-starred restaurants across Paris and Rome, Chef Gordon brings a unique blend of classic techniques and modern innovation to every dish.</p>
        </div>
      </div>
    </section>
  );
};

export default Chef;