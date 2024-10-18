import React, { useState } from 'react';
import './Modal.css'; // You'll want to create some basic styling for the modal

function AppointmentModal({ doctor, onClose, onSubmit }) {
  const [problem, setProblem] = useState('');

  const handleSubmit = () => {
    onSubmit(problem);
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book an Appointment with {doctor.name}</h2>
        <textarea
          placeholder="Describe your problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AppointmentModal;
