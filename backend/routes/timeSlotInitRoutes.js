import express from 'express';
import Court from '../models/Court.js';
import TimeSlot from '../models/TimeSlot.js';

const router = express.Router();

// Utility: Generate time slots for a day
function generateTimeSlots() {
    return [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
    ];
}

// POST /api/timeslots/init
// Creates all time slots for a court and date as 'available' if missing
router.post('/init', async (req, res) => {
    try {
        const { courtName, date } = req.body;
        if (!courtName || !date) {
            return res.status(400).json({ error: 'courtName and date are required' });
        }
        const court = await Court.findOne({ name: courtName });
        if (!court) {
            return res.status(404).json({ error: 'Court not found' });
        }
        const slots = generateTimeSlots();
        const createdSlots = [];
        for (const time of slots) {
            const exists = await TimeSlot.findOne({ court: court._id, date, time });
            if (!exists) {
                const slot = new TimeSlot({ court: court._id, date, time, status: 'available' });
                await slot.save();
                createdSlots.push(slot);
            }
        }
        res.json({ created: createdSlots.length, slots: createdSlots });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
