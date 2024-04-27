import React from 'react';
import Head from 'next/head';
import { GameProvider, useGame } from '../contexts/GameContext';
import Card from '../components/Card';

const GameTable: React.FC = () => {
  // useGame must be used within a child component of GameProvider
  const { playerHand, flop, handleDrawHand, handleDrawFlop } = useGame();

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
            <h2 className="font-semibold">Flop</h2>
            {flop.map((card, index) => (
              <Card key={index} card={card} />
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
