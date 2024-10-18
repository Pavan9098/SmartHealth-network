import React from 'react';
import './UserAppointments.css';

const UserAppointments = () => {
  const appointments = [
    {
      name: "Akula Sri Ram karthik",
      phone: "7989388254",
      email: "sriramkarthikakula6@gmail.com",
      specialization: "Ayurveda",
      hospital: "Ayush Bhimavaram Hospital",
      appointmentSlot: "Not Scheduled Yet",
      hospitalAddress: "Add a little bit of body text",
      problem: "Lorem Ipsum is simply dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\""
    },
    // Duplicate appointment for demonstration
    {
      name: "Akula Sri Ram karthik",
      phone: "7989388254",
      email: "sriramkarthikakula6@gmail.com",
      specialization: "Ayurveda",
      hospital: "Ayush Bhimavaram Hospital",
      appointmentSlot: "Not Scheduled Yet",
      hospitalAddress: "Add a little bit of body text",
      problem: "Lorem Ipsum is simply dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\""
    }
  ];

  return (
    <div className="user-appointments">
      <header>
        <div className="avatar">A</div>
        <h1>User Appointments</h1>
        <div className="menu-icon">☰</div>
      </header>
      <main>
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment-card">
            <div className="avatar"></div>
            <div className="appointment-details">
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>Phone:</strong> {appointment.phone}</p>
              <p><strong>email:</strong> {appointment.email}</p>
              <p><strong>Specialization:</strong> {appointment.specialization}</p>
              <p>{appointment.hospital}</p>
              <p><strong>Appointment Slot:</strong> {appointment.appointmentSlot}</p>
              <p><strong>Hospital Address:</strong> {appointment.hospitalAddress}</p>
              <p><strong>Problem:</strong></p>
              <p className="problem-text">{appointment.problem}</p>
            </div>
          </div>
        ))}
      </main>
      <footer>
        <div className="location-icon">📍</div>
        Footer
      </footer>
    </div>
  );
};

export default UserAppointments;