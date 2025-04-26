import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const ManageAccount = () => {
  const { theme } = useTheme();
  const { user, setUser } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    // Validate form
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      setIsLoading(false);
      return;
    }
    
    try {
      // Prepare data for API
      const updateData = {
        name: formData.name,
        email: formData.email
      };
      
      // Only include password fields if user is changing password
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      // Call API
      const result = await authService.updateAccount(updateData);
      
      // Update user context
      if (result.user) {
        setUser(result.user);
      }
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      
      setMessage({ text: 'Account updated successfully', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to update account', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          Manage Account
        </h1>
        
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
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
            Account Information
          </h2>
          
          {message.text && (
            <div style={{
              padding: '10px 15px',
              marginBottom: '20px',
              borderRadius: '4px',
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message.text}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <label style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#666',
                  fontWeight: 'bold'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '10px',
                    backgroundColor: theme === 'dark' ? '#444' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    borderRadius: '4px',
                    color: theme === 'dark' ? '#fff' : '#333',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <label style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#666',
                  fontWeight: 'bold'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '10px',
                    backgroundColor: theme === 'dark' ? '#444' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    borderRadius: '4px',
                    color: theme === 'dark' ? '#fff' : '#333',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}>
                  Change Password (Optional)
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}>
                    <label style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#aaa' : '#666',
                      fontWeight: 'bold'
                    }}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      style={{
                        padding: '10px',
                        backgroundColor: theme === 'dark' ? '#444' : '#fff',
                        border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                        borderRadius: '4px',
                        color: theme === 'dark' ? '#fff' : '#333',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}>
                    <label style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#aaa' : '#666',
                      fontWeight: 'bold'
                    }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      style={{
                        padding: '10px',
                        backgroundColor: theme === 'dark' ? '#444' : '#fff',
                        border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                        borderRadius: '4px',
                        color: theme === 'dark' ? '#fff' : '#333',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}>
                    <label style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#aaa' : '#666',
                      fontWeight: 'bold'
                    }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      style={{
                        padding: '10px',
                        backgroundColor: theme === 'dark' ? '#444' : '#fff',
                        border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                        borderRadius: '4px',
                        color: theme === 'dark' ? '#fff' : '#333',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px'
              }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    backgroundColor: '#14919B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isLoading ? 'default' : 'pointer',
                    opacity: isLoading ? '0.7' : '1',
                    flex: '1'
                  }}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      currentPassword: '',
                      newPassword: '',
                      confirmNewPassword: ''
                    });
                    setMessage({ text: '', type: '' });
                  }}
                  disabled={isLoading}
                  style={{
                    backgroundColor: theme === 'dark' ? '#555' : '#eee',
                    color: theme === 'dark' ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isLoading ? 'default' : 'pointer',
                    opacity: isLoading ? '0.7' : '1'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <label style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#666',
                  fontWeight: 'bold'
                }}>
                  Username
                </label>
                <div style={{
                  padding: '10px',
                  backgroundColor: theme === 'dark' ? '#444' : '#eee',
                  borderRadius: '4px',
                  color: theme === 'dark' ? '#ccc' : '#333'
                }}>
                  {user?.name || 'Username'}
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <label style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#666',
                  fontWeight: 'bold'
                }}>
                  Email
                </label>
                <div style={{
                  padding: '10px',
                  backgroundColor: theme === 'dark' ? '#444' : '#eee',
                  borderRadius: '4px',
                  color: theme === 'dark' ? '#ccc' : '#333'
                }}>
                  {user?.email || 'user@example.com'}
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <label style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#666',
                  fontWeight: 'bold'
                }}>
                  Password
                </label>
                <div style={{
                  padding: '10px',
                  backgroundColor: theme === 'dark' ? '#444' : '#eee',
                  borderRadius: '4px',
                  color: theme === 'dark' ? '#ccc' : '#333'
                }}>
                  ••••••••
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: '#14919B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Update Account Information
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageAccount;
