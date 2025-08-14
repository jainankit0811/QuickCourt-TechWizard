import { getUserProfile as getUserProfileService, updateUserProfile as updateUserProfileService } from '../services/user.service.js';
import { body, validationResult } from 'express-validator';

const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfile = [
  body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await updateUserProfileService(req.user._id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

export { getUserProfile, updateUserProfile };