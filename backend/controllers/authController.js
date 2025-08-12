
import { signup as signupService, login as loginService, logout as logoutService } from '../services/authService.js';
import { body, validationResult } from 'express-validator';
import upload from '../middlewares/multerMiddleware.js';

const signup = [
  upload.single('avatar'), // Handle single file upload for avatar
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('role').isIn(['user', 'facility_owner', 'admin']).withMessage('Invalid role'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.file && req.body.avatar) {
        throw new Error('Failed to upload avatar: Invalid file');
      }
      const data = await signupService({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        avatar: req.file?.path, // Path to uploaded file
        role: req.body.role,
      });
      res.status(201).json(data);
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: error.message || 'Failed to process signup request' });
    }
  },
];

const login = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const data = await loginService(req.body.email, req.body.password);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const logout = async (req, res) => {
  try {
    await logoutService(req.user._id);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { signup, login, logout };