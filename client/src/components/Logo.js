import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Logo = ({ size = 'small', showText = true, textPosition = 'below' }) => {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  
  // Text color based on page and theme
  const textColor = (isHomePage || theme === 'dark') ? 'white' : '#333333';
  
  // Size based on prop and page
  const logoHeight = isAuthPage ? 100 : (size === 'large' ? 80 : 40);
  
  // Logo filter based on page and theme
  const logoFilter = (isHomePage || theme === 'dark') ? 'brightness(0) invert(1)' : 'brightness(0)';
  
  return (
    <div className="logo-container" style={{ 
      textAlign: 'center',
      marginBottom: isAuthPage ? '20px' : '0'
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        display: 'inline-flex', 
        flexDirection: textPosition === 'below' ? 'column' : 'row', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="/assets/storygraph-logo.png" 
          alt="The StoryGraph Logo" 
          height={logoHeight}
          style={{ 
            filter: logoFilter,
            objectFit: 'contain'
          }}
        />
        {showText && (
          <span 
            style={{ 
              color: textColor, 
              marginLeft: textPosition === 'below' ? 0 : '10px', 
              marginTop: textPosition === 'below' ? '10px' : 0,
              fontWeight: 'bold',
              fontSize: isAuthPage ? '1.5rem' : (size === 'large' ? '1.5rem' : '1rem'),
              letterSpacing: isAuthPage ? '2px' : (size === 'large' ? '2px' : 'normal'),
              textAlign: 'center'
            }}
          >
            THE STORYGRAPH
          </span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
