import { Router } from 'express';

const router = Router();

// Example facility route
router.post('/facility', (req, res) => {
    res.status(200).json({ message: 'Facility route is working!' });
});

export default router;
