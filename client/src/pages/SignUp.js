import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const SignUp = () => {
  const { user, signup, error } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    email_confirmation: '',
    password: '',
    password_confirmation: '',
    terms: false,
    beta_tester: false
  });
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    // Reset error
    setFormError('');
    
    // Validate name
    if (!formData.name.trim()) {
      setFormError('Please enter your name');
      return false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      setFormError('Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    // Validate email confirmation
    if (formData.email !== formData.email_confirmation) {
      setFormError('Email addresses do not match');
      return false;
    }
    
    // Validate password
    if (!formData.password) {
      setFormError('Please enter a password');
      return false;
    }
    
    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return false;
    }
    
    // Validate password confirmation
    if (formData.password !== formData.password_confirmation) {
      setFormError('Passwords do not match');
      return false;
    }
    
    // Validate terms
    if (!formData.terms) {
      setFormError('Please agree to sign up to our product newsletter');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await signup(formData);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-header">
        <Logo size="large" showText={true} textPosition="below" />
      </div>

      <div className="auth-card">
        <form id="signup-form" className="auth-form" onSubmit={handleSubmit}>
          {formError && <div className="error-message">{formError}</div>}
          {error && !formError && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email_confirmation">Email address confirmation</label>
            <p className="form-hint"><em>Please type in your email address again</em></p>
            <input 
              type="email" 
              id="email_confirmation" 
              name="email_confirmation" 
              value={formData.email_confirmation}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Username</label>
            <p className="form-hint"><em>Lowercase letters, numbers, and underscores only. 3 to 30 characters.</em></p>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <p className="form-hint">Must be at least 8 characters</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input 
              type="password" 
              id="password_confirmation" 
              name="password_confirmation" 
              value={formData.password_confirmation}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              checked={formData.terms}
              onChange={handleChange}
              required 
            />
            <label htmlFor="terms">Sign up to our product newsletter</label>
          </div>
          
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="beta_tester" 
              name="beta_tester" 
              checked={formData.beta_tester}
              onChange={handleChange}
            />
            <label htmlFor="beta_tester">Interested in testing new features early?</label>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
      <div className="footer-bar"></div>
    </div>
  );
};

export default SignUp;
