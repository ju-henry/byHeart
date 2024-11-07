// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: 1, word: 'Bonjour', translation: 'Hello' },
    { id: 2, word: 'Merci', translation: 'Thank you' },
    { id: 3, word: 'Au revoir', translation: 'Goodbye' },
  ]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const flipCard = () => {
    setShowTranslation(!showTranslation);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
    setShowTranslation(false);
  };

  return (
    <div className="App">
      <h1>Vocabulary Flashcards</h1>
      <div className="flashcard" onClick={flipCard}>
        <h2>{showTranslation ? cards[currentCard].translation : cards[currentCard].word}</h2>
      </div>
      <button onClick={nextCard}>Next Card</button>
      <div className="progress-bar">
        {cards.map((card, index) => (
          <span 
            key={card.id} 
            className={`dot ${index === currentCard ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default App;
