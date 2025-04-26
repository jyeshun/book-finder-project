import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import Browse from './pages/Browse';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserBooks from './pages/UserBooks';
import ManageAccount from './pages/ManageAccount';
import Stats from './pages/Stats';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Giveaways from './pages/Giveaways';
import GiveawayDetail from './pages/GiveawayDetail';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Preferences from './pages/Preferences';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';

function App() {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Set the theme attribute on the document element
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Force re-render of Header when theme changes
    const header = document.querySelector('header');
    if (header && location.pathname !== '/') {
      header.style.display = 'flex';
    }
  }, [theme, location.pathname]);

  return (
    <div className="app">
      {/* Only exclude Header from Home page */}
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/my-books" element={<UserBooks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/community" element={<Community />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/giveaways/:id" element={<GiveawayDetail />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
      <ThemeToggle />
    </div>
  );
}

export default App;
