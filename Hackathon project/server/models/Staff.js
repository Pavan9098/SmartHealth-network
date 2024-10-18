const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital' },
    DocId: { type: String, unique: true, required: true },
    names: String,
    gender: String,
    specialization: String,
    experience: String,
    contactNumber: String,
    email: String,
    consultationHours: String,
    department: String,
    servicesProvided: String,
    imageUrl: String
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
