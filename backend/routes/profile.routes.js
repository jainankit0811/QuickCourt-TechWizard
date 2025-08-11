import { Router } from 'express';

const router = Router();

// Example profile route
router.get('/profile', (req, res) => {
    res.status(200).json({ message: 'Profile route is working!' });
});

export default router;
