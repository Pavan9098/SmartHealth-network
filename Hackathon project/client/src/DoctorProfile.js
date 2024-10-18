import React from 'react';
import './DoctorProfile.css';

const DoctorProfile = () => {
  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">Ayush</div>
        <div className="menu-icon">&#9776;</div>
      </header>
      <div className="profile-content">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Doctor" />
        </div>
        <div className="profile-info">
          <h2>Name: Akula Sri Ram Karthik</h2>
          <p>Specialist: Nothing</p>
          <p>Availability Time: Mon-Fri 9:00 AM to 4:30 PM</p>
          <p>Cell phone: 7989388254</p>
          <p>Email: sriramkarthikakula6@gmail.com</p>
          <p>Experience: 4+ Years</p>
          <p>Rating: ⭐⭐⭐⭐⭐</p>
          <div className="about">
            <h3>About</h3>
            <p>qwertyuioplkjhgfdsaqwertyuiopijuhjgfdsa...</p>
          </div>
          <button className="appointment-btn">Book Appointment</button>
        </div>
      </div>
      <footer className="footer">
        Footer
      </footer>
    </div>
  );
};

export default DoctorProfile;
