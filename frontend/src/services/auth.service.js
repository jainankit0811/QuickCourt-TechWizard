import axios from '../config/axios.js';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login/', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
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
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout: async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout');
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

export const facilityService = {
  getAllVenues: async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:3001/facilities/', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch venues';
    }
  },

  getVenueById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/facilities/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch venue';
    }
  },

  createFacility: async (facilityData) => {
    try {
      const formData = new FormData();
      Object.keys(facilityData).forEach((key) => {
        if (key === 'photos' && facilityData[key]) {
          facilityData[key].forEach((photo) => formData.append('photos', photo));
        } else if (key === 'sportsSupported') {
          facilityData[key].forEach((sport) => formData.append('sportsSupported[]', sport));
        } else {
          formData.append(key, facilityData[key]);
        }
      });
      const response = await axios.post('http://localhost:3001/facilities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create facility';
    }
  },

  updateFacility: async (id, facilityData) => {
    try {
      const formData = new FormData();
      Object.keys(facilityData).forEach((key) => {
        if (key === 'photos' && facilityData[key]) {
          facilityData[key].forEach((photo) => formData.append('photos', photo));
        } else if (key === 'sportsSupported') {
          facilityData[key].forEach((sport) => formData.append('sportsSupported[]', sport));
        } else {
          formData.append(key, facilityData[key]);
        }
      });
      const response = await axios.put(`http://localhost:3001/facilities/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update facility';
    }
  },

  approveFacility: async (id, { status, comments }) => {
    try {
      const response = await axios.put(`http://localhost:3001/facilities/approve/${id}`, { status, comments });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to approve facility';
    }
  },
};

export const courtService = {
  getCourtById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/courts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch court';
    }
  },

  createCourt: async (courtData) => {
    try {
      const response = await axios.post('http://localhost:3001/courts', courtData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create court';
    }
  },

  updateCourt: async (id, courtData) => {
    try {
      const response = await axios.put(`http://localhost:3001/courts/${id}`, courtData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update court';
    }
  },

  blockTimeSlot: async (courtId, slotData) => {
    try {
      const response = await axios.post(`http://localhost:3001/courts/${courtId}/block-slot`, slotData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to block time slot';
    }
  },
};

export default { authService, userService, facilityService, courtService };
