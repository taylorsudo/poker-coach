import React, { createContext, useContext, useState } from 'react';
import { createDeck, drawCards } from '../lib/utils/cardUtils';
import { Card } from '../types';

interface GameContextType {
  deck: Card[];
  playerHand: Card[];
  flop: Card[];
  turn: Card[];
  river: Card[];
  handleDrawHand: () => void;
  handleDrawFlop: () => void;
  handleDrawTurn: () => void;
  handleDrawRiver: () => void;
  handleResetGame: () => void;
}

const defaultState: GameContextType = {
  deck: createDeck(),
  playerHand: [],
  flop: [],
  turn: [],
  river: [],
  handleDrawHand: () => {},
  handleDrawFlop: () => {},
  handleDrawTurn: () => {},
  handleDrawRiver: () => {},
  handleResetGame: () => {}
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
  const [turn, setTurn] = useState<Card[]>([]);
  const [river, setRiver] = useState<Card[]>([]);

  const handleDrawHand = () => {
    const { drawnCards, newDeck } = drawCards(deck, 2);
    setDeck(newDeck);
    setPlayerHand(drawnCards);
    setFlop([]);
    setTurn([]);
    setRiver([]);
  };

  const handleDrawFlop = () => {
    const { drawnCards, newDeck } = drawCards(deck, 3);
    setDeck(newDeck);
    setFlop(drawnCards);
  };

  const handleDrawTurn = () => {
    const { drawnCards, newDeck } = drawCards(deck, 1);
    setDeck(newDeck);
    setTurn(drawnCards);
  };

  const handleDrawRiver = () => {
    const { drawnCards, newDeck } = drawCards(deck, 1);
    setDeck(newDeck);
    setRiver(drawnCards);
  };

  const handleResetGame = () => {
    setDeck(createDeck());
    setPlayerHand([]);
    setFlop([]);
    setTurn([]);
    setRiver([]);
  };

  return (
    <GameContext.Provider value={{ deck, playerHand, flop, turn, river, handleDrawHand, handleDrawFlop, handleDrawTurn, handleDrawRiver, handleResetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
