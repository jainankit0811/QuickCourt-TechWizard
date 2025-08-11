const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  sportsSupported: [{ type: String }],
  amenities: [{ type: String }],
  photos: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionComments: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);