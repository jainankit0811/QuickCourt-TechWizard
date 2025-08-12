import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/profile/owner-profile?userId=...
router.get('/owner-profile', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) return res.status(400).json({ error: 'User ID required' });
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/profile/owner-profile
router.put('/owner-profile', async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) return res.status(400).json({ error: 'User ID required' });
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
