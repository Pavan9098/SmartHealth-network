const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  scheduleDate: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  treated: { type: Boolean, default: false },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
