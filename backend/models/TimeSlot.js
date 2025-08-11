import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'maintenance'], default: 'available' },
}, { timestamps: true });

export default mongoose.model('TimeSlot', timeSlotSchema);
