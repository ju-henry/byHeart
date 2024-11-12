// LandingPage.js
import React, { useState, useEffect } from 'react';

function LandingPage({ onRegularMode, onRandomMode }) {
  const [flipCards, setFlipCards] = useState(() => {
    // Initialize state from localStorage, or false if not present
    const saved = localStorage.getItem('flipCards');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Save to localStorage whenever flipCards changes
    localStorage.setItem('flipCards', JSON.stringify(flipCards));
  }, [flipCards]);

  const handleRegularMode = () => onRegularMode(flipCards);
  const handleRandomMode = () => onRandomMode(flipCards);

  return (
    <div className="landing-page">
      <h1>Vocabulary Flashcards</h1>
      <div className="mode-buttons">
        <div className="mode-button" onClick={handleRegularMode}>
          <img src="/cards.png" alt="Regular Mode" style={{ width: '100%', height: 'auto' }} />
          <p>Regular Order</p>
        </div>
        <div className="mode-button" onClick={handleRandomMode}>
          <img src="/shuffled_cards.png" alt="Random Mode" style={{ width: '100%', height: 'auto' }} />
          <p>Random Order</p>
        </div>
      </div>
      <div className="flip-option">
        <label>
          <input
            type="checkbox"
            checked={flipCards}
            onChange={(e) => setFlipCards(e.target.checked)}
          />
          Flip cards?
        </label>
      </div>
    </div>
  );
}

export default LandingPage;
