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

// User books service methods
const userBooksService = {
  // Get user's books and reading stats
  getUserBooks: async () => {
    try {
      const response = await api.get('/api/books/user');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Add book to "To Read" list
  addToReadList: async (bookData) => {
    try {
      const response = await api.post('/api/books/to-read', bookData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Add book to "Read" list
  addToReadBooks: async (bookData) => {
    try {
      const response = await api.post('/api/books/read', bookData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Remove book from "To Read" list
  removeFromToReadList: async (bookId) => {
    try {
      const response = await api.delete(`/api/books/to-read/${bookId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Remove book from "Read" list
  removeFromReadBooks: async (bookId) => {
    try {
      const response = await api.delete(`/api/books/read/${bookId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default userBooksService;
