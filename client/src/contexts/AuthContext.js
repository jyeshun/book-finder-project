import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Sign up function
  const signup = async (userData) => {
    try {
      setError(null);
      const response = await authService.signup(userData);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during sign up');
      throw err;
    }
  };

  // Sign in function
  const signin = async (credentials) => {
    try {
      setError(null);
      const response = await authService.signin(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during sign in');
      throw err;
    }
  };

  // Sign out function
  const signout = async () => {
    try {
      setError(null);
      await authService.signout();
      setUser(null);
    } catch (err) {
      setError(err.message || 'An error occurred during sign out');
      throw err;
    }
  };

  // Value to be provided by the context
  const value = {
    user,
    setUser,
    loading,
    error,
    signup,
    signin,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
