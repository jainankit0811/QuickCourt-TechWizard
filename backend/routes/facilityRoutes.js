import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import { createFacility, getAllVenues, getVenueById, updateFacility, approveFacility } from '../controllers/facilityController.js';
import cacheMiddleware from '../middlewares/redisMiddleware.js';

const router = express.Router();

router.get('/', cacheMiddleware('venues'), getAllVenues);
router.get('/:id', cacheMiddleware('venue'), getVenueById);
router.use(protect);
router.post('/', roleCheck(['facility_owner']), createFacility);
router.put('/:id', roleCheck(['facility_owner']), updateFacility);
router.put('/approve/:id', roleCheck(['admin']), approveFacility);

export default router;