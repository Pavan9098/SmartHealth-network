import React from 'react';
import { Container, Grid } from '@mui/material';
import HospitalCard from './HospitalCard';

const NearbyHospitals = () => {
  // Hard-coded list of hospitals
  const hospitals = [
    {
      id: 1,
      image: 'https://via.placeholder.com/345x140.png?text=Hospital+1', // Replace with real image URLs if available
      name: 'Ayush Hospital 1',
      openingTime: '08:00 AM',
      closingTime: '08:00 PM',
      distance: '2.5'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/345x140.png?text=Hospital+2',
      name: 'Ayush Hospital 2',
      openingTime: '09:00 AM',
      closingTime: '09:00 PM',
      distance: '3.0'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/345x140.png?text=Hospital+3',
      name: 'Ayush Hospital 3',
      openingTime: '07:00 AM',
      closingTime: '07:00 PM',
      distance: '4.0'
    }
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        {hospitals.map((hospital) => (
          <Grid item xs={12} sm={6} md={4} key={hospital.id}>
            <HospitalCard hospital={hospital} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NearbyHospitals;
