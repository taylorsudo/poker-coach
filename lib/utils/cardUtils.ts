// lib/utils/cardUtils.ts
import { Card } from '../../types';

export const suits = ['♦', '♣', '♥', '♠'];
export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck(): Card[] {
  const newDeck: Card[] = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      newDeck.push({ rank, suit });
    });
  });
  return newDeck;
}

export function drawCards(deck: Card[], numberOfCards: number): { drawnCards: Card[]; newDeck: Card[] } {
  const drawnCards: Card[] = [];
  const newDeck = [...deck];
  for (let i = 0; i < numberOfCards; i++) {
    const cardIndex = Math.floor(Math.random() * newDeck.length);
    drawnCards.push(newDeck[cardIndex]);
    newDeck.splice(cardIndex, 1);
  }
  return { drawnCards, newDeck };
}
