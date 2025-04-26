import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookPlaceholder from '../components/BookPlaceholder';
import Book from '../components/Book';
import booksService from '../services/booksService';

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get('tag');
  const query = queryParams.get('q');
  
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let result;
        
        if (tag) {
          result = await booksService.getBooksByTag(tag);
        } else if (query) {
          result = await booksService.searchBooks(query);
        } else {
          // Default search for popular books with a more diverse selection
          // Randomly choose one of several popular book categories
          const popularCategories = [
            'bestseller fiction',
            'popular science',
            'bestseller fantasy',
            'bestseller mystery',
            'bestseller romance',
            'bestseller biography',
            'award winning books'
          ];
          const randomCategory = popularCategories[Math.floor(Math.random() * popularCategories.length)];
          result = await booksService.searchBooks(randomCategory);
        }
        
        setBooks(result.books);
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [tag, query]);
  
  // Get page title based on tag or search
  const getPageTitle = () => {
    if (tag) {
      return (
        <h1 className="browse-title" style={{ fontSize: '24px' }}>
          Explore more <em>"{tag}"</em> books below!
        </h1>
      );
    } else if (query) {
      return (
        <h1 className="browse-title" style={{ fontSize: '24px' }}>
          Search results for <em>"{query}"</em>
        </h1>
      );
    } else {
      return <h1 className="browse-title" style={{ fontSize: '24px' }}>Explore Books</h1>;
    }
  };
  
  const handleTagClick = (tag) => {
    navigate(`/browse?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="container">
      <main className="browse-container">
        {getPageTitle()}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <p>Loading books...</p>
            <div className="books-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              {Array.from({ length: 8 }).map((_, index) => (
                <BookPlaceholder key={index} />
              ))}
            </div>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            margin: '30px auto',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '8px',
            maxWidth: '800px'
          }}>
            <p>{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            margin: '30px auto',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            maxWidth: '800px'
          }}>
            <p>No books found. Try a different search term.</p>
          </div>
        ) : (
          <div className="books-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '20px',
            marginTop: '30px',
            justifyItems: 'center'
          }}>
            {books.map((book) => (
              <Book 
                key={book.id} 
                book={book} 
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
