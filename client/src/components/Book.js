import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookPlaceholder from './BookPlaceholder';
import { useAuth } from '../contexts/AuthContext';
import userBooksService from '../services/userBooksService';

const Book = ({ book, onTagClick, onBookClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDescription, setShowDescription] = useState(false); // New state
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  const handleTagClick = (tag, e) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const navigate = useNavigate();

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      // Navigate to book detail page
      navigate(`/book/${book.id}`);
    }
  };

  const handleMoreInfoClick = (e) => {
    e.stopPropagation();
    setShowDescription(true); // Show description view
  };

  return (
    <div 
      className="book-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleBookClick}
      style={{
        width: '150px',
        height: '225px',
        perspective: '1000px',
        WebkitPerspective: '1000px',
        MozPerspective: '1000px',
        margin: '15px',
        cursor: 'pointer',
        position: 'relative' // For centering the description
      }}
    >
      {/* Conditional rendering for description */}
      {showDescription ? (
        <div 
          className={`description-container ${showDescription ? 'fade-in' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align content to the top
            alignItems: 'center',
            backgroundColor: 'white',
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '20px',
            paddingTop: '22px', // Add consistent spacing from the top
            overflowY: 'auto',
          }}
        >
          {/* Back Arrow Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowDescription(false); // Hide description view
            }}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#333'
            }}
          >
            ←
          </button>

          {/* Book Description */}
          <h2 style={{ marginBottom: '10px', fontSize: '10px' }}></h2>
          <p style={{ fontSize: '10px', color: '#666', textAlign: 'left' }}>
            {book.description || 'No description available.'}
          </p>
        </div>
      ) : (
        <div 
          className={`book-flipper ${isFlipped ? 'flipped' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s, opacity 0.5s',
            WebkitTransition: '-webkit-transform 0.6s, opacity 0.5s',
            MozTransition: '-moz-transform 0.6s, opacity 0.5s',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            MozTransformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            MozTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: showDescription ? 0 : 1,
          }}
        >
          {/* Front side - Book cover */}
          <div 
            className="book-front"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              MozBackfaceVisibility: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {book.thumbnail ? (
              <img 
                src={book.thumbnail} 
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <BookPlaceholder width={150} height={225} />
            )}
          </div>

          {/* Back side - Book details */}
          <div 
            className="book-back"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              MozBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              WebkitTransform: 'rotateY(180deg)',
              MozTransform: 'rotateY(180deg)',
              backgroundColor: 'white',
              padding: '10px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <h3 style={{ 
              margin: '0 0 5px 0', 
              fontSize: '14px', 
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {book.title}
            </h3>
            
            <p style={{ 
              margin: '0 0 10px 0', 
              fontSize: '12px',
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical'
            }}>
              {book.authors.join(', ')}
            </p>
            
            <div style={{ 
              flex: 1,
              overflow: 'auto',
              marginBottom: '10px'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '5px',
                marginBottom: '10px',
                alignItems: 'center'
              }}>
                {book.tags.slice(0, 5).map((tag, index) => (
                  <span 
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onTagClick) {
                        onTagClick(tag); 
                      } else {
                        console.warn('onTagClick is not defined'); 
                      }
                    }}
                    style={{
                      backgroundColor: '#14919B',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0d6e75'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14919B'}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              marginTop: 'auto'
            }}>
              <button 
                onClick={handleMoreInfoClick} // Updated handler
                style={{
                  backgroundColor: '#888',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  flex: '1'
                }}
              >
                Description
              </button>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '5px'
              }}>
                <button 
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (user) {
                      try {
                        setIsLoading(true);
                        setMessage('');
                        // Add to "Read" list functionality
                        await userBooksService.addToReadBooks(book);
                        setMessage('Added to reading list');
                        setTimeout(() => setMessage(''), 3000);
                      } catch (error) {
                        setMessage(error.message || 'Failed to add book');
                      } finally {
                        setIsLoading(false);
                      }
                    } else {
                      setMessage('Sign in to use this feature');
                    }
                  }}
                  disabled={isLoading}
                  style={{
                    backgroundColor: '#14919B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: isLoading ? 'default' : 'pointer',
                    flex: '1',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? '...' : 'Read'}
                </button>
                <button 
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (user) {
                      try {
                        setIsLoading(true);
                        setMessage('');
                        // Add to "To Read" list functionality
                        await userBooksService.addToReadList(book);
                        setMessage('Added to reading list');
                        setTimeout(() => setMessage(''), 3000);
                      } catch (error) {
                        setMessage(error.message || 'Failed to add book');
                      } finally {
                        setIsLoading(false);
                      }
                    } else {
                      setMessage('Sign in to use this feature');
                    }
                  }}
                  disabled={isLoading}
                  style={{
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: isLoading ? 'default' : 'pointer',
                    flex: '1',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? '...' : 'To Read'}
                </button>
              </div>
              {message && (
                <div style={{
                  marginTop: '5px',
                  fontSize: '11px',
                  color: message.includes('already') ? '#e74c3c' : '#2ecc71', // Red for error, green for success
                  textAlign: 'center'
                }}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
