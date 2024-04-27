// components/GameTable.tsx
import React from 'react';
import { useGame } from '../contexts/GameContext';
import Card from './Card';

const GameTable: React.FC = () => {
  const {
    playerHand,
    flop,
    turn,
    river,
    handleDrawHand,
    handleDrawFlop,
    handleDrawTurn,
    handleDrawRiver,
    handleResetGame
  } = useGame();

  // Function to determine the label and action of the button based on the game state
  const getActionButton = () => {
    if (river.length > 0) {
      return { label: 'Play New Hand', onClick: handleResetGame };
    } else if (turn.length > 0) {
      return { label: 'Draw River', onClick: handleDrawRiver };
    } else if (flop.length > 0) {
      return { label: 'Draw Turn', onClick: handleDrawTurn };
    } else {
      return { label: 'Draw Flop', onClick: handleDrawFlop };
    }
  };

  const { label, onClick } = getActionButton();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
      <div className="relative bg-green-700 text-white p-10 rounded-3xl shadow-lg w-full max-w-6xl mx-auto my-10" style={{ height: '40vw', maxHeight: '500px' }}>
          <h1 className="text-3xl font-bold mb-4 text-center">Texas Hold'em Table</h1>
          {/* Community cards positioned in the center */}
          <div className="absolute inset-0 flex justify-center items-center">
            {flop.concat(turn).concat(river).map((card, index) => (
              <Card key={index} card={card} className="mx-1" />
            ))}
          </div>
          {/* Player hand displayed towards the bottom of the table */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
            {playerHand.map((card, index) => (
              <Card key={index} card={card} className="mx-1" />
            ))}
          </div>
        </div>
      </div>
      {/* Buttons for drawing cards and game control */}
      <div className="text-center p-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDrawHand}>
          Draw Hand
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={onClick}>
          {label}
        </button>
      </div>
    </div>
  );
};

export default GameTable;