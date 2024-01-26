"use client";

import Card, { ICard } from "@/components/card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  FormEvent,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICardItem } from "@/components/cardItem";

const CARDS: ICard[] = [
  {
    index: 0,
    name: "ToDo",
    items: [] as ICardItem[],
  },
  {
    index: 1,
    name: "In Progress",
    items: [] as ICardItem[],
  },
  {
    index: 2,
    name: "Done",
    items: [] as ICardItem[],
  },
];

interface Prop {
  onAddNewCard: (name: string) => void;
  cards: ICard[];
}

function AddCardDialog({ onAddNewCard, cards }: Prop) {
  console.log("cards: " + cards.length);

  const [cardName, setCardName] = useState<string>(
    "New Card (" + (cards.length + 1) + ")"
  );

  const onNameChange = (e?: FormEvent<HTMLInputElement>) => {
    console.log("cards, onNameChange: " + cards.length);

    if (!e) {
      setCardName("New Card (" + (cards.length + 1) + ")");
      return;
    }

    const target = e?.target as HTMLInputElement;
    const nameToSet =
      target?.value === ""
        ? "New Card (" + (cards.length + 1) + ")"
        : target?.value;

    setCardName(nameToSet);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-zinc-50 rounded-md hover:bg-zinc-700"
          variant="outline"
        >
          <FontAwesomeIcon className=" w-6 h-6" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-600">
        <DialogHeader>
          <DialogTitle className="text-zinc-300">Add card</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Set your card data here. Click add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              onInput={(e) => onNameChange(e)}
              defaultValue=""
              className="col-span-3 bg-zinc-950 border-zinc-600"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={() => {
                onNameChange();
                onAddNewCard(cardName);
              }}
              className="bg-zinc-800 hover:bg-zinc-900 border border-zinc-600"
              type="submit"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface MainContext {
  addItemToCard: (card: ICard, newDesc: string) => void;
  removeItemFromCard: (card: ICard, index: number) => void;
}

export const Context = createContext<MainContext>({
  addItemToCard: () => {},
  removeItemFromCard: () => {},
});

export default function Home() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    setCards(CARDS);
  }, []);

  function addItemToCard(card: ICard, newDesc: string) {
    const newItem: ICardItem = {
      currentCard: card,
      index: card.items.length,
      desc: newDesc,
    };

    const cardsWithAddedItem = { ...card, items: [...card.items, newItem] };
    const cardsCopy = [...cards];
    const foundIndex = cardsCopy.findIndex(
      (cardCopy) => card.index === cardCopy.index
    );
    cardsCopy.splice(foundIndex, 1, cardsWithAddedItem);

    setCards(cardsCopy);
  }

  const [cardItemsRemove, setCardItemsRemove] = useState<ICardItem[]>([]);
  function removeItemFromCard(card: ICard, itemIndex: number) {
    console.log("removeItemFromCard 1: " + card.items.length);
    setCardItemsRemove(card.items);

    console.log("removeItemFromCard 2: " + cardItemsRemove.length);

    setCardItemsRemove((cardItemsRemove) =>
      cardItemsRemove.filter((cardItem) => cardItem.index !== itemIndex)
    );

    console.log("removeItemFromCard 3: " + cardItemsRemove.length);

    const cardWithRemovedItem = { ...card, items: cardItemsRemove };

    console.log("removeItemFromCard 4: " + cardWithRemovedItem.items.length);

    const cardsCopy = [...cards];
    const foundIndex = cardsCopy.findIndex(
      (cardCopy) => card.index === cardCopy.index
    );

    cardsCopy.splice(foundIndex, 1, cardWithRemovedItem);
    setCards(cardsCopy);
  }

  function addNewCard(name: string) {
    const newCard: ICard = {
      index: cards.length,
      name: name,
      items: [],
    };

    setCards([...cards, newCard]);
  }

  function removeCard(cardIndex: number) {
    setCards((card) => cards.filter((card) => card.index !== cardIndex));
  }

  return (
    <Context.Provider
      value={{
        addItemToCard: addItemToCard,
        removeItemFromCard: removeItemFromCard,
      }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:ml-4 screen gap-4 my-4 flex-wrap">
        {cards.map((result, i) => (
          <Card
            key={"projectKey_" + i}
            card={cards[i]}
            cards={cards}
            onRemove={removeCard}
          ></Card>
        ))}
        <AddCardDialog onAddNewCard={addNewCard} cards={cards}></AddCardDialog>
      </div>
    </Context.Provider>
  );
}
