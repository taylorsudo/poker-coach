// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import { GameProvider } from '../contexts/GameContext';
import GameTable from '../components/GameTable';

const HomePage: React.FC = () => {
  return (
    <GameProvider>
      <div className="flex justify-center items-center min-h-screen bg-green-900">
        <Head>
          <title>Texas Hold&apos;em Game</title>
          <meta name="description" content="Interactive Texas Hold&apos;em Game built with Next.js and Tailwind CSS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GameTable />
      </div>
    </GameProvider>
  );
};

export default HomePage;
