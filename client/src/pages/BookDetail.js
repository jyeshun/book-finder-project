import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import booksService from '../services/booksService';
import userBooksService from '../services/userBooksService';
import BookPlaceholder from '../components/BookPlaceholder';

const BookDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const bookData = await booksService.getBookById(id);
        setBook(bookData);
        setError(null);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [id]);
  
  const handleAddToReadList = async () => {
    if (!user) {
      setMessage('You must be logged in to add books');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    try {
      setIsLoading(true);
      await userBooksService.addToReadList(book);
      setMessage('Added to "To Read" list');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message || 'Failed to add book');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToReadBooks = async () => {
    if (!user) {
      setMessage('You must be logged in to add books');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    try {
      setIsLoading(true);
      await userBooksService.addToReadBooks(book);
      setMessage('Added to "Read" list');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message || 'Failed to add book');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTagClick = (tag) => {
    navigate(`/browse?tag=${encodeURIComponent(tag)}`);
  };
  
  if (loading) {
    return (
      <div className="container">
        <main style={{ padding: '30px', textAlign: 'center' }}>
          <p>Loading book details...</p>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container">
        <main style={{ padding: '30px', textAlign: 'center' }}>
          <p style={{ color: '#dc3545' }}>{error}</p>
          <Link to="/browse" style={{ color: '#14919B', textDecoration: 'none' }}>
            ← Back to Browse
          </Link>
        </main>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container">
        <main style={{ padding: '30px', textAlign: 'center' }}>
          <p>Book not found</p>
          <Link to="/browse" style={{ color: '#14919B', textDecoration: 'none' }}>
            ← Back to Browse
          </Link>
        </main>
      </div>
    );
  }
  
  return (
    <div className="container">
      <main style={{ 
        padding: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Link 
          to="/browse"
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            color: '#14919B',
            textDecoration: 'none',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          ← Back to Browse
        </Link>
        
        {/* Book Cover */}
        <div style={{
          flex: '0 0 300px',
        }}>
          {book.thumbnail ? (
            <img 
              src={book.thumbnail} 
              alt={book.title}
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            />
          ) : (
            <BookPlaceholder width={300} height={450} />
          )}
        </div>
        
        {/* Book Details */}
        <div style={{
          flex: '1 1 400px',
        }}>
          <h1 style={{
            fontSize: '24px',
            marginBottom: '10px',
            color: theme === 'dark' ? '#fff' : '#333'
          }}>
            {book.title}
          </h1>
          
          <p style={{
            fontSize: '18px',
            marginBottom: '5px',
            color: theme === 'dark' ? '#ccc' : '#666'
          }}>
            {book.authors.join(', ')}
          </p>
          
          <p style={{
            fontSize: '14px',
            marginBottom: '15px',
            color: theme === 'dark' ? '#aaa' : '#888'
          }}>
            {book.pageCount ? `${book.pageCount} pages` : 'Unknown length'} • 
            <a 
              href={book.previewLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: theme === 'dark' ? '#aaa' : '#888',
                textDecoration: 'none',
                marginLeft: '5px'
              }}
            >
              {book.publishedDate ? `first pub ${book.publishedDate.split('-')[0]}` : 'publication date unknown'}
            </a> 
            (<a 
              href={book.previewLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: theme === 'dark' ? '#aaa' : '#888',
                textDecoration: 'none'
              }}
            >
              view preview
            </a>)
          </p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px'
          }}>
            {book.tags.map((tag, index) => (
              <span 
                key={index}
                onClick={() => handleTagClick(tag)}
                style={{
                  backgroundColor: '#14919B',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <section style={{
            padding: '20px',
            backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
            maxWidth: '650px'
          }}>
            <h2 style={{
              fontSize: '20px',
              marginBottom: '10px',
              borderBottom: '2px solid #14919B',
              paddingBottom: '5px',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
              Book Description
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: theme === 'dark' ? '#ccc' : '#666'
            }}>
              {book.description || 'No description available.'}
            </p>
          </section>
        </div>
        
        {/* Book Sidebar */}
        <aside style={{
          flex: '0 0 250px',
          padding: '20px',
          backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
          borderRadius: '8px',
          alignSelf: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: '100%',
                  backgroundColor: '#14919B',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                to read <span>▼</span>
              </button>
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: '#14919B',
                  border: '1px solid',
                  borderRadius: '4px',
                  width: '100%',
                  zIndex: '10'
                }}>
                  <button 
                    onClick={() => {
                      handleAddToReadBooks();
                      setShowDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      textAlign: 'left',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    read
                  </button>
                  <button 
                    onClick={() => {
                      handleAddToReadList();
                      setShowDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      textAlign: 'left',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    to read
                  </button>
                  <button 
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      textAlign: 'left',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    currently reading
                  </button>
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button 
                style={{
                  flex: '1',
                  color: 'white',
                  backgroundColor: 'grey',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                mark as owned
              </button>
              
              <a 
                href={book.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  flex: '1',
                  color: 'white',
                  backgroundColor: 'grey',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                buy
              </a>
            </div>
            
            {message && (
              <div style={{
                padding: '10px',
                backgroundColor: message.includes('Failed') ? '#f8d7da' : '#d4edda',
                color: message.includes('Failed') ? '#721c24' : '#155724',
                borderRadius: '4px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
          </div>
          
          <ul style={{
            listStyle: 'none',
            padding: '0',
            marginBottom: '20px'
          }}>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href={`/browse?tag=${encodeURIComponent(book.tags[0] || 'fiction')}`}
                style={{
                  color: '#14919B',
                  textDecoration: 'none'
                }}
              >
                Browse similar books...
              </a>
            </li>
          </ul>
          
          <h3 style={{
            fontSize: '16px',
            marginBottom: '10px',
            color: theme === 'dark' ? '#fff' : '#333'
          }}>
            Book Information
          </h3>
          
          <ul style={{
            listStyle: 'none',
            padding: '0'
          }}>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href={book.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#14919B',
                  textDecoration: 'none'
                }}
              >
                View on Google Books...
              </a>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default BookDetail;
