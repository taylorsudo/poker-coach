// components/Card.tsx
import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const isRedCard = card.suit === '♥' || card.suit === '♦';
  const cardClassName = `bg-white p-2 rounded mt-2 ${isRedCard ? 'text-red-500' : 'text-black'}`;
  
  return (
    <p className={cardClassName}>{card.rank}{card.suit}</p>
  );
}

export default Card;
