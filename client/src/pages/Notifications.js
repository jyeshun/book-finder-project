import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'book_recommendation',
      icon: '📚',
      title: 'New Book Recommendation',
      message: 'Based on your reading history, you might enjoy "Project Hail Mary" by Andy Weir.',
      time: '2 hours ago',
      read: false,
      actionUrl: '/giveaways/2'
    },
    {
      id: 2,
      type: 'friend_activity',
      icon: '👤',
      title: 'Sarah started reading a new book',
      message: 'Sarah added "The Midnight Library" to her reading list.',
      time: 'Yesterday',
      read: false,
      actionUrl: '/giveaways/1'
    },
    {
      id: 3,
      type: 'challenge',
      icon: '🏆',
      title: 'Reading Challenge Update',
      message: 'You\'re 60% through your monthly reading challenge! Keep it up!',
      time: '2 days ago',
      read: true,
      actionUrl: null
    },
    {
      id: 4,
      type: 'giveaway',
      icon: '🎁',
      title: 'New Giveaway Available',
      message: 'Enter for a chance to win "The Four Winds" by Kristin Hannah.',
      time: '3 days ago',
      read: true,
      actionUrl: '/giveaways/6'
    },
    {
      id: 5,
      type: 'system',
      icon: '🔔',
      title: 'Welcome to StoryGraph',
      message: 'Thanks for joining! Start by adding books to your reading list.',
      time: '1 week ago',
      read: true,
      actionUrl: null
    }
  ]);
  
  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Handle notification click
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#333'
          }}>
            Notifications {unreadCount > 0 && (
              <span style={{
                fontSize: '16px',
                backgroundColor: '#14919B',
                color: 'white',
                borderRadius: '20px',
                padding: '2px 10px',
                marginLeft: '10px'
              }}>
                {unreadCount} new
              </span>
            )}
          </h1>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#14919B',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Mark all as read
            </button>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {notifications.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <p style={{ 
                fontSize: '18px', 
                color: theme === 'dark' ? '#ccc' : '#666' 
              }}>
                You have no notifications
              </p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  display: 'flex',
                  gap: '15px',
                  padding: '15px',
                  backgroundColor: notification.read 
                    ? (theme === 'dark' ? '#333' : '#f9f9f9') 
                    : (theme === 'dark' ? '#2a3b47' : '#f0f7fa'),
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderLeft: notification.read 
                    ? 'none' 
                    : '4px solid #14919B',
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#444' : '#eee',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px'
                }}>
                  {notification.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}>
                    {notification.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '14px',
                    color: theme === 'dark' ? '#ccc' : '#666',
                    margin: 0
                  }}>
                    {notification.message}
                  </p>
                </div>
                
                <div style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#aaa' : '#999',
                  whiteSpace: 'nowrap'
                }}>
                  {notification.time}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
