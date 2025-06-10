import React, { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: 1, name: 'ABC', role: 'Software Engineer', experience: '5 years', image: 'src\images\download.jpeg' },
    { id: 2, name: 'DEF', role: 'Product Manager', experience: '7 years', image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'GHI', role: 'UI/UX Designer', experience: '4 years', image: 'https://via.placeholder.com/300' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0'); 

  const handleSwipe = (direction) => {
    if (currentIndex >= cards.length) return;

    if (direction === 'right') {
      setBackgroundColor('#50C878'); 
    } else {
      setBackgroundColor("#FA5F55"); 
    }


    setAnimation(direction === 'right' ? 'swipe-right' : 'swipe-left');

    setTimeout(() => {
      setAnimation('');
      setBackgroundColor('#f0f0f0');
      if (direction === 'right') {
        alert(`You accepted ${cards[currentIndex].name}`);
      } else {
        alert(`You rejected ${cards[currentIndex].name}`);
      }
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            id={`card-${index}`}
            className={`card ${index === currentIndex ? animation : ''}`}
            style={{
              zIndex: cards.length - index,
              display: index === currentIndex ? 'block' : 'none',
            }}
          >
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
            <p>{card.role}</p>
            <p>Experience: {card.experience}</p>
          </div>
        ))}
        {currentIndex >= cards.length && <p>No more cards to show.</p>}
      </div>
      <div className="buttons">
        <button onClick={() => handleSwipe('left')}>❌ Reject</button>
        <button onClick={() => handleSwipe('right')}>✔️ Accept</button>
      </div>
    </div>
  );
}

export default App;