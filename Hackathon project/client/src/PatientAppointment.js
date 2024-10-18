import React from 'react';
import './PatientCard.css';

const PatientCard = ({ name, phone, email, age, weight, gender, problem, date, time, status }) => {
  return (
    <div className="patient-card">
      <div className="patient-info">
        <div className="patient-image">
          <img src="path-to-profile-image" alt="Profile" />
        </div>
        <div className="patient-details">
          <h3>Patient Name: {name}</h3>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Age: {age} Weight: {weight} KG Gender: {gender}</p>
        </div>
      </div>
      <div className="patient-problem">
        <h4>Problem:</h4>
        <p>{problem}</p>
      </div>
      <div className="appointment-info">
        <p>Appointment Slot: {date}</p>
        <p>{time}</p>
        <button className="status-button">{status}</button>
      </div>
    </div>
  );
};

export default PatientCard;
