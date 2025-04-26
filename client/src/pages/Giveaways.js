import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Giveaways = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for tracking entered giveaways
  const [enteredGiveaways, setEnteredGiveaways] = useState([]);
  
  // Mock giveaway data
  const giveaways = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      publisher: "Penguin Books",
      thumbnail: "https://books.google.com/books/content?id=gQY_zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 5,
      endDate: "2025-05-15",
      description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived."
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      publisher: "Ballantine Books",
      thumbnail: "https://books.google.com/books/content?id=fEhAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 3,
      endDate: "2025-05-20",
      description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian."
    },
    {
      id: 3,
      title: "The Lincoln Highway",
      author: "Amor Towles",
      publisher: "Viking",
      thumbnail: "https://books.google.com/books/content?id=VnmyzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 2,
      endDate: "2025-05-25",
      description: "In June, 1954, eighteen-year-old Emmett Watson is driven home to Nebraska by the warden of the juvenile work farm where he has just served fifteen months for involuntary manslaughter."
    },
    {
      id: 4,
      title: "Cloud Cuckoo Land",
      author: "Anthony Doerr",
      publisher: "Scribner",
      thumbnail: "https://books.google.com/books/content?id=7nhDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 4,
      endDate: "2025-06-01",
      description: "From the Pulitzer Prize–winning author of All the Light We Cannot See, a triumph of imagination and compassion, a soaring novel about children on the cusp of adulthood."
    },
    {
      id: 5,
      title: "The Last Thing He Told Me",
      author: "Laura Dave",
      publisher: "Simon & Schuster",
      thumbnail: "https://books.google.com/books/content?id=oPIVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 3,
      endDate: "2025-06-10",
      description: "A gripping mystery about a woman who thinks she's found the love of her life—until he disappears."
    },
    {
      id: 6,
      title: "The Four Winds",
      author: "Kristin Hannah",
      publisher: "St. Martin's Press",
      thumbnail: "https://books.google.com/books/content?id=oPIVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 5,
      endDate: "2025-06-15",
      description: "From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression."
    }
  ];
  
  // Function to handle entering a giveaway
  const handleEnterGiveaway = (giveawayId) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (!enteredGiveaways.includes(giveawayId)) {
      setEnteredGiveaways([...enteredGiveaways, giveawayId]);
    }
  };
  
  // Function to view giveaway details
  const viewGiveawayDetails = (giveawayId) => {
    navigate(`/giveaways/${giveawayId}`);
  };
  
  // Calculate days remaining for a giveaway
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          Book Giveaways
        </h1>
        
        <p style={{
          fontSize: '16px',
          marginBottom: '30px',
          color: theme === 'dark' ? '#ccc' : '#666',
          maxWidth: '800px'
        }}>
          Enter for a chance to win free books from publishers and authors. New giveaways are added regularly!
        </p>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          {giveaways.map((giveaway) => (
            <div 
              key={giveaway.id} 
              style={{
                backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                borderRadius: '8px',
                padding: '20px',
                width: '280px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => viewGiveawayDetails(giveaway.id)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                position: 'relative',
                width: '180px',
                height: '270px',
                marginBottom: '15px'
              }}>
                <img 
                  src={giveaway.thumbnail} 
                  alt={giveaway.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '-10px',
                  backgroundColor: '#14919B',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getDaysRemaining(giveaway.endDate)} days left
                </div>
              </div>
              
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '5px',
                color: theme === 'dark' ? '#fff' : '#333',
                textAlign: 'center'
              }}>
                {giveaway.title}
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: theme === 'dark' ? '#ccc' : '#666',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                by {giveaway.author}
              </p>
              
              <p style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#aaa' : '#888',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {giveaway.copies} copies available
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterGiveaway(giveaway.id);
                }}
                style={{
                  backgroundColor: enteredGiveaways.includes(giveaway.id) ? '#888' : '#14919B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: enteredGiveaways.includes(giveaway.id) ? 'default' : 'pointer',
                  width: '100%'
                }}
                disabled={enteredGiveaways.includes(giveaway.id)}
              >
                {enteredGiveaways.includes(giveaway.id) ? 'Entered' : 'Enter Giveaway'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Giveaways;
