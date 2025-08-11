import { signup, login, logout } from '../services/authService.js';

const signup = async (req, res) => {
  try {
    const data = await signup(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await login(req.body.email, req.body.password);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await logout(req.user._id);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { signup, login, logout };