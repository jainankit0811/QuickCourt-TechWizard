import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import Court from '../models/Court.js';

const router = express.Router();

// List courts (optionally by facility)
router.get('/court', async (req, res) => {
    try {
        const { facilityId } = req.query;
        const filter = {};
        if (facilityId) filter.facility = facilityId;
        const courts = await Court.find(filter)
            .populate('facility', 'name')
            .sort({ createdAt: -1 });
        res.json(courts);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Create court
router.post('/court', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const { name, sportType, pricePerHour, operatingHours, facility } = req.body;
        if (!name || !sportType || !pricePerHour || !facility) {
            return res.status(400).json({ message: 'name, sportType, pricePerHour, and facility are required' });
        }
        const court = await Court.create({ name, sportType, pricePerHour, operatingHours, facility });
        const populated = await Court.findById(court._id).populate('facility', 'name');
        res.status(201).json(populated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Update court
router.put('/court:id', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const updates = req.body;
        const court = await Court.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('facility', 'name');
        if (!court) return res.status(404).json({ message: 'Court not found' });
        res.json(court);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Delete court
router.delete('/court:id', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const court = await Court.findByIdAndDelete(req.params.id);
        if (!court) return res.status(404).json({ message: 'Court not found' });
        res.json({ message: 'Deleted' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

export default router;
