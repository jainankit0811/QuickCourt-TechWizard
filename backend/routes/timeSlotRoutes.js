import express from 'express';
import Court from '../models/Court.js';
import TimeSlot from '../models/TimeSlot.js';

const router = express.Router();

// GET /api/timeslots?courtName=...&date=...
router.get('/time-slot', async (req, res) => {
    try {
        const { courtName, date } = req.query;
        if (!courtName || !date) {
            return res.status(400).json({ error: 'courtName and date are required' });
        }
        // Find the court by name
        const court = await Court.findOne({ name: courtName });
        if (!court) {
            return res.status(404).json({ error: 'Court not found' });
        }
        // Find all slots for this court and date
        const slots = await TimeSlot.find({ court: court._id, date });
        res.json(slots);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
