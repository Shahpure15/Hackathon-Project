import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // Add parsed data to candidates list
      setCandidates((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: data.name || 'Unknown',
          role: data.jobTitle || 'Not specified',
          experience: data.experience || 'Not specified',
          image: 'https://via.placeholder.com/300', // Default image
        },
      ]);
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction, name) => {
    if (direction === 'left') {
      alert(`You rejected ${name}`);
    } else if (direction === 'right') {
      alert(`You accepted ${name}`);
    }
  };

  return (
    <div className="app">
      <div className="upload-section">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          disabled={loading}
        />
        {loading && <p>Parsing resume...</p>}
      </div>
      <div className="card-container">
        {candidates.map((candidate) => (
          <TinderCard
            key={candidate.id}
            onSwipe={(dir) => handleSwipe(dir, candidate.name)}
            preventSwipe={['up', 'down']}
          >
            <div className="card">
              <img src={candidate.image} alt={candidate.name} />
              <h3>{candidate.name}</h3>
              <p>{candidate.role}</p>
              <p>Experience: {candidate.experience}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default App;