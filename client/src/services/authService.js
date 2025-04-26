import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Handle API errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network error:', error);
    throw new Error('No response from server. Make sure the server is running and try again.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request setup error:', error);
    throw new Error(error.message || 'An error occurred');
  }
};

// Auth service methods
const authService = {
  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/current-user');
      return response.data;
    } catch (error) {
      // Don't throw an error for this method, just return null
      return null;
    }
  },

  // Sign up
  signup: async (userData) => {
    try {
      const response = await api.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Sign in
  signin: async (credentials) => {
    try {
      const response = await api.post('/api/auth/signin', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Sign out
  signout: async () => {
    try {
      const response = await api.post('/api/auth/signout');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  
  // Update account information
  updateAccount: async (userData) => {
    try {
      const response = await api.put('/api/auth/update-account', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  
  // Update profile image
  updateProfileImage: async (profileImage) => {
    try {
      const response = await api.put('/api/auth/update-profile-image', { profileImage });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default authService;
