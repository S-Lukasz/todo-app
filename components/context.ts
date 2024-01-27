import { createContext } from "react";
import { ICard } from "./card";
import { ICardItem } from "./cardItem";

export interface MainContext {
  cards: ICard[];
  moveCardItem: (
    currentCardIndex: number,
    cardToAddIndex: number,
    cardItemToMove: ICardItem
  ) => void;
  addItemToCard: (cardIndex: number, newName: string, newDesc: string) => void;
  removeItemFromCard: (cardIndex: number, index: number) => void;
  saveCardsToStorage: (cards: ICard[]) => void;
  loadCardsFromStorage: () => void;
}

export const Context = createContext<MainContext>({
  cards: [],
  moveCardItem: () => {},
  addItemToCard: () => {},
  removeItemFromCard: () => {},
  saveCardsToStorage: () => {},
  loadCardsFromStorage: () => {},
});
