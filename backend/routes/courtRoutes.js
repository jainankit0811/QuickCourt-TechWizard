import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import { createCourt, updateCourt, blockTimeSlot } from '../controllers/courtController.js';

const router = express.Router();

router.use(protect);
router.post('/', roleCheck(['facility_owner']), createCourt);
router.put('/:id', roleCheck(['facility_owner']), updateCourt);
router.post('/:courtId/block-slot', roleCheck(['facility_owner']), blockTimeSlot);

export default router;