// contexts/GameContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { createDeck, drawCards } from '../lib/utils/cardUtils';
import { Card } from '../types';

interface GameContextType {
  deck: Card[];
  playerHand: Card[];
  flop: Card[];
  handleDrawHand: () => void;
  handleDrawFlop: () => void;
}

const defaultState: GameContextType = {
  deck: createDeck(),
  playerHand: [],
  flop: [],
  handleDrawHand: () => {},
  handleDrawFlop: () => {}
};

const GameContext = createContext<GameContextType>(defaultState);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export const GameProvider: React.FC = ({ children }) => {
  const [deck, setDeck] = useState<Card[]>(createDeck());
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [flop, setFlop] = useState<Card[]>([]);

  const handleDrawHand = () => {
    const { drawnCards, newDeck } = drawCards(deck, 2);
    setDeck(newDeck);
    setPlayerHand(drawnCards);
    setFlop([]);
  };

  const handleDrawFlop = () => {
    const { drawnCards, newDeck } = drawCards(deck, 3);
    setDeck(newDeck);
    setFlop(drawnCards);
  };

  return (
    <GameContext.Provider value={{ deck, playerHand, flop, handleDrawHand, handleDrawFlop }}>
      {children}
    </GameContext.Provider>
  );
};
