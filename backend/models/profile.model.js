// Profile Model
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    address: String,
    businessName: String,
    businessType: String,
    description: String,
    joinDate: String,
    totalFacilities: String,
    totalCourts: String,
    averageRating: String
});

module.exports = mongoose.model('Profile', profileSchema);
