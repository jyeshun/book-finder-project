import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';

const Home = () => {
  const { user, signout } = useAuth();
  const { theme } = useTheme();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signout();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // Set button styles based on theme - using the same colors as the sign-up button
  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#333333' : '#d7d9d7',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    padding: '10px 20px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  return (
    <div className="container home-container" style={{ position: 'relative' }}>
      {/* Image container positioned absolutely to cover the right half of the entire page */}
      <div className="hero-image-container" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {/* Light tint overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Light black tint */
          zIndex: 1
        }}></div>
        <img 
          src="/assets/hero-image.jpg" 
          alt="Collection of book covers" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left' 
          }}
        />
      </div>
      
      {/* Header with logo and browse button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 40px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <Logo size="small" showText={false} />
        <Link 
          to="/browse" 
          style={buttonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#14919B';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#d7d9d7';
            e.currentTarget.style.color = theme === 'dark' ? '#ffffff' : '#333333';
          }}
        >
          Browse Books
        </Link>
      </div>
      
      <main className="hero" style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '40px',
        flex: 1,
        minHeight: 'calc(100vh - 140px)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="hero-content" style={{
          width: '50%',
          paddingTop: '60px',
          paddingRight: '20px',
          zIndex: 1
        }}>
          <h2 className="hero-title">The</h2>
          <h1 className="hero-subtitle">StoryGraph</h1>
          <p className="hero-description">Because life's too short for a book you're not in the mood for.</p>
          
          <div className="auth-buttons">
            {user ? (
              <div className="user-info">
                <span>Welcome, {user.name}</span>
                <a href="/" onClick={handleSignOut} className="sign-in-link">Sign out</a>
              </div>
            ) : (
              <>
                <Link to="/signup" className="sign-up-btn">Sign up</Link>
                <Link to="/signin" className="sign-in-link">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </main>
      <div className="footer-bar"></div>
    </div>
  );
};

export default Home;
