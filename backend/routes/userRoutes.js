import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.use(protect);

// GET /api/users/profile
router.get('/profile', async (req, res) => {
    return res.json({ id: req.user._id, email: req.user.email, fullName: req.user.fullName, role: req.user.role, avatar: req.user.avatar });
});

// PUT /api/users/profile
router.put('/profile', async (req, res) => {
    const updates = { fullName: req.body.fullName, avatar: req.body.avatar };
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    return res.json({ id: user._id, email: user.email, fullName: user.fullName, role: user.role, avatar: user.avatar });
});

export default router;