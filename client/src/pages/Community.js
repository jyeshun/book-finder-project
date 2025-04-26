import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import BookPlaceholder from '../components/BookPlaceholder';

// Review component
const Review = ({ review, onLike }) => {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(review.liked);
  
  const handleLike = () => {
    setLiked(!liked);
    onLike(review.id, !liked);
  };
  
  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: theme === 'dark' ? '#555' : '#ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '10px',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontWeight: 'bold'
        }}>
          {review.username.charAt(0).toUpperCase()}
        </div>
        
        <div>
          <div style={{
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#333',
            fontSize: '16px'
          }}>
            {review.username}
          </div>
          
          <div style={{
            color: theme === 'dark' ? '#aaa' : '#888',
            fontSize: '12px'
          }}>
            {review.timestamp}
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '100px',
          height: '150px',
          flexShrink: 0
        }}>
          {review.book.thumbnail ? (
            <img 
              src={review.book.thumbnail} 
              alt={review.book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
          ) : (
            <BookPlaceholder width={100} height={150} />
          )}
        </div>
        
        <div>
          <Link 
            to={`/browse?tag=${encodeURIComponent(review.book.title)}`}
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#fff' : '#333',
              marginBottom: '5px',
              textDecoration: 'none'
            }}
          >
            {review.book.title}
          </Link>
          
          <div style={{
            fontSize: '14px',
            color: theme === 'dark' ? '#ccc' : '#666',
            marginBottom: '10px'
          }}>
            by {review.book.author}
          </div>
          
          <div style={{
            display: 'flex',
            marginBottom: '10px'
          }}>
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                style={{ 
                  color: i < review.rating ? '#f8d64e' : '#ddd', 
                  fontSize: '16px'
                }}
              >
                ★
              </span>
            ))}
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '10px'
          }}>
            {review.tags.map((tag, index) => (
              <Link 
                key={index}
                to={`/browse?tag=${encodeURIComponent(tag)}`}
                style={{
                  backgroundColor: '#14919B',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  textDecoration: 'none'
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: theme === 'dark' ? '#ccc' : '#444',
        marginBottom: '20px'
      }}>
        {review.content}
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <button
          onClick={handleLike}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: liked ? '#e74c3c' : (theme === 'dark' ? '#aaa' : '#888'),
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#eee';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ fontSize: '18px' }}>
            {liked ? '❤️' : '♡'}
          </span>
          <span>
            {review.likes + (liked && !review.liked ? 1 : 0) - (!liked && review.liked ? 1 : 0)}
          </span>
        </button>
      </div>
    </div>
  );
};

const Community = () => {
  const { theme } = useTheme();
  
  // Mock data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: 'hejones57',
      timestamp: 'less than a minute ago',
      book: {
        title: 'The True Love Experiment',
        author: 'Christina Lauren',
        thumbnail: 'https://books.google.com/books/content?id=eDuREAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
      },
      rating: 5,
      tags: ['fiction', 'contemporary', 'romance'],
      content: 'This book was absolutely delightful! The characters were so well-developed and the romance was both sweet and steamy. I couldn\'t put it down and finished it in one sitting. Highly recommend for anyone who loves a good contemporary romance with depth and heart.',
      likes: 12,
      liked: false
    },
    {
      id: 2,
      username: 'autumnmlong',
      timestamp: 'less than a minute ago',
      book: {
        title: 'Out of the Woods',
        author: 'Hannah Bonam-Young',
        thumbnail: 'https://books.google.com/books/content?id=eDuREAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
      },
      rating: 4,
      tags: ['fiction', 'contemporary', 'romance', 'emotional', 'funny', 'hopeful', 'medium-paced'],
      content: 'I just finished reading this book and I\'m still processing all the emotions it made me feel. The story follows two characters who find themselves in an unexpected situation that forces them to confront their past and their feelings. The writing is beautiful and the character development is outstanding. There were moments that made me laugh out loud and others that brought tears to my eyes. A perfect balance of humor and emotional depth.',
      likes: 8,
      liked: false
    },
    {
      id: 3,
      username: 'bookworm42',
      timestamp: '2 hours ago',
      book: {
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        thumbnail: 'https://books.google.com/books/content?id=2eDHDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
      },
      rating: 5,
      tags: ['fiction', 'historical fiction', 'lgbt'],
      content: 'This book completely blew me away. Evelyn Hugo is one of the most complex, fascinating characters I\'ve ever encountered in fiction. The story spans decades and explores themes of ambition, identity, love, and sacrifice in such a nuanced way. Taylor Jenkins Reid\'s writing is captivating from start to finish. The twist at the end left me speechless. This is definitely going on my list of all-time favorites.',
      likes: 24,
      liked: true
    }
  ]);
  
  const handleLike = (reviewId, liked) => {
    // In a real app, this would make an API call
    console.log(`Review ${reviewId} ${liked ? 'liked' : 'unliked'}`);
  };
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          Community
        </h1>
        
        {reviews.length > 0 ? (
          <div>
            {reviews.map(review => (
              <Review 
                key={review.id} 
                review={review} 
                onLike={handleLike} 
              />
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
            borderRadius: '8px',
            padding: '30px',
            textAlign: 'center',
            marginTop: '30px'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: theme === 'dark' ? '#ccc' : '#666',
              marginBottom: '20px'
            }}>
              There are no community posts currently available.
            </p>
            <p style={{
              fontSize: '1rem',
              color: theme === 'dark' ? '#aaa' : '#888'
            }}>
              Join the conversation by sharing your thoughts on books, connecting with other readers, and participating in book discussions.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
