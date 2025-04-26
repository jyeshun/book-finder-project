import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  const { theme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const tagDropdownRef = useRef(null);
  
  // Common book genres/tags
  const bookTags = [
    'Fiction',
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Science',
    'Poetry',
    'Young Adult',
    'Children',
    'Horror',
    'Classics'
  ];
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signout();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const toggleTagDropdown = () => {
    setTagDropdownOpen(!tagDropdownOpen);
  };
  
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setTagDropdownOpen(false);
    navigate(`/browse?tag=${encodeURIComponent(tag)}`);
  };
  
  // Close tag dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation link style
  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? '#14919B' : 'var(--text-color)',
    fontSize: '18px',
    fontWeight: 'bold',
    position: 'relative',
    padding: '5px 0',
  });

  // Underline style for navigation links
  const navLinkAfterStyle = (path) => ({
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-5px',
    width: isActive(path) ? '100%' : '0',
    height: '4px',
    backgroundColor: '#14919B',
    transition: 'width 0.3s'
  });

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 50px',
      backgroundColor: theme === 'dark' ? 'var(--background-color)' : 'white',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
      gap: '40px',
      color: theme === 'dark' ? 'white' : '#393939',
      width: '100%',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/browse" style={{ textDecoration: 'none' }}>
          <Logo 
            size="small" 
            showText={false}
          />
        </Link>
      </div>
      
      {/* Navigation Tabs */}
      <nav>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: '50px',
          padding: 0,
          margin: 0
        }}>
          <li>
            <Link 
              to="/browse" 
              style={navLinkStyle('/browse')}
              onMouseOver={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after) after.style.width = '100%';
              }}
              onMouseOut={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after && !isActive('/browse')) after.style.width = '0';
              }}
            >
              Explore
              <div 
                className="link-after" 
                style={navLinkAfterStyle('/browse')}
              ></div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/stats" 
              style={navLinkStyle('/stats')}
              onMouseOver={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after) after.style.width = '100%';
              }}
              onMouseOut={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after && !isActive('/stats')) after.style.width = '0';
              }}
            >
              Stats
              <div 
                className="link-after" 
                style={navLinkAfterStyle('/stats')}
              ></div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/challenges" 
              style={navLinkStyle('/challenges')}
              onMouseOver={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after) after.style.width = '100%';
              }}
              onMouseOut={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after && !isActive('/challenges')) after.style.width = '0';
              }}
            >
              Challenges
              <div 
                className="link-after" 
                style={navLinkAfterStyle('/challenges')}
              ></div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/community" 
              style={navLinkStyle('/community')}
              onMouseOver={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after) after.style.width = '100%';
              }}
              onMouseOut={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after && !isActive('/community')) after.style.width = '0';
              }}
            >
              Community
              <div 
                className="link-after" 
                style={navLinkAfterStyle('/community')}
              ></div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/giveaways" 
              style={navLinkStyle('/giveaways')}
              onMouseOver={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after) after.style.width = '100%';
              }}
              onMouseOut={(e) => {
                const after = e.currentTarget.querySelector('.link-after');
                if (after && !isActive('/giveaways')) after.style.width = '0';
              }}
            >
              Giveaways
              <div 
                className="link-after" 
                style={navLinkAfterStyle('/giveaways')}
              ></div>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {location.pathname.startsWith('/browse') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Tag Filter Dropdown */}
            <div ref={tagDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={toggleTagDropdown}
                style={{
                  padding: '8px 12px',
                  fontSize: '16px',
                  backgroundColor: theme === 'dark' ? '#333' : 'white',
                  color: theme === 'dark' ? 'white' : 'black',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minWidth: '150px'
                }}
              >
                {selectedTag || 'Filter by Genre'}
                <span style={{ marginLeft: '8px' }}>▼</span>
              </button>
              
              {tagDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 10,
                  backgroundColor: theme === 'dark' ? '#333' : 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  width: '200px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {/* Clear filter option */}
                  <div
                    onClick={() => {
                      setSelectedTag('');
                      setTagDropdownOpen(false);
                      navigate('/browse');
                    }}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      color: theme === 'dark' ? 'white' : 'black',
                      backgroundColor: theme === 'dark' ? '#444' : '#f8f8f8'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#555' : '#f0f0f0';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f8f8f8';
                    }}
                  >
                    All Genres
                  </div>
                  
                  {/* Tag options */}
                  {bookTags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        color: theme === 'dark' ? 'white' : 'black'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Search Bar */}
            <form 
              style={{ display: 'flex', alignItems: 'center' }}
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/browse?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }}
            >
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search all books..." 
                style={{
                  padding: '8px 12px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '250px',
                  backgroundColor: theme === 'dark' ? '#333' : 'white',
                  color: theme === 'dark' ? 'white' : 'black'
                }}
              />
            </form>
          </div>
        )}
        
        {user ? (
          <div style={{ position: 'relative' }}>
            <div 
              onClick={toggleDropdown}
              style={{
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <img 
                src="/assets/profileimage.png" 
                alt="Profile" 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              />
              
              {dropdownOpen && (
                <div style={{
                  display: 'block',
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  backgroundColor: theme === 'dark' ? '#333' : 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '10px',
                  zIndex: 10,
                  minWidth: '150px'
                }}>
                  <Link 
                    to="/profile" 
                    style={{
                      textDecoration: 'none',
                      color: theme === 'dark' ? 'white' : '#393939',
                      fontSize: '16px',
                      display: 'block',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      e.currentTarget.style.color = '#14919b';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939';
                    }}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/notifications" 
                    style={{
                      textDecoration: 'none',
                      color: theme === 'dark' ? 'white' : '#393939',
                      fontSize: '16px',
                      display: 'block',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      e.currentTarget.style.color = '#14919b';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939';
                    }}
                  >
                    Notifications
                  </Link>
                  <Link 
                    to="/manage-account" 
                    style={{
                      textDecoration: 'none',
                      color: theme === 'dark' ? 'white' : '#393939',
                      fontSize: '16px',
                      display: 'block',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      e.currentTarget.style.color = '#14919b';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939';
                    }}
                  >
                    Manage Account
                  </Link>
                  <Link 
                    to="/preferences" 
                    style={{
                      textDecoration: 'none',
                      color: theme === 'dark' ? 'white' : '#393939',
                      fontSize: '16px',
                      display: 'block',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      e.currentTarget.style.color = '#14919b';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939';
                    }}
                  >
                    Preferences
                  </Link>
                  <a 
                    href="/" 
                    onClick={handleSignOut}
                    style={{
                      textDecoration: 'none',
                      color: theme === 'dark' ? 'white' : '#393939',
                      fontSize: '16px',
                      display: 'block',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444' : '#f0f0f0';
                      e.currentTarget.style.color = '#14919b';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939';
                    }}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link 
            to="/signin" 
            style={{
              color: theme === 'dark' ? 'white' : '#393939',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '5px 0'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#14919B'}
            onMouseOut={(e) => e.currentTarget.style.color = theme === 'dark' ? 'white' : '#393939'}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
