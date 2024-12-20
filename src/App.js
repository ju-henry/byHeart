// App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LandingPage from './LandingPage';

function App() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [mode, setMode] = useState('landing');
  const [cardOrder, setCardOrder] = useState([]);
  const [cardsViewed, setCardsViewed] = useState(0);
  const [initialFlipState, setInitialFlipState] = useState(false);

  const flipCard = () => {
    setShowTranslation(!showTranslation);
  };

  const nextCard = useCallback(() => {
    setCardsViewed((prev) => (prev + 1) % cards.length);
    if (mode === 'regular' || mode === 'explore') {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    } else {
      const currentIndex = cardOrder.indexOf(currentCard);
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentCard(cardOrder[nextIndex]);
    }
    setShowTranslation(initialFlipState);
  }, [cards.length, mode, cardOrder, currentCard, initialFlipState]);
  
  const previousCard = useCallback(() => {
    setCardsViewed((prev) => (prev - 1 + cards.length) % cards.length);
    if (mode === 'regular' || mode === 'explore') {
      setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    } else {
      const currentIndex = cardOrder.indexOf(currentCard);
      const nextIndex = (currentIndex - 1 + cards.length) % cards.length;
      setCurrentCard(cardOrder[nextIndex]);
    }
    setShowTranslation(initialFlipState);
  }, [cards.length, mode, cardOrder, currentCard, initialFlipState]);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (mode !== 'landing') {
        if (event.key === 'ArrowLeft') {
          previousCard();
        } else if (event.key === 'ArrowRight') {
          nextCard();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, nextCard, previousCard]);

  const startExploreMode = (loadedCards) => {
    setMode('explore');
    setCurrentCard(0);
    setCardsViewed(0);
    setCards(loadedCards); 
  };

  const startRegularMode = (flipCards, loadedCards) => {
    setMode('regular');
    setCurrentCard(0);
    setCardsViewed(0);
    setShowTranslation(flipCards);
    setInitialFlipState(flipCards);
    setCards(loadedCards); 
  };

  const startRandomMode = (flipCards, loadedCards) => {
    setMode('random');
    const shuffled = [...Array(loadedCards.length).keys()].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentCard(shuffled[0]);
    setCardsViewed(0);
    setShowTranslation(flipCards);
    setInitialFlipState(flipCards);
    setCards(loadedCards);
  };

  const goLandingPage = () => {
    setMode('landing');
  };

  if (mode === 'landing') {
    return <LandingPage onExploreMode={startExploreMode} onRegularMode={startRegularMode} onRandomMode={startRandomMode} />;
  }

  return (
    <div className="App">
      <h1>Vocabulary Flashcards</h1>
      {mode === 'explore' ? (
        <>
          <div className="flashcard">
            <h2>{cards[currentCard].word}</h2>
          </div>
          <div className="flashcard">
            <h2>{cards[currentCard].translation}</h2>
          </div>
        </>
      ) : (
        <div className="flashcard" onClick={flipCard}>
          <h2>{showTranslation ? cards[currentCard].translation : cards[currentCard].word}</h2>
        </div>
      )}
      <div className="button-container">
        <button onClick={previousCard}>&lt;&lt; Previous</button>
        <button onClick={nextCard}>Next &gt;&gt;</button>
      </div>
      <div className="progress-bar">
        {cards.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === cardsViewed ? 'active' : ''}`}
          ></span>
        ))}
      </div>
      <button onClick={goLandingPage}>End</button>
    </div>
  );
}

export default App;
