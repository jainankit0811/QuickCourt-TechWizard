import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import redisClient from './redis.service.js';
import { uploadImage } from './cloudinary.service.js';

const signup = async ({ email, password, fullName, avatar, role }) => {
  let user = await User.findOne({ email });
  if (user) throw new Error('User already exists');

  let avatarUrl = '';
  if (avatar) {
    avatarUrl = await uploadImage(avatar); // Upload to Cloudinary
  }

  user = new User({ email, password, fullName, avatar: avatarUrl, role });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  await redisClient.setex(`session:${user._id}`, 30 * 24 * 60 * 60, JSON.stringify({ token, role }));
  return { token, user: { id: user._id, email: user.email, role: user.role, fullName: user.fullName, avatar: user.avatar } };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  await redisClient.setex(`session:${user._id}`, 30 * 24 * 60 * 60, JSON.stringify({ token, role: user.role }));
  return { token, user: { id: user._id, email: user.email, role: user.role, fullName: user.fullName, avatar: user.avatar } };
};

const logout = async (userId) => {
  await redisClient.del(`session:${userId}`);
};

export { signup, login, logout };