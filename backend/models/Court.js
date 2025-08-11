const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportType: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  operatingHours: {
    start: { type: String },
    end: { type: String },
  },
  facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  blockedSlots: [{
    date: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Court', courtSchema);