import React from 'react';

const BookPlaceholder = ({ width = 128, height = 192 }) => {
  return (
    <div 
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#666',
        fontSize: '14px',
        textAlign: 'center',
        padding: '10px'
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
      <div>Book Cover</div>
      <div>Not Available</div>
    </div>
  );
};

export default BookPlaceholder;
