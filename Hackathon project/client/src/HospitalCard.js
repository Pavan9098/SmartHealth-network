import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const HospitalCard = ({ hospital }) => {
  return (
    <Card style={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={hospital.image} // Hospital image URL
        alt={hospital.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {hospital.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Opening Time: {hospital.openingTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Closing Time: {hospital.closingTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Distance: {hospital.distance} km
        </Typography>
      </CardContent>
      <Grid container spacing={1} style={{ padding: '16px' }}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            View Details
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="secondary">
            Get Directions
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HospitalCard;
