import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import Facility from '../models/Facility.js';

const router = express.Router();

// GET all approved facilities with optional filters
router.get('/', async (req, res) => {
    try {
        const { sport, q } = req.query;
        const filter = { status: 'approved' };
        if (sport) filter.sportsSupported = sport;
        if (q) filter.$or = [
            { name: new RegExp(q, 'i') },
            { location: new RegExp(q, 'i') },
        ];
        const facilities = await Facility.find(filter).sort({ createdAt: -1 });
        res.json(facilities);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Owner: create facility (starts as pending)
router.post('/', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const data = { ...req.body, owner: req.user._id, status: 'pending' };
        const facility = await Facility.create(data);
        res.status(201).json(facility);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Owner/Admin: update facility
router.put('/:id', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!facility) return res.status(404).json({ message: 'Facility not found' });
        res.json(facility);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Owner/Admin: delete facility
router.delete('/:id', protect, roleCheck(['facility_owner', 'admin']), async (req, res) => {
    try {
        const facility = await Facility.findByIdAndDelete(req.params.id);
        if (!facility) return res.status(404).json({ message: 'Facility not found' });
        res.json({ message: 'Deleted' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

export default router;
