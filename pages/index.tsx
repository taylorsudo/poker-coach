import React from 'react';
import Head from 'next/head';
import { GameProvider, useGame } from '../contexts/GameContext';
import Card from '../components/Card';

const GameTable: React.FC = () => {
  const { playerHand, flop, turn, river, handleDrawHand, handleDrawFlop, handleDrawTurn, handleDrawRiver, handleResetGame } = useGame();

  // Determine what the button should do and say based on the game state
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
    <>
      <div className="bg-green-700 text-white p-10 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Texas Hold'em Table</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded shadow">
            <h2 className="font-semibold">Player Hand</h2>
            {playerHand.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
          <div className="p-4 border border-gray-300 rounded shadow">
            <h2 className="font-semibold">Community</h2>
            {flop.concat(turn).concat(river).map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDrawHand}>
            Draw Hand
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={onClick}>
            {label}
          </button>
        </div>
      </div>
    </>
  );
};

const HomePage: React.FC = () => {
  return (
    <GameProvider>
      <div className="flex justify-center items-center min-h-screen bg-green-900">
        <Head>
          <title>Texas Hold'em Game</title>
          <meta name="description" content="Interactive Texas Hold'em Game built with Next.js and Tailwind CSS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GameTable />
      </div>
    </GameProvider>
  );
};

export default HomePage;
