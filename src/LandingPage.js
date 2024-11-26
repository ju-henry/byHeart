// LandingPage.js
import React, { useState, useEffect } from 'react';

function LandingPage({ onExploreMode, onRegularMode, onRandomMode }) {
  const [flipCards, setFlipCards] = useState(() => {
    const saved = localStorage.getItem('flipCards');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [selectedList, setSelectedList] = useState(() => {
    const savedList = localStorage.getItem('selectedList');
    return savedList ? savedList : 'vocab1'; 
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    localStorage.setItem('flipCards', JSON.stringify(flipCards));
    localStorage.setItem('selectedList', selectedList);
    loadCards(selectedList); 
  }, [flipCards, selectedList]);

  const loadCards = (listName) => {
    fetch(`/${listName}.csv`) 
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').map(row => row.split(','));
        const loadedCards = rows
          .filter(row => row.length === 2 && row[0].trim() !== '' && row[1].trim() !== '') 
          .map((row, index) => ({
            id: index + 1,
            word: row[0].trim(),
            translation: row[1].trim(),
          }));
        setCards(loadedCards);
      })
      .catch(error => console.error('Error loading CSV file:', error));
  };

  const handleExploreMode = () => onExploreMode(cards);
  const handleRegularMode = () => onRegularMode(flipCards, cards);
  const handleRandomMode = () => onRandomMode(flipCards, cards);

  return (
    <div className="landing-page">
      <h1>Vocabulary Flashcards</h1>
      
      <div className="flags">
        <img src="flag_germany.png" alt="German Flag" className="flag" />
        <img src="flag_france.png" alt="French Flag" className="flag" />
      </div>

      <h1>German & French</h1>

      <div className="vocabulary-select">
        <label htmlFor="vocabulary-list">Choose a vocabulary list: </label>
        <select 
          id="vocabulary-list" 
          value={selectedList} 
          onChange={(e) => setSelectedList(e.target.value)}
        >
          <option value="vocab1">Vocabulaire 1</option>
          <option value="vocab2">Vocabulaire 2</option>
        </select>
      </div>

      <div className="mode-buttons">
        <div className="mode-button" onClick={handleExploreMode}>
          <img src="/explore_cards.png" alt="Explore Mode" style={{ width: '60%', height: 'auto' }} />
          <p>Explore vocabulary</p>
        </div>
      </div>

      <div className="mode-buttons">
        <div className="mode-button" onClick={handleRegularMode}>
          <img src="/cards.png" alt="Regular Mode" style={{ width: '100%', height: 'auto' }} />
          <p>Learn in <br />Regular Order</p>
        </div>
        <div className="mode-button" onClick={handleRandomMode}>
          <img src="/shuffled_cards.png" alt="Random Mode" style={{ width: '100%', height: 'auto' }} />
          <p>Learn in <br />Random Order</p>
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
