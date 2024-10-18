import React from 'react';
import PatientCard from './PatientAppointment';
import Navbar from './Navbar';
import Footer from './Footer';

const Docappoint = () => {
  const patientData = {
    name: 'Akula Sri Ram Karthik',
    phone: '7989388254',
    email: 'sriramkarthikakula6@gmail.com',
    age: 21,
    weight: 71,
    gender: 'M',
    problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '10/08/2024',
    time: '9:20 AM',
    status: 'Treated',
  };

  return (
    <div className="app-container">
        <Navbar />
      <h1>Patients Appointments</h1>
      <PatientCard {...patientData} />
      <PatientCard {...patientData} />
      <PatientCard {...patientData} />
      <Footer />
    </div>
  );
};

export default Docappoint;
