# The StoryGraph

The StoryGraph is a web application that helps users discover, track, and share their reading experiences. It provides a platform for book enthusiasts to explore new books, join reading challenges, participate in giveaways, and connect with a community of readers. Because life's too short for a book you're not in the mood for.

## Features

- **Book Discovery**: Search and browse books from various genres and authors
- **User Profiles**: Create and customize your reading profile
- **Reading Challenges**: Join challenges to expand your reading horizons
- **Book Giveaways**: Enter giveaways for a chance to win free books
- **Community**: Share reviews and connect with other readers
- **Reading Stats**: Track your reading progress and statistics
- **Dark/Light Mode**: Toggle between dark and light themes

## Technologies Used

- **Frontend**: React, React Router, CSS-in-JS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **External APIs**: Google Books API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Extract the zip file to your desired location.

2. Install dependencies:
   ```
   npm install
   ```
   
   This will install both server and client dependencies.

3. The project comes with pre-configured environment variables:
   - `.env` file in the root directory for MongoDB connection and session secret
   - `client/.env` file for React app configuration
   
   The default configuration uses a MongoDB Atlas database that will persist user data.

### Running the Application

1. Start both the server and client concurrently:
   ```
   npm run dev-full
   ```

   Or, if you prefer to run them separately:

   Start the server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

   In a separate terminal, start the client:
   ```
   cd client
   npm start
   ```
   or using the npm script from the root directory:
   ```
   npm run client
   ```

2. Open your browser and navigate to `http://localhost:3000`

**IMPORTANT:** Both the server and client must be running simultaneously for the application to work properly. If you see a "No response from server. Make sure the server is running and try again" error, it means the backend server is not running. Always ensure you have both the server (on port 3001) and the client (on port 3000) running at the same time.

### Features Added

- User authentication (signup and signin)
- Book discovery and browsing
- Add books to "To Read" list
- Mark books as "Read"
- Track reading statistics
- Dark/Light mode toggle

## Project Structure

- `/client`: React frontend application
  - `/public`: Static files
  - `/src`: Source code
    - `/components`: Reusable UI components
    - `/contexts`: React context providers
    - `/pages`: Page components
    - `/services`: API service functions
- `/config`: Server configuration
- `/models`: Database models
- `/routes`: API routes
- `/public`: Static files served by the server
- `/views`: Server-side templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
