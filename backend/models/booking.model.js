// Booking Model
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: String,
    userName: String,
    userEmail: String,
    courtName: String,
    facility: String,
    date: String,
    time: String,
    status: String,
    price: Number,
    paymentStatus: String
});

module.exports = mongoose.model('Booking', bookingSchema);
