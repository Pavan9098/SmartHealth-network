import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css'; // Add CSS styles for the map
import L from 'leaflet';

// Ensure that the default marker icon displays correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

function MapView({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lng], 13); // Adjust zoom level as needed
  }, [coordinates, map]);

  return null;
}

function LocationPicker() {
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });
  const [latInput, setLatInput] = useState(coordinates.lat);
  const [lngInput, setLngInput] = useState(coordinates.lng);
  const [storedCoordinates, setStoredCoordinates] = useState(null);

  useEffect(() => {
    // Attempt to get the user's current location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setLatInput(latitude);
          setLngInput(longitude);
        },
        (error) => {
          console.error("Error getting the current location:", error);
        }
      );
    }
  }, []);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setCoordinates({ lat, lng });
    setLatInput(lat);
    setLngInput(lng);
  };

  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setCoordinates({ lat, lng });
    setLatInput(lat);
    setLngInput(lng);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setCoordinates({ lat, lng });
      setStoredCoordinates({ lat, lng }); // Store the coordinates in a variable/state
    } else {
      alert('Invalid coordinates. Please enter valid latitude and longitude.');
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setLatInput(latitude);
          setLngInput(longitude);
        },
        (error) => {
          console.error("Error getting the current location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="location-picker">
      <h2>Pick a location on the map:</h2>
      <div className="map-container">
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={coordinates}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
          >
            <Popup>
              Selected location: <br /> Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
            </Popup>
          </Marker>
          <MapView coordinates={coordinates} />
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit} className="coordinate-form">
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            type="number"
            step="any"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            type="number"
            step="any"
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
          />
        </div>
        {/* <button type="submit">Submit</button>
        <button type="button" onClick={handleUseCurrentLocation} className="current-location-button">
          Use My Location
        </button> */}
      </form>
      <p>Selected Coordinates: Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>
      {storedCoordinates && (
        <p>Stored Coordinates: Latitude: {storedCoordinates.lat}, Longitude: {storedCoordinates.lng}</p>
      )}
    </div>
  );
}

export default LocationPicker;
