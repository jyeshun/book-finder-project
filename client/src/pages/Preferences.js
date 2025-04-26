import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Preferences = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Initialize state from localStorage
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      emailNotifications: false,
      readingReminders: true,
      privacySettings: false,
      newReleaseAlerts: true,
      weeklyDigest: false,
      readingGoals: true
    };
  });
  
  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);
  
  // Toggle a preference
  const togglePreference = (key) => {
    setPreferences(prev => {
      const newPreferences = {
        ...prev,
        [key]: !prev[key]
      };
      // Save immediately to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };
  
  // Preference items with descriptions
  const preferenceItems = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive emails about your account activity'
    },
    {
      key: 'readingReminders',
      title: 'Reading Reminders',
      description: 'Get reminders to continue reading your books'
    },
    {
      key: 'privacySettings',
      title: 'Enhanced Privacy',
      description: 'Hide your reading activity from other users'
    },
    {
      key: 'newReleaseAlerts',
      title: 'New Release Alerts',
      description: 'Get notified when your favorite authors release new books'
    },
    {
      key: 'weeklyDigest',
      title: 'Weekly Digest',
      description: 'Receive a weekly summary of community activity'
    },
    {
      key: 'readingGoals',
      title: 'Reading Goals',
      description: 'Set and track your reading goals'
    }
  ];
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          Preferences
        </h1>
        
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
              Display Settings
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: theme === 'dark' ? '#444' : '#eee',
                borderRadius: '8px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}>
                    Dark Mode
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: theme === 'dark' ? '#ccc' : '#666'
                  }}>
                    Switch between light and dark theme
                  </p>
                </div>
                
                <div 
                  onClick={toggleTheme}
                  style={{
                    width: '50px',
                    height: '26px',
                    backgroundColor: theme === 'dark' ? '#14919B' : '#ccc',
                    borderRadius: '13px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: theme === 'dark' ? '26px' : '2px',
                    transition: 'left 0.3s'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
              Notification Preferences
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {preferenceItems.slice(0, 3).map((item) => (
                <div 
                  key={item.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: theme === 'dark' ? '#444' : '#eee',
                    borderRadius: '8px'
                  }}
                >
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: theme === 'dark' ? '#fff' : '#333'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#ccc' : '#666'
                    }}>
                      {item.description}
                    </p>
                  </div>
                  
                  <div 
                    onClick={() => togglePreference(item.key)}
                    style={{
                      width: '50px',
                      height: '26px',
                      backgroundColor: preferences[item.key] ? '#14919B' : '#ccc',
                      borderRadius: '13px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: preferences[item.key] ? '26px' : '2px',
                      transition: 'left 0.3s'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
              Reading Experience
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {preferenceItems.slice(3).map((item) => (
                <div 
                  key={item.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: theme === 'dark' ? '#444' : '#eee',
                    borderRadius: '8px'
                  }}
                >
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: theme === 'dark' ? '#fff' : '#333'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#ccc' : '#666'
                    }}>
                      {item.description}
                    </p>
                  </div>
                  
                  <div 
                    onClick={() => togglePreference(item.key)}
                    style={{
                      width: '50px',
                      height: '26px',
                      backgroundColor: preferences[item.key] ? '#14919B' : '#ccc',
                      borderRadius: '13px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: preferences[item.key] ? '26px' : '2px',
                      transition: 'left 0.3s'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            color: theme === 'dark' ? '#aaa' : '#888',
            fontSize: '14px'
          }}>
            <p>Preferences are saved automatically</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preferences;
