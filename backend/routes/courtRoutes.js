import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import { createCourt, updateCourt,getTimeSlotsByCourt, blockTimeSlot } from '../controllers/courtController.js';
import {getAllCourtsByFacility} from '../services/courtService.js';

const router = express.Router();

router.use(protect);
router.post('/', roleCheck(['facility_owner']), createCourt);
router.put('/:id', roleCheck(['facility_owner']), updateCourt);
router.get('/facility/:facilityId', roleCheck(['facility_owner']), getAllCourtsByFacility);
router.post('/:courtId/block-slot', roleCheck(['facility_owner']), blockTimeSlot);
router.get('/:courtId/time-slots', roleCheck(['facility_owner']), getTimeSlotsByCourt);

export default router;