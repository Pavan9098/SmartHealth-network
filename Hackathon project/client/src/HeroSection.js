import React from 'react';
import './App.css';

function HeroSection({ name, address, openingTime, closingTime, numberOfBeds }) {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>{name}</h1>
        <p>{address}</p>
        <p>Opening time: {openingTime}</p>
        <p>Closing time: {closingTime}</p>
        <p>Number of beds available: {numberOfBeds}</p>
      </div>
    </div>
  );
}

export default HeroSection;
