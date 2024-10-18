import React from 'react';
import './App.css';

function Departments({ departments }) {
  return (
    <div className="departments">
      <h2>Departments</h2>
      <div className="department-list">
        {departments.map((department, index) => (
          <div className="department-item" key={index}>{department.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Departments;
