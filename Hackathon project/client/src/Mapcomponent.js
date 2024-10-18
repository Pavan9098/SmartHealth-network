// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ center, onClick }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }} onClick={onClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add markers or other components as needed */}
    </MapContainer>
  );
};

export default MapComponent;
