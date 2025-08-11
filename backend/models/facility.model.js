// Facility Model
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    sports: [String],
    amenities: [String],
    courts: Number,
    status: String,
    image: String
});

module.exports = mongoose.model('Facility', facilitySchema);
