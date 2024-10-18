import React from 'react';
import './App.css';

function ServicesOffered({ services }) {
  return (
    <div className="services-offered">
      <h2>Services Offered</h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>{service.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ServicesOffered;
