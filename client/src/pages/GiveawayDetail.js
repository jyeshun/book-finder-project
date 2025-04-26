import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const GiveawayDetail = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [entered, setEntered] = useState(false);
  const [giveaway, setGiveaway] = useState(null);
  
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
      description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.",
      entryCount: 127,
      format: "Hardcover",
      pages: 304,
      publishDate: "2020-09-29",
      genres: ["Fiction", "Fantasy", "Contemporary"]
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      publisher: "Ballantine Books",
      thumbnail: "https://books.google.com/books/content?id=fEhAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 3,
      endDate: "2025-05-20",
      description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian. Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
      entryCount: 98,
      format: "Hardcover",
      pages: 496,
      publishDate: "2021-05-04",
      genres: ["Science Fiction", "Adventure", "Space"]
    },
    {
      id: 3,
      title: "The Lincoln Highway",
      author: "Amor Towles",
      publisher: "Viking",
      thumbnail: "https://books.google.com/books/content?id=VnmyzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 2,
      endDate: "2025-05-25",
      description: "In June, 1954, eighteen-year-old Emmett Watson is driven home to Nebraska by the warden of the juvenile work farm where he has just served fifteen months for involuntary manslaughter. His mother long gone, his father recently deceased, and the family farm foreclosed upon by the bank, Emmett's intention is to pick up his eight-year-old brother, Billy, and head to California where they can start their lives anew.",
      entryCount: 76,
      format: "Hardcover",
      pages: 592,
      publishDate: "2021-10-05",
      genres: ["Historical Fiction", "Literary Fiction", "Adventure"]
    },
    {
      id: 4,
      title: "Cloud Cuckoo Land",
      author: "Anthony Doerr",
      publisher: "Scribner",
      thumbnail: "https://books.google.com/books/content?id=7nhDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 4,
      endDate: "2025-06-01",
      description: "From the Pulitzer Prize–winning author of All the Light We Cannot See, a triumph of imagination and compassion, a soaring novel about children on the cusp of adulthood in a broken world, who find resilience, hope, and story. The heroes of Cloud Cuckoo Land are trying to figure out the world around them: Anna and Omeir, on opposite sides of the formidable city walls during the 1453 siege of Constantinople; teenage idealist Seymour in an attack on a public library in present day Idaho; and Konstance, on an interstellar ship bound for an exoplanet, decades from now.",
      entryCount: 112,
      format: "Hardcover",
      pages: 640,
      publishDate: "2021-09-28",
      genres: ["Literary Fiction", "Historical Fiction", "Science Fiction"]
    },
    {
      id: 5,
      title: "The Last Thing He Told Me",
      author: "Laura Dave",
      publisher: "Simon & Schuster",
      thumbnail: "https://books.google.com/books/content?id=oPIVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 3,
      endDate: "2025-06-10",
      description: "A gripping mystery about a woman who thinks she's found the love of her life—until he disappears. Before Owen Michaels disappears, he smuggles a note to his beloved wife of one year: Protect her. Despite her confusion and fear, Hannah Hall knows exactly to whom the note refers—Owen's sixteen-year-old daughter, Bailey. Bailey, who lost her mother tragically as a child. Bailey, who wants absolutely nothing to do with her new stepmother.",
      entryCount: 89,
      format: "Hardcover",
      pages: 320,
      publishDate: "2021-05-04",
      genres: ["Mystery", "Thriller", "Suspense"]
    },
    {
      id: 6,
      title: "The Four Winds",
      author: "Kristin Hannah",
      publisher: "St. Martin's Press",
      thumbnail: "https://books.google.com/books/content?id=oPIVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      copies: 5,
      endDate: "2025-06-15",
      description: "From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression, a time when the country was in crisis and at war with itself, when millions were out of work and even the land seemed to have turned against them. Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all.",
      entryCount: 143,
      format: "Hardcover",
      pages: 464,
      publishDate: "2021-02-02",
      genres: ["Historical Fiction", "Literary Fiction", "Family Saga"]
    }
  ];
  
  // Find the giveaway based on the ID from the URL
  useEffect(() => {
    const giveawayId = parseInt(id);
    const foundGiveaway = giveaways.find(g => g.id === giveawayId);
    
    if (foundGiveaway) {
      setGiveaway(foundGiveaway);
    } else {
      // Redirect to giveaways page if giveaway not found
      navigate('/giveaways');
    }
  }, [id, navigate]);
  
  // Function to handle entering a giveaway
  const handleEnterGiveaway = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    setEntered(true);
  };
  
  // Calculate days remaining for a giveaway
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  if (!giveaway) {
    return (
      <div className="container">
        <main style={{ padding: '30px' }}>
          <p style={{ textAlign: 'center', color: theme === 'dark' ? '#ccc' : '#666' }}>
            Loading giveaway details...
          </p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <Link 
          to="/giveaways"
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            color: '#14919B',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          ← Back to Giveaways
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '30px',
          marginTop: '20px',
          backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '200px',
            height: '300px',
            flexShrink: 0,
            position: 'relative'
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
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
              {giveaway.title}
            </h1>
            
            <p style={{
              fontSize: '16px',
              marginBottom: '5px',
              color: theme === 'dark' ? '#ccc' : '#666'
            }}>
              by {giveaway.author}
            </p>
            
            <p style={{
              fontSize: '14px',
              marginBottom: '20px',
              color: theme === 'dark' ? '#aaa' : '#888'
            }}>
              Published by {giveaway.publisher} • {giveaway.publishDate}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              {giveaway.genres.map((genre, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: theme === 'dark' ? '#444' : '#eee',
                    color: theme === 'dark' ? '#ccc' : '#666',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              marginBottom: '20px',
              color: theme === 'dark' ? '#ccc' : '#666'
            }}>
              {giveaway.description}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '25px',
              flexWrap: 'wrap'
            }}>
              <div>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#888',
                  marginBottom: '5px'
                }}>
                  Format
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}>
                  {giveaway.format}
                </p>
              </div>
              
              <div>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#888',
                  marginBottom: '5px'
                }}>
                  Pages
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}>
                  {giveaway.pages}
                </p>
              </div>
              
              <div>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#888',
                  marginBottom: '5px'
                }}>
                  Copies Available
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}>
                  {giveaway.copies}
                </p>
              </div>
              
              <div>
                <p style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#aaa' : '#888',
                  marginBottom: '5px'
                }}>
                  Entries
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}>
                  {entered ? giveaway.entryCount + 1 : giveaway.entryCount}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleEnterGiveaway}
              disabled={entered}
              style={{
                backgroundColor: entered ? '#888' : '#14919B',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: entered ? 'default' : 'pointer',
                marginTop: '10px'
              }}
            >
              {entered ? 'Entered' : 'Enter Giveaway'}
            </button>
            
            {entered && (
              <p style={{
                fontSize: '14px',
                marginTop: '10px',
                color: '#14919B'
              }}>
                You've successfully entered this giveaway! Winners will be notified by email.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GiveawayDetail;
