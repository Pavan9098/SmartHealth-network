import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Function to calculate the distance between two locations using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    // Fetch hospital data from backend
    axios.get('http://localhost:4000/hospitals')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the hospital data!", error);
      });

    // Request user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }
  }, []);

  const handleRouteClick = (hospital) => {
    if (userLocation.lat && userLocation.lng) {
      const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.latitude},${hospital.longitude}`;
      window.open(googleMapsLink, '_blank');
    } else {
      alert("Location not available. Please allow location access.");
    }
  };

  // Filter hospitals within 5km radius and calculate their distance
  const nearbyHospitals = hospitals
    .map(hospital => {
      if (userLocation.lat && userLocation.lng) {
        const distance = calculateDistance(userLocation.lat, userLocation.lng, hospital.latitude, hospital.longitude);
        return { ...hospital, distance }; // Attach the calculated distance to the hospital object
      }
      return null;
    })
    .filter(hospital => hospital && hospital.distance <= 5); // Filter only hospitals within 5 km

  return (
    <div><br></br><br></br><br></br><br></br>
      <Box
        style={{
          backgroundImage: 'url(https://wallpaperaccess.com/full/4113244.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          textAlign: 'center',
          alignItems: 'center',
          color: '#fff',
          height: '20vh',
        }}
      >
        <Typography variant="h4">Hey!... Sri Ram Karthik</Typography>
        <Typography variant="h6">Welcome to Ayush Hospitals</Typography>
      </Box>

      <Container>
        <Typography variant="h6" style={{ marginTop: '20px' }}>Nearby Hospitals</Typography>
        <Grid container spacing={3}>
          {nearbyHospitals.map((hospital, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <img src="/static/images/hospital_bg.jpg" alt="hospital" style={{ width: '100%' }} />
                  <Typography variant="h6">{hospital.names}</Typography>
                  <Typography variant="body2">Opening Time: {hospital.openingTime}</Typography>
                  <Typography variant="body2">Closing Time: {hospital.closingTime}</Typography>
                  <Typography variant="body2">Address: {hospital.address}, {hospital.city}, {hospital.state}</Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Distance: {hospital.distance.toFixed(2)} km
                  </Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    <Link to={`/hospital/${hospital._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      Info
                    </Link>
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => handleRouteClick(hospital)}>
                    Route
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '20px', backgroundColor: '#3f51b5', color: '#fff' }}>
        Footer
      </footer>
    </div>
  );
};

export default Dashboard;
