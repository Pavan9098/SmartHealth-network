import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
function Doctors({ doctors }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [doctorStatuses, setDoctorStatuses] = useState([]);

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period === 'PM' && hours !== 12 ? hours + 12 : hours;
    return new Date().setHours(hours24 % 24, minutes, 0, 0);
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? 'AM' : 'PM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  };

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const interval = 10; // minutes
    const startDate = parseTime(startTime);
    const endDate = parseTime(endTime);
    const middayStart = parseTime('12:00 PM');
    const middayEnd = parseTime('2:00 PM');
    
    // Generate time slots for the first period
    let current = startDate;
    while (current < middayStart) {
      slots.push(formatTime(new Date(current)));
      current += interval * 60000; // increment by 10 minutes
    }

    // Generate time slots for the second period
    current = middayEnd;
    while (current < endDate) {
      slots.push(formatTime(new Date(current)));
      current += interval * 60000; // increment by 10 minutes
    }

    return slots;
  };

  const convertToFormattedTime = (time) => {
    let [hour, period] = time.split(' ');
    hour = parseInt(hour);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    if (hour === 0) {
      hour = 12;
      period = 'AM';
    } else if (hour > 12) {
      hour -= 12;
      period = 'PM';
    } else {
      period = hour >= 12 ? 'PM' : 'AM';
    }
    return `${hour}:00 ${period}`;
  };

  const fetchDoctorStatuses = async () => {
    const statuses = [];

    for (const doctor of doctors) {
      const [startTime, endTime] = doctor.consultationHours.split(' - ');
      const formattedStartTime = convertToFormattedTime(startTime);
      const formattedEndTime = convertToFormattedTime(endTime);

      const availableTimeSlots = generateTimeSlots(formattedStartTime, formattedEndTime).length;

      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get('http://localhost:4000/appointments', {
          params: {
            docId: doctor.DocId,
            date: today
          }
        });

        const scheduledTimes = response.data.scheduleTime.length;
        const slotsDifference = availableTimeSlots - scheduledTimes;
        let status;

        if (slotsDifference <= 0) {
          status = 'Busy';
        } else if (slotsDifference < 10) {
          status = 'Little Busy';
        } else {
          status = 'Available';
        }

        statuses.push({
          doctorId: doctor.DocId,
          status: status
        });
      } catch (error) {
        console.error(`Error fetching appointments for doctor ${doctor.DocId}:`, error);
      }
    }

    setDoctorStatuses(statuses);
  };

  useEffect(() => {
    fetchDoctorStatuses();
  }, [doctors]);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    
    const [startTime, endTime] = doctor.consultationHours.split(' - ');
    const formattedStartTime = convertToFormattedTime(startTime);
    const formattedEndTime = convertToFormattedTime(endTime);
    setTimeSlots(generateTimeSlots(formattedStartTime, formattedEndTime));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  const onDateChange = async (date) => {
    if (!selectedDoctor) {
      console.error('No doctor selected.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/appointments', {
        params: {
          docId: selectedDoctor.DocId,
          date: date
        }
      });
      const scheduledTimes = response.data.scheduleTime;

      if (scheduledTimes.length > 0) {
        const updatedTimeSlots = timeSlots.filter(timeSlot => !scheduledTimes.includes(timeSlot));
        setTimeSlots(updatedTimeSlots);
      }
    } catch (error) {
      console.error('Error fetching schedule times:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        console.error('User ID not found in localStorage.');
        return;
      }
  
      const appointmentData = {
        userId,
        docId: selectedDoctor.DocId,
        hospitalId: selectedDoctor.hospitalId,
        scheduleDate: selectedDate,
        scheduleTime: selectedTime,
        treated: false,
      };
  
      const response = await axios.post('http://localhost:4000/appointments', appointmentData);
  
      console.log('Appointment submitted successfully:', response.data);
      message.success('Appointment booked successfully!');

    } catch (error) {
      console.error('Error submitting appointment:', error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="doctors-section">
      <h2>Our Doctors</h2>
      <div className="doctors-list">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <img src={doctor.imageUrl} alt={doctor.names} className="doctor-image" />
            <div className="doctor-info">
              <h3>{doctor.names}</h3>
              <p><strong>Specialty:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Available Timings:</strong> {doctor.consultationHours}</p>
              <p><strong>Status:</strong> {
                doctorStatuses.find(status => status.doctorId === doctor.DocId)?.status || 'Loading...'
              }</p>
              {decodedToken.role!="hospital" && <button className="appointment-btn" onClick={() => openModal(doctor)}>Make an Appointment</button>}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Appointment with Dr. {selectedDoctor.names}</h2>
            <label>
              Select a Date:
              <input 
                type="date" 
                value={selectedDate} 
                onChange={handleDateChange}
              />
            </label>
            <label>
              Select a Time:
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Time</option>
                {timeSlots.map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>{timeSlot}</option>
                ))}
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
