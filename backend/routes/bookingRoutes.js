import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/bookingController.js';
import cacheMiddleware from '../middlewares/redisMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', roleCheck(['user']), createBooking);
router.get('/my-bookings', roleCheck(['user']), cacheMiddleware('bookings'), getUserBookings);
router.put('/cancel/:id', roleCheck(['user']), cancelBooking);

export default router;