import { Router } from 'express';

const router = Router();

// Example booking route
router.get('/booking', (req, res) => {
    res.status(200).json({ message: 'Booking route is working!' });
});

export default router;
