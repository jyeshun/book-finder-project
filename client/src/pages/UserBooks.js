import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import BookPlaceholder from '../components/BookPlaceholder';
import userBooksService from '../services/userBooksService';

const UserBooks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [booksRead, setBooksRead] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user's books
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user) {
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
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);
  
  if (!user) {
    return (
      <div className="container">
        <div className="loading-container" style={{ padding: '50px', textAlign: 'center' }}>
          <p>Loading your books...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <main className="user-books-container" style={{ padding: '20px' }}>
        <h1 className="greeting" style={{ 
          fontSize: '28px', 
          marginBottom: '30px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          My Books
        </h1>
        
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            margin: '30px auto',
            backgroundColor: theme === 'dark' ? '#333' : '#f8f9fa',
            borderRadius: '8px',
            maxWidth: '800px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontSize: '18px', color: theme === 'dark' ? '#ccc' : '#666' }}>
              Loading your books...
            </p>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            margin: '30px auto',
            backgroundColor: theme === 'dark' ? '#333' : '#f8f9fa',
            borderRadius: '8px',
            maxWidth: '800px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontSize: '18px', color: '#dc3545' }}>
              {error}
            </p>
          </div>
        ) : (booksRead.length === 0 && booksToRead.length === 0) ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            margin: '30px auto',
            backgroundColor: theme === 'dark' ? '#333' : '#f8f9fa',
            borderRadius: '8px',
            maxWidth: '800px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#14919B', marginBottom: '20px' }}>Your Bookshelf is Empty</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: theme === 'dark' ? '#ccc' : '#666' }}>
              Start adding books to your collection by browsing the library and clicking on "Read" or "To Read" buttons.
            </p>
            <button 
              onClick={() => navigate('/browse')}
              style={{
                backgroundColor: '#14919B',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                marginTop: '20px',
                cursor: 'pointer'
              }}
            >
              Browse Books
            </button>
          </div>
        ) : null}
        
        <div className="user-books-layout" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px'
        }}>
          <div className="left-column">
            {/* To-Read Pile */}
            <section className="book-section">
              <h2 style={{ 
                fontSize: '22px', 
                marginBottom: '15px',
                color: theme === 'dark' ? '#fff' : '#333'
              }}>
                To-Read Pile
              </h2>
              
              <div className="books-carousel" style={{
                display: 'flex',
                overflowX: 'auto',
                padding: '10px 0',
                gap: '20px'
              }}>
                {booksToRead.length === 0 ? (
                  <p style={{ 
                    padding: '20px', 
                    color: theme === 'dark' ? '#ccc' : '#666',
                    fontStyle: 'italic'
                  }}>
                    No books in your to-read list yet.
                  </p>
                ) : (
                  booksToRead.map((book) => (
                    <div 
                      key={book.id} 
                      style={{ 
                        margin: '0 10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate(`/book/${book.id}`)}
                    >
                      {book.thumbnail ? (
                        <img 
                          src={book.thumbnail} 
                          alt={book.title}
                          style={{
                            width: '150px',
                            height: '225px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      ) : (
                        <BookPlaceholder width={150} height={225} />
                      )}
                      <p style={{
                        width: '150px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginTop: '8px',
                        color: theme === 'dark' ? '#fff' : '#333',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {book.title}
                      </p>
                      <p style={{
                        width: '150px',
                        fontSize: '12px',
                        color: theme === 'dark' ? '#ccc' : '#666',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {book.authors.join(', ')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
          
          <div className="right-column">
            {/* Current Reads */}
            <section className="current-reads-section" style={{
              backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              height: 'fit-content'
            }}>
              <h2 style={{ 
                fontSize: '22px', 
                marginBottom: '15px',
                color: theme === 'dark' ? '#fff' : '#333'
              }}>
                Currently Reading
              </h2>
              
              <div className="current-reads-list" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {booksRead.length === 0 ? (
                  <p style={{ 
                    padding: '10px', 
                    color: theme === 'dark' ? '#ccc' : '#666',
                    fontStyle: 'italic'
                  }}>
                    No books in your read list yet.
                  </p>
                ) : (
                  booksRead.slice(0, 3).map((book) => (
                    <div 
                      key={book.id}
                      onClick={() => navigate(`/book/${book.id}`)}
                      style={{
                        display: 'flex',
                        gap: '15px',
                        backgroundColor: theme === 'dark' ? '#333' : '#fff',
                        borderRadius: '6px',
                        padding: '15px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '80px',
                        height: '120px',
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
                          <BookPlaceholder width={80} height={120} />
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
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
                          marginBottom: '15px'
                        }}>
                          {book.authors.join(', ')}
                        </p>
                        
                        {book.pageCount && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '10px'
                          }}>
                            <div style={{
                              flex: 1,
                              height: '8px',
                              backgroundColor: theme === 'dark' ? '#444' : '#e0e0e0',
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: '#14919B',
                                borderRadius: '4px'
                              }}></div>
                            </div>
                            <span style={{
                              fontSize: '12px',
                              color: theme === 'dark' ? '#aaa' : '#888'
                            }}>
                              {book.pageCount} pages
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {booksRead.length > 3 && (
                  <button 
                    onClick={() => navigate('/profile')}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#14919B',
                      textAlign: 'center',
                      padding: '10px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    View all {booksRead.length} books →
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserBooks;
