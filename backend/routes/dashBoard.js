import express from 'express';
import { protect, roleCheck } from '../middlewares/authMiddleware.js';
import { getDashboard } from '../controllers/dashBoardController.js';

const router = express.Router();

router.use(protect);
router.get('/', roleCheck(['facility_owner', 'admin']), getDashboard);

export default router;