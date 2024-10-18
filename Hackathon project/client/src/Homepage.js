// src/components/HomePage.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Fab } from '@mui/material';
import { jwtDecode } from 'jwt-decode';  // Importing as a named import
import "./Homepage.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token is present in local storage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to extract the user's role
        const decodedToken = jwtDecode(token);

        // Navigate based on the user's role
        switch (decodedToken.role) {
          case 'hospital':
            navigate(`/hospital/${decodedToken.userId}`);
            break;
          case 'doctor':
            navigate('/docappoint');
            break;
          default:
            // Navigate to a generic page or handle unknown roles
            navigate('/');
        }
      } catch (error) {
        console.error('Invalid token', error);
        // Optionally, you could remove the invalid token
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>Ayush Services Availability App</h1>
        <div className="navbar-links">
          <Link to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </Link>
          <Link to="/user-registration">
            <Button variant="contained" color="secondary">Help Support</Button>
          </Link>
        </div>
      </nav>
      
      <div className="content">
        <h2>Welcome to the Ayush Services Finder!</h2>
        <p>Find and access Ayush hospitals across India with ease.</p>
        <div className="registration-forms">
          <Link to="/hosreg">
            <Button variant="contained" color="primary">Hospital Registration</Button>
          </Link>
          <Link to="/userreg">
            <Button variant="contained" color="secondary">User Registration</Button>
          </Link>
        </div>
      </div>
      <div>
        <span className="floating-button">
          <Fab color="primary" onClick={() => window.scrollTo(0, 0)}>
            <i className="bi bi-geo-alt-fill"></i>
          </Fab>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
