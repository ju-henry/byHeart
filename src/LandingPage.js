// LandingPage.js
import React from 'react';

function LandingPage({ onRegularMode, onRandomMode }) {
  return (
    <div className="landing-page">
      <h1>Vocabulary Flashcards</h1>
      <div className="mode-buttons">
        <div className="mode-button" onClick={onRegularMode}>
          <img src="/regular-mode-icon.png" alt="Regular Mode" />
          <p>Regular Order</p>
        </div>
        <div className="mode-button" onClick={onRandomMode}>
          <img src="/random-mode-icon.png" alt="Random Mode" />
          <p>Random Order</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
