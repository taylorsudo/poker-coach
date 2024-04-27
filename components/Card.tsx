import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const cardColor = card.suit === '♦' || card.suit === '♥' ? 'text-red-500' : 'text-black';

  return (
    <p className={`bg-white p-2 rounded mt-2 ${cardColor}`}>{card.rank}{card.suit}</p>
  );
};

export default Card;
