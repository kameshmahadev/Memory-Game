// script.js

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const restartButton = document.getElementById('restart-button');

  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let cards = [...cardValues, ...cardValues];
  let flippedCards = [];
  let matchedCards = [];

  // Shuffle cards
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Create card elements
  const createCards = () => {
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach((value) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.value = value;
      card.innerText = value; // Hidden by default (color: transparent in CSS)
      gameBoard.appendChild(card);
    });
  };

  // Flip card logic
  const flipCard = (card) => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  };

  // Check for matching cards
  const checkMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
      flippedCards = [];

      if (matchedCards.length === cards.length) {
        setTimeout(() => alert('Congratulations! You found all the pairs!'), 300);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  };

  // Restart the game
  const restartGame = () => {
    flippedCards = [];
    matchedCards = [];
    createCards();
  };

  // Event listeners
  gameBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('card')) {
      flipCard(e.target);
    }
  });

  restartButton.addEventListener('click', restartGame);

  // Initialize game
  createCards();
});
