// components/GameTable.tsx
import React, { useState } from 'react';
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

  const [aiAdvice, setAiAdvice] = useState(''); // State to store AI advice
  const [isAILoading, setIsAILoading] = useState(false); // State to manage loading state

  // Function to trigger AI advice (to be implemented)
  const handleGetAIAdvice = () => {
    // TODO: Implement function to get AI advice
    // For now, we can mock this to show the loading behavior
    setIsAILoading(true);
    setTimeout(() => {
      setAiAdvice('Consider the possibilities of a straight or flush...'); // Placeholder text
      setIsAILoading(false);
    }, 2000); // Simulate a network request delay
  };

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
          <h1 className="text-3xl font-bold mb-4 text-center">Texas Hold&apos;em Table</h1>
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
      {/* Buttons for drawing cards, game control, and requesting AI advice */}
      <div className="text-center p-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDrawHand}>
          Draw Hand
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={onClick}>
          {label}
        </button>
        {/* AI Advice button */}
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleGetAIAdvice}
          disabled={!playerHand.length || !flop.length}>
          Get AI Advice
        </button>
      </div>
      {/* AI Advice display section */}
      <div className="text-center p-4">
        {isAILoading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-white text-black p-4 rounded">{aiAdvice || 'Click "Get AI Advice" for help!'}</div>
        )}
      </div>
    </div>
  );
};

export default GameTable;
