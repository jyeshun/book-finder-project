const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BookSchema = new mongoose.Schema({
  id: String,
  title: String,
  authors: [String],
  description: String,
  publishedDate: String,
  pageCount: Number,
  tags: [String],
  thumbnail: String,
  language: String,
  previewLink: String,
  averageRating: Number,
  ratingsCount: Number,
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  profileImage: {
    type: String,
    default: '/assets/profileimage.PNG'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  booksRead: [BookSchema],
  booksToRead: [BookSchema],
  readingStats: {
    totalBooksRead: {
      type: Number,
      default: 0
    },
    totalPagesRead: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    readingTime: {
      type: Number,
      default: 0
    },
    favoriteGenres: {
      type: [String],
      default: []
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    }
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
