

import axios from '../config/axios.js';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data; // Returns token and user (including role)
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (userData) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === 'avatar' && userData[key]) {
          formData.append('avatar', userData[key]);
        } else {
          formData.append(key, userData[key]);
        }
      });
      const response = await axios.post('http://localhost:3001/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data; // Returns token and user (including role)
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      throw error.response?.data?.message || 'Logout failed';
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },
};

export const userService = {
  getProfile: async () => {
    try {
      const response = await axios.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch profile';
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await axios.put('/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile';
    }
  },
};

export default { authService, userService };