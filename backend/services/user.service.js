import User from '../models/User.js';

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserProfile = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.fullName = data.fullName || user.fullName;
  user.avatar = data.avatar || user.avatar;
  if (data.password) user.password = data.password;
  await user.save();
  return user;
};

export { getUserProfile, updateUserProfile };