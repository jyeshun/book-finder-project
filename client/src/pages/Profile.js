import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import BookPlaceholder from '../components/BookPlaceholder';
import userBooksService from '../services/userBooksService';
import authService from '../services/authService';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booksRead, setBooksRead] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || '/assets/profileimage.PNG');
  
  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image size should be less than 2MB');
      return;
    }
    
    try {
      setUploadingImage(true);
      setImageError(null);
      
      // Resize and convert image to base64
      const resizedImage = await resizeImage(file, 300, 300);
      
      // Update profile image in the database
      const result = await authService.updateProfileImage(resizedImage);
      
      // Update local state and user context
      setProfileImage(resizedImage);
      if (result && result.user) {
        setUser({
          ...user,
          profileImage: resizedImage
        });
      }
      
      setUploadingImage(false);
    } catch (err) {
      console.error('Error uploading profile image:', err);
      setImageError(err.message || 'Failed to upload profile image');
      setUploadingImage(false);
    }
  };
  
  // Function to resize image and convert to base64
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // Canvas for resizing
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculates new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          
          // Set canvas dimensions and draw resized image
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with reduced quality
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64);
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Fetch user's books
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await userBooksService.getUserBooks();
        
        setBooksRead(data.booksRead || []);
        setBooksToRead(data.booksToRead || []);
      } catch (err) {
        console.error('Error fetching user books:', err);
        setError('Failed to load your books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserBooks();
  }, [user]);
  
  // Calculate account age
  const accountCreationDate = new Date(user?.createdAt || new Date());
  const today = new Date();
  const accountAgeInDays = Math.floor((today - accountCreationDate) / (1000 * 60 * 60 * 24));
  
  // Format account age
  let accountAge;
  if (accountAgeInDays < 1) {
    accountAge = 'Today';
  } else if (accountAgeInDays === 1) {
    accountAge = '1 day';
  } else if (accountAgeInDays < 30) {
    accountAge = `${accountAgeInDays} days`;
  } else if (accountAgeInDays < 365) {
    const months = Math.floor(accountAgeInDays / 30);
    accountAge = `${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    const years = Math.floor(accountAgeInDays / 365);
    const remainingMonths = Math.floor((accountAgeInDays % 365) / 30);
    accountAge = `${years} ${years === 1 ? 'year' : 'years'}`;
    if (remainingMonths > 0) {
      accountAge += ` and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  }
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div 
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
              border: `3px solid ${theme === 'dark' ? '#444' : '#eee'}`,
              cursor: 'pointer'
            }}
            onClick={triggerFileInput}
          >
            {uploadingImage && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '12px'
              }}>
                Uploading...
              </div>
            )}
            <img 
              src={profileImage} 
              alt="Profile" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              fontSize: '12px',
              textAlign: 'center',
              padding: '4px 0'
            }}>
              Change
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          
          {imageError && (
            <p style={{
              color: '#dc3545',
              fontSize: '14px',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {imageError}
            </p>
          )}
          
          <h1 style={{ 
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: theme === 'dark' ? '#fff' : '#333'
          }}>
            {user?.name || 'User Name'}
          </h1>
          
          <p style={{ 
            fontSize: '16px',
            color: theme === 'dark' ? '#ccc' : '#666',
            marginBottom: '15px'
          }}>
            Member for {accountAge}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '10px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '10px 20px',
              backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#14919B'
              }}>
                {booksRead.length}
              </div>
              <div style={{
                fontSize: '14px',
                color: theme === 'dark' ? '#ccc' : '#666'
              }}>
                Books Read
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '10px 20px',
              backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#14919B'
              }}>
                {booksToRead.length}
              </div>
              <div style={{
                fontSize: '14px',
                color: theme === 'dark' ? '#ccc' : '#666'
              }}>
                To Read
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          {/* Recently Read Section */}
          <div>
            <h2 style={{ 
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: theme === 'dark' ? '#fff' : '#333',
              borderBottom: `2px solid ${theme === 'dark' ? '#444' : '#eee'}`,
              paddingBottom: '10px'
            }}>
              Recently Read
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {loading ? (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  Loading your books...
                </p>
              ) : error ? (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  {error}
                </p>
              ) : booksRead.map(book => (
                <div 
                  key={book.id}
                  style={{
                    display: 'flex',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '90px',
                    flexShrink: 0
                  }}>
                    {book.thumbnail ? (
                      <img 
                        src={book.thumbnail} 
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <BookPlaceholder width={60} height={90} />
                    )}
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: theme === 'dark' ? '#fff' : '#333'
                    }}>
                      {book.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#ccc' : '#666',
                      marginBottom: '5px'
                    }}>
                      {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                    </p>
                    
                    <p style={{ 
                      fontSize: '12px',
                      color: theme === 'dark' ? '#aaa' : '#999'
                    }}>
                      Added {new Date(book.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {!loading && !error && booksRead.length === 0 && (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  You haven't read any books yet.
                </p>
              )}
            </div>
          </div>
          
          {/* To Read Section */}
          <div>
            <h2 style={{ 
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: theme === 'dark' ? '#fff' : '#333',
              borderBottom: `2px solid ${theme === 'dark' ? '#444' : '#eee'}`,
              paddingBottom: '10px'
            }}>
              To Read
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {loading ? (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  Loading your books...
                </p>
              ) : error ? (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  {error}
                </p>
              ) : booksToRead.map(book => (
                <div 
                  key={book.id}
                  style={{
                    display: 'flex',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '90px',
                    flexShrink: 0
                  }}>
                    {book.thumbnail ? (
                      <img 
                        src={book.thumbnail} 
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <BookPlaceholder width={60} height={90} />
                    )}
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: theme === 'dark' ? '#fff' : '#333'
                    }}>
                      {book.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#ccc' : '#666',
                      marginBottom: '5px'
                    }}>
                      {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                    </p>
                    
                    <p style={{ 
                      fontSize: '12px',
                      color: theme === 'dark' ? '#aaa' : '#999'
                    }}>
                      Added {new Date(book.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {!loading && !error && booksToRead.length === 0 && (
                <p style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  Your to-read list is empty.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
