const BASE_URL = 'https://www.googleapis.com/books/v1';

// Handle API errors
const handleError = (error) => {
  console.error('API Error:', error);
  throw new Error('Failed to fetch books. Please try again later.');
};

// Process book data from Google Books API
const processBookData = (item) => {
  const { id, volumeInfo } = item;
  
  // Extract categories/tags
  const tags = volumeInfo.categories || [];
  
  // Fix thumbnail URL to use HTTPS instead of HTTP
  let thumbnailUrl = volumeInfo.imageLinks?.thumbnail || '';
  if (thumbnailUrl && thumbnailUrl.startsWith('http:')) {
    thumbnailUrl = thumbnailUrl.replace('http:', 'https:');
  }
  
  return {
    id,
    title: volumeInfo.title,
    authors: volumeInfo.authors || ['Unknown Author'],
    description: volumeInfo.description || 'No description available',
    publishedDate: volumeInfo.publishedDate,
    pageCount: volumeInfo.pageCount,
    tags,
    thumbnail: thumbnailUrl,
    language: volumeInfo.language,
    previewLink: volumeInfo.previewLink,
    averageRating: volumeInfo.averageRating,
    ratingsCount: volumeInfo.ratingsCount
  };
};

// Helper function to build URL with query parameters
const buildUrl = (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.toString();
};

// Books service methods
const booksService = {
  // Search books
  searchBooks: async (query, maxResults = 20) => {
    try {
      console.log('Searching books with query:', query);
      
      const params = {
        q: query,
        maxResults: maxResults,
        printType: 'books'
      };
      
      const url = buildUrl('/volumes', params);
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response has items:', !!data.items);
      
      if (data.items) {
        console.log('Number of items:', data.items.length);
      }
      
      return {
        totalItems: data.totalItems || 0,
        books: data.items ? data.items.map(processBookData) : []
      };
    } catch (error) {
      console.error('Search books error:', error);
      handleError(error);
    }
  },
  
  // Get book by ID
  getBookById: async (id) => {
    try {
      const url = buildUrl(`/volumes/${id}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return processBookData(data);
    } catch (error) {
      console.error('Get book by ID error:', error);
      handleError(error);
    }
  },
  
  // Get books by tag/category
  getBooksByTag: async (tag, maxResults = 20) => {
    try {
      console.log('Searching books by tag:', tag);
      
      const params = {
        q: `subject:${tag}`,
        maxResults: maxResults,
        printType: 'books'
      };
      
      const url = buildUrl('/volumes', params);
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response has items:', !!data.items);
      
      if (data.items) {
        console.log('Number of items:', data.items.length);
      }
      
      return {
        totalItems: data.totalItems || 0,
        books: data.items ? data.items.map(processBookData) : []
      };
    } catch (error) {
      console.error('Get books by tag error:', error);
      handleError(error);
    }
  }
};

export default booksService;
