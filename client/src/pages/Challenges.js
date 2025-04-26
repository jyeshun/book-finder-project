import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Challenges = () => {
  const { theme } = useTheme();
  
  // Mock challenges data
  const [challenges] = useState([
    {
      id: 1,
      title: 'Read 50 Books in 2025',
      description: 'Challenge yourself to read 50 books by the end of the year.',
      progress: 12,
      total: 50,
      deadline: 'December 31, 2025',
      joined: true
    },
    {
      id: 2,
      title: 'Diverse Authors Challenge',
      description: 'Read books by authors from 10 different countries or cultural backgrounds.',
      progress: 3,
      total: 10,
      deadline: 'December 31, 2025',
      joined: true
    },
    {
      id: 3,
      title: 'Genre Explorer',
      description: 'Read at least one book from each of these genres: Fantasy, Mystery, Science Fiction, Historical Fiction, Romance, and Non-Fiction.',
      progress: 2,
      total: 6,
      deadline: 'December 31, 2025',
      joined: true
    },
    {
      id: 4,
      title: 'Classics Challenge',
      description: 'Read 5 classic novels published before 1950.',
      progress: 0,
      total: 5,
      deadline: 'December 31, 2025',
      joined: false
    },
    {
      id: 5,
      title: 'Summer Reading Sprint',
      description: 'Read 10 books during the summer months (June, July, August).',
      progress: 0,
      total: 10,
      deadline: 'August 31, 2025',
      joined: false
    }
  ]);
  
  // State for showing join confirmation
  const [joinedChallenges, setJoinedChallenges] = useState(
    challenges.filter(challenge => challenge.joined).map(challenge => challenge.id)
  );
  
  // Handle joining a challenge
  const handleJoinChallenge = (challengeId) => {
    if (joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(joinedChallenges.filter(id => id !== challengeId));
    } else {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = (progress, total) => {
    return (progress / total) * 100;
  };
  
  return (
    <div className="container">
      <main style={{ padding: '30px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: theme === 'dark' ? '#fff' : '#333'
        }}>
          Reading Challenges
        </h1>
        
        {challenges.length > 0 ? (
          <div>
            {challenges.map(challenge => (
              <div 
                key={challenge.id}
                style={{
                  backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      color: theme === 'dark' ? '#fff' : '#333'
                    }}>
                      {challenge.title}
                    </h2>
                    
                    <p style={{
                      fontSize: '14px',
                      color: theme === 'dark' ? '#ccc' : '#666',
                      marginBottom: '15px'
                    }}>
                      {challenge.description}
                    </p>
                    
                    <p style={{
                      fontSize: '12px',
                      color: theme === 'dark' ? '#aaa' : '#888'
                    }}>
                      Deadline: {challenge.deadline}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    style={{
                      backgroundColor: joinedChallenges.includes(challenge.id) ? 
                        (theme === 'dark' ? '#444' : '#eee') : '#14919B',
                      color: joinedChallenges.includes(challenge.id) ? 
                        (theme === 'dark' ? '#ccc' : '#666') : 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {joinedChallenges.includes(challenge.id) ? 'Leave Challenge' : 'Join Challenge'}
                  </button>
                </div>
                
                {joinedChallenges.includes(challenge.id) && (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: theme === 'dark' ? '#ccc' : '#666'
                      }}>
                        Progress: {challenge.progress} of {challenge.total}
                      </span>
                      
                      <span style={{
                        fontSize: '14px',
                        color: theme === 'dark' ? '#ccc' : '#666'
                      }}>
                        {Math.round(calculateProgress(challenge.progress, challenge.total))}%
                      </span>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: theme === 'dark' ? '#444' : '#eee',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${calculateProgress(challenge.progress, challenge.total)}%`,
                        height: '100%',
                        backgroundColor: '#14919B',
                        borderRadius: '4px',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
            borderRadius: '8px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: theme === 'dark' ? '#ccc' : '#666',
              marginBottom: '20px'
            }}>
              No active reading challenges available at the moment.
            </p>
            <p style={{
              fontSize: '1rem',
              color: theme === 'dark' ? '#aaa' : '#888'
            }}>
              Check back soon for new reading challenges to help you discover new books and expand your reading horizons.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Challenges;
