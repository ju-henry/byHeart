// App.js
import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';

function App() {
  const [cards, setCards] = useState([
    { id: 1, word: 'Bonjour', translation: 'Hello' },
    { id: 2, word: 'Merci', translation: 'Thank you' },
    { id: 3, word: 'Au revoir', translation: 'Goodbye' },
  ]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [mode, setMode] = useState('landing'); // 'landing', 'regular', or 'random'
  const [cardOrder, setCardOrder] = useState([]);
  const [cardsViewed, setCardsViewed] = useState(0);

  const flipCard = () => {
    setShowTranslation(!showTranslation);
  };

  const nextCard = () => {
    setCardsViewed((prev) => (prev + 1) % cards.length);
    if (mode === 'regular') {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    } else {
      const currentIndex = cardOrder.indexOf(currentCard);
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentCard(cardOrder[nextIndex]);
    }
    setShowTranslation(false);
  };

  const startRegularMode = () => {
    setMode('regular');
    setCurrentCard(0);
    setCardsViewed(0);
  };

  const startRandomMode = () => {
    setMode('random');
    const shuffled = [...Array(cards.length).keys()].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentCard(shuffled[0]);
    setCardsViewed(0);
  };

  if (mode === 'landing') {
    return <LandingPage onRegularMode={startRegularMode} onRandomMode={startRandomMode} />;
  }

  return (
    <div className="App">
      <h1>Vocabulary Flashcards</h1>
      <div className="flashcard" onClick={flipCard}>
        <h2>{showTranslation ? cards[currentCard].translation : cards[currentCard].word}</h2>
      </div>
      <button onClick={nextCard}>Next Card</button>
      <div className="progress-bar">
        {cards.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === cardsViewed ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default App;
