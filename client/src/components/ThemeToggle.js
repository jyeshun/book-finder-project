import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button 
        id="light-mode-btn" 
        className="theme-btn" 
        title="Light Mode"
        onClick={() => setTheme('light')}
        style={{
          backgroundColor: 'var(--light-grey)',
          color: 'var(--dark-grey)'
        }}
      >
        <span className="theme-icon">💡</span>
        <span className="theme-text">Light Mode</span>
      </button>
      <button 
        id="dark-mode-btn" 
        className="theme-btn" 
        title="Dark Mode"
        onClick={() => setTheme('dark')}
        style={{
          backgroundColor: 'var(--dark-grey)',
          color: 'var(--light-grey)'
        }}
      >
        <span className="theme-icon">🌙</span>
        <span className="theme-text">Dark Mode</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
