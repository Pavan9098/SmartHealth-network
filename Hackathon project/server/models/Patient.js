const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: String,
    phoneNumber: String,
    age: Number,
    weight: Number,
    gender: String,
    dateOfBirth: Date,
    address: String
});

module.exports = mongoose.model('Patient', PatientSchema);
