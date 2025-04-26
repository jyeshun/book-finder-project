require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB 
connectDB();

//mock user
const mockUser = {
  _id: '123456789',
  name: 'Test User',
  email: 'test@example.com'
};

// Enable CORS for React app
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware with MongoDB store for persistence
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET || 'storygraph_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    ttl: 14 * 24 * 60 * 60, // = 14 days
    autoRemove: 'native'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// API Routes
// Gets current user
app.get('/api/auth/current-user', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.json(null);
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;
    
    // Check if passwords match
    if (password !== password_confirmation) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });
    
    await newUser.save();
    
    // Store user in session
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    };
    
    res.status(201).json({ 
      message: 'User created successfully',
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Store user in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    res.json({ 
      message: 'Signed in successfully',
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign out
app.post('/api/auth/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to sign out' });
    }
    res.json({ message: 'Signed out successfully' });
  });
});

// Update user account information
app.put('/api/auth/update-account', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to update your account' });
    }
    
    const userId = req.session.user.id;
    const { name, email, currentPassword, newPassword } = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update name and email if provided
    if (name) user.name = name;
    if (email) user.email = email;
    
    // If changing password, verify current password first
    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Set new password (will be hashed by pre-save hook)
      user.password = newPassword;
    }
    
    await user.save();
    
    // Update session with new user info
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    res.json({ 
      message: 'Account updated successfully',
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile image
app.put('/api/auth/update-profile-image', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to update your profile image' });
    }
    
    const userId = req.session.user.id;
    const { profileImage } = req.body;
    
    // Validate profile image URL
    if (!profileImage) {
      return res.status(400).json({ message: 'Profile image URL is required' });
    }
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update profile image
    user.profileImage = profileImage;
    await user.save();
    
    // Update session with new user info
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    };
    
    res.json({ 
      message: 'Profile image updated successfully',
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book management routes
// Add book to "To Read" list
app.post('/api/books/to-read', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to add books' });
    }
    
    const userId = req.session.user.id;
    const bookData = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if book already exists in the to-read list
    const bookExists = user.booksToRead.some(book => book.id === bookData.id);
    if (bookExists) {
      return res.status(400).json({ message: 'Book already in your To Read list' });
    }
    
    // Add book to to-read list
    user.booksToRead.push(bookData);
    await user.save();
    
    res.status(201).json({ 
      message: 'Book added to To Read list',
      book: bookData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add book to "Read" list
app.post('/api/books/read', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to add books' });
    }
    
    const userId = req.session.user.id;
    const bookData = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if book already exists in the read list
    const bookExists = user.booksRead.some(book => book.id === bookData.id);
    if (bookExists) {
      return res.status(400).json({ message: 'Book already in your Read list' });
    }
    
    // Remove from to-read list if it exists there
    const toReadIndex = user.booksToRead.findIndex(book => book.id === bookData.id);
    if (toReadIndex !== -1) {
      user.booksToRead.splice(toReadIndex, 1);
    }
    
    // Add book to read list
    user.booksRead.push(bookData);
    
    // Update reading stats
    user.readingStats.totalBooksRead += 1;
    
    // Update pages read if available
    if (bookData.pageCount) {
      user.readingStats.totalPagesRead += bookData.pageCount;
    }
    
    // Update favorite genres
    if (bookData.tags && bookData.tags.length > 0) {
      // Add new tags to favorite genres
      bookData.tags.forEach(tag => {
        if (!user.readingStats.favoriteGenres.includes(tag)) {
          user.readingStats.favoriteGenres.push(tag);
        }
      });
      
      // Limit to top 5 genres
      if (user.readingStats.favoriteGenres.length > 5) {
        user.readingStats.favoriteGenres = user.readingStats.favoriteGenres.slice(0, 5);
      }
    }
    
    await user.save();
    
    res.status(201).json({ 
      message: 'Book added to Read list',
      book: bookData,
      stats: user.readingStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove book from "To Read" list
app.delete('/api/books/to-read/:bookId', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to remove books' });
    }
    
    const userId = req.session.user.id;
    const bookId = req.params.bookId;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove book from to-read list
    user.booksToRead = user.booksToRead.filter(book => book.id !== bookId);
    await user.save();
    
    res.json({ 
      message: 'Book removed from To Read list',
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove book from "Read" list
app.delete('/api/books/read/:bookId', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to remove books' });
    }
    
    const userId = req.session.user.id;
    const bookId = req.params.bookId;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find the book to get its page count
    const bookToRemove = user.booksRead.find(book => book.id === bookId);
    
    // Remove book from read list
    user.booksRead = user.booksRead.filter(book => book.id !== bookId);
    
    // Update reading stats if book was found
    if (bookToRemove) {
      user.readingStats.totalBooksRead = Math.max(0, user.readingStats.totalBooksRead - 1);
      
      // Update pages read if available
      if (bookToRemove.pageCount) {
        user.readingStats.totalPagesRead = Math.max(0, user.readingStats.totalPagesRead - bookToRemove.pageCount);
      }
    }
    
    await user.save();
    
    res.json({ 
      message: 'Book removed from Read list',
      success: true,
      stats: user.readingStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's books
app.get('/api/books/user', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: 'You must be logged in to view your books' });
    }
    
    const userId = req.session.user.id;
    
    // Find the user and select only the book lists and stats
    const user = await User.findById(userId).select('booksRead booksToRead readingStats');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      booksRead: user.booksRead,
      booksToRead: user.booksToRead,
      readingStats: user.readingStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Always serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Starts server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
