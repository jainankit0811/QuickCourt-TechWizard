import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.use(protect);
router.get('/', getUserProfile);
router.put('/', updateUserProfile);

export default router;