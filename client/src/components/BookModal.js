import React from 'react';
import BookPlaceholder from './BookPlaceholder';

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button 
          className="close-button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          &times;
        </button>

        <div 
          className="modal-header"
          style={{
            padding: '20px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px'
          }}
        >
          <div 
            className="book-cover"
            style={{
              flexShrink: 0,
              width: '150px',
              height: '225px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            {book.thumbnail ? (
              <img 
                src={book.thumbnail} 
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <BookPlaceholder width={150} height={225} />
            )}
          </div>

          <div className="book-info">
            <h2 style={{ 
              margin: '0 0 10px 0', 
              color: '#333',
              fontSize: '24px'
            }}>
              {book.title}
            </h2>
            
            <p style={{ 
              margin: '0 0 15px 0', 
              color: '#666',
              fontSize: '16px'
            }}>
              by {book.authors.join(', ')}
            </p>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px',
              marginBottom: '15px'
            }}>
              {book.tags.map((tag, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: '#14919B',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    fontSize: '12px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '20px',
              fontSize: '14px',
              color: '#666',
              marginBottom: '15px'
            }}>
              {book.pageCount > 0 && (
                <div>{book.pageCount} pages</div>
              )}
              {book.publishedDate && (
                <div>Published: {book.publishedDate}</div>
              )}
              {book.publisher && (
                <div>Publisher: {book.publisher}</div>
              )}
            </div>
            
            {book.averageRating > 0 && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '5px',
                marginBottom: '15px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  color: '#f8d64e'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: '18px' }}>
                      {i < Math.round(book.averageRating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  ({book.ratingsCount} ratings)
                </span>
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => {
                  // Add to "Read" list 
                  alert('Added to Read list');
                }}
                style={{
                  backgroundColor: '#14919B',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Mark as Read
              </button>
              
              <button 
                onClick={() => {
                  // Add to "To Read" list
                  alert('Added to To Read list');
                }}
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Add to To-Read List
              </button>
              
              {book.previewLink && (
                <a 
                  href={book.previewLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Preview
                </a>
              )}
            </div>
          </div>
        </div>

        <div 
          className="modal-body"
          style={{
            padding: '20px'
          }}
        >
          <h3 style={{ 
            margin: '0 0 15px 0', 
            color: '#333',
            fontSize: '18px'
          }}>
            Description
          </h3>
          
          <div 
            style={{ 
              color: '#444',
              lineHeight: '1.6',
              fontSize: '15px'
            }}
            dangerouslySetInnerHTML={{ __html: book.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookModal;
