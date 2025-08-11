import {
  signup as signupService,
  login as loginService,
  logout as logoutService,
} from '../services/authService.js';

const signup = async (req, res) => {
  try {
    const data = await signupService(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await loginService(req.body.email, req.body.password);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await logoutService(req.user._id);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { signup, login, logout };