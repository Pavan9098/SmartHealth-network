import React from 'react';
import './App.css';

function Statistics({ numberOfBeds, numberOfDoctors, numberOfPatients }) {
  return (
    <div className="statistics">
      <div className="stat-item">{numberOfBeds}+<br />Number of beds</div>
      <div className="stat-item">{numberOfDoctors}+<br />Number of Doctors</div>
      <div className="stat-item">{numberOfPatients}+<br />Number of Patients</div>
    </div>
  );
}

export default Statistics;
