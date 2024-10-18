const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    hospitalId: { type: String, unique: true, required: true }, // Custom unique hospital ID
    names: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    servicesOffered: [{ _id: String, name: String }], // Array of strings for services
    numberOfBeds: { type: Number, required: true },
    departments: [{ _id: String, name: String }],// Array of strings for departments
    website: { type: String },
    hospitalDescription: { type: String },
    imagePath: { type: String }, // Path to the hospital image
    latitude: { type: Number },
    longitude: { type: Number },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
