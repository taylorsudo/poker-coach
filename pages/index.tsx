import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [flop, setFlop] = useState([]);

  // Function to create a new deck of cards
  function createDeck() {
    const suits = ['♦', '♣', '♥', '♠'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const newDeck = [];
    suits.forEach(suit => {
      ranks.forEach(rank => {
        newDeck.push(`${rank}${suit}`);
      });
    });
    return newDeck;
  }

  // Function to draw cards from the deck
  function drawCards(numberOfCards) {
    const drawnCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const cardIndex = Math.floor(Math.random() * deck.length);
      drawnCards.push(deck[cardIndex]);
      deck.splice(cardIndex, 1); // This removes the card from the deck
    }
    return drawnCards;
  }

  // Function to handle drawing the player's hand
  function handleDrawHand() {
    setPlayerHand(drawCards(2));
    setFlop([]); // Reset the flop when new hand is drawn
  }

  // Function to handle drawing the flop
  function handleDrawFlop() {
    setFlop(drawCards(3));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900">
      <Head>
        <title>Texas Hold'em Game</title>
        <meta name="description" content="Interactive Texas Hold'em Game built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-green-700 text-white p-10 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Texas Hold'em Table</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded shadow">
            <h2 className="font-semibold">Player Hand</h2>
            {playerHand.map((card, index) => (
              <p key={index} className="bg-white text-black p-2 rounded mt-2">{card}</p>
            ))}
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h2 className="font-semibold">Flop</h2>
            {flop.map((card, index) => (
              <p key={index} className="bg-white text-black p-2 rounded mt-2">{card}</p>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDrawHand}>
            Draw Hand
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 disabled:opacity-50" onClick={handleDrawFlop} disabled={!playerHand.length}>
            Draw Flop
          </button>
        </div>
      </div>
    </div>
  );
}
