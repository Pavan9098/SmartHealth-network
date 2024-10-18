import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Departments from './Departments';
import ServicesOffered from './ServicesOffered';
import Statistics from './Statistics';
import Doctors from './Doctors';
import Footer from './Footer';
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 
import './App.css';

function HospitalInfo() {
  const { id } = useParams(); // Get the hospital ID from the route parameters
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]); // State to hold doctors
  
  useEffect(() => {
    axios.get(`http://localhost:4000/hospital/${id}`)
      .then(response => {
        setHospital(response.data.hospital); // Set the hospital data
        setDoctors(response.data.doctors); // Set the doctors data
      })
      .catch(error => {
        console.error("There was an error fetching the hospital details!", error);
      });
  }, [id]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <HeroSection 
        name={hospital.names} 
        address={hospital.address} 
        openingTime={hospital.openingTime} 
        closingTime={hospital.closingTime} 
        numberOfBeds={hospital.numberOfBeds} 
      />
      <Departments departments={hospital.departments} />
      <ServicesOffered services={hospital.servicesOffered} />
      <Statistics 
        numberOfBeds={hospital.numberOfBeds} 
        numberOfDoctors={doctors.length} // Use the length of the doctors array
        numberOfPatients={hospital.numberOfPatients} 
      />
      <Doctors doctors={doctors} /> {/* Pass the doctors array */}
      <Footer />
    </div>
  );
}

export default HospitalInfo;
