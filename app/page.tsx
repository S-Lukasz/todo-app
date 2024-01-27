"use client";

import Card, { ICard } from "@/components/card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
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
import { Context } from "@/components/context";

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
  const [cardName, setCardName] = useState<string>("");
  const maxNameLength = 16;

  const isCardNameToLong = useMemo(() => {
    return cardName.length > maxNameLength;
  }, [cardName]);

  const isCardNameEmpty = useMemo(() => {
    return !cardName;
  }, [cardName]);

  const nameToLongAlert = useMemo(() => {
    if (isCardNameToLong)
      return (
        <p className="w-full text-right text-red-600 font-medium">
          Title can&apos;t be longer than {maxNameLength} characters!
        </p>
      );
    else return <></>;
  }, [isCardNameToLong]);

  const nameEmptyAlert = useMemo(() => {
    if (isCardNameEmpty)
      return (
        <p className="w-full text-right text-red-600 font-medium">
          Title can&apos;t be empty!
        </p>
      );
    else return <></>;
  }, [isCardNameEmpty]);

  const onNameChange = (e?: FormEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    const target = e?.target as HTMLInputElement;
    const nameToSet = target?.value;

    setCardName(nameToSet);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-zinc-700 border-zinc-700 text-zinc-300 w-72 hover:text-zinc-50 rounded-md hover:bg-zinc-800 hover:border-zinc-800"
          variant="outline"
        >
          <div className=" w-full flex items-center gap-4">
            <FontAwesomeIcon className=" w-5 h-5" icon={faPlus} />{" "}
            <p>Add new card</p>
          </div>
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
        {nameToLongAlert}
        {nameEmptyAlert}
        <DialogFooter>
          <DialogClose disabled={isCardNameToLong || isCardNameEmpty}>
            <Button
              disabled={isCardNameToLong || isCardNameEmpty}
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

export default function Home() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    loadCardsFromStorage();
  }, []);

  function getHighestIndex(cardItems: ICardItem[]) {
    return cardItems.reduce(
      (prev, currentCard) =>
        prev > currentCard.index ? prev : currentCard.index,
      0
    );
  }

  const addItemToCard = useCallback(
    (cardIndex: number, newName: string, newDesc: string) => {
      const cardToAddItemTo = cards.find(
        (cardInCurrentCards) => cardIndex === cardInCurrentCards.index
      );

      if (!cardToAddItemTo) return;

      const newItem: ICardItem = {
        currentCard: cardToAddItemTo,
        index: getHighestIndex(cardToAddItemTo.items) + 1,
        desc: newDesc,
        name: newName,
      };

      const cardsWithAddedItem = {
        ...cardToAddItemTo,
        items: [...cardToAddItemTo.items, newItem],
      };

      const cardsCopy = [...cards];
      const foundIndex = cardsCopy.findIndex(
        (cardCopy) => cardIndex === cardCopy.index
      );

      cardsCopy.splice(foundIndex, 1, cardsWithAddedItem);

      setCards(cardsCopy);
      saveCardsToStorage(cardsCopy);
    },
    [cards]
  );

  const removeItemFromCard = useCallback(
    (cardIndex: number, itemIndex: number) => {
      const cardToRemoveItemFrom = cards.find(
        (cardInCurrentCards) => cardIndex === cardInCurrentCards.index
      );

      if (!cardToRemoveItemFrom) return;

      const cardWithRemovedItem = {
        ...cardToRemoveItemFrom,
        items: cardToRemoveItemFrom.items.filter(
          (item) => item.index !== itemIndex
        ),
      };

      const cardsCopy = [...cards];
      const foundIndex = cardsCopy.findIndex(
        (cardCopy) => cardIndex === cardCopy.index
      );

      cardsCopy.splice(foundIndex, 1, cardWithRemovedItem);

      setCards(cardsCopy);
      saveCardsToStorage(cardsCopy);
    },
    [cards]
  );

  function addNewCard(name: string) {
    const newCard: ICard = {
      index: new Date().getTime(),
      name: name,
      items: [],
    };

    const cardsCopy = [...cards];
    cardsCopy.push(newCard);
    setCards(cardsCopy);

    saveCardsToStorage(cardsCopy);
  }

  function saveCardsToStorage(cards: ICard[]) {
    const cardsDataToJson = JSON.stringify(cards);
    localStorage.setItem("cardsData", cardsDataToJson);

    console.log("saveCardsToStorage, data: " + cardsDataToJson);
  }

  function loadCardsFromStorage() {
    const cardsData = localStorage.getItem("cardsData");
    if (!cardsData) {
      setCards(CARDS);
      return;
    }

    var cards = JSON.parse(cardsData);
    setCards(cards);
  }

  function moveCardItem(
    currentCardIndex: number,
    cardToAddIndex: number,
    cardItemToMove: ICardItem
  ) {
    //--------------- Add

    const cardToAddItemTo = cards.find(
      (cardInCurrentCards) => cardToAddIndex === cardInCurrentCards.index
    );

    if (!cardToAddItemTo) return;

    const newItem: ICardItem = {
      currentCard: cardToAddItemTo,
      index: getHighestIndex(cardToAddItemTo.items) + 1,
      desc: cardItemToMove.desc,
      name: cardItemToMove.name,
    };

    const cardsWithAddedItem = {
      ...cardToAddItemTo,
      items: [...cardToAddItemTo.items, newItem],
    };

    const cardsCopy = [...cards];
    const foundIndexToAdd = cardsCopy.findIndex(
      (cardCopy) => cardToAddIndex === cardCopy.index
    );

    cardsCopy.splice(foundIndexToAdd, 1, cardsWithAddedItem);

    //--------------- Remove

    const cardToRemoveItemFrom = cards.find(
      (cardInCurrentCards) => currentCardIndex === cardInCurrentCards.index
    );

    if (!cardToRemoveItemFrom) return;

    const cardWithRemovedItem = {
      ...cardToRemoveItemFrom,
      items: cardToRemoveItemFrom.items.filter(
        (item) => item.index !== cardItemToMove.index
      ),
    };

    const foundIndexToRemove = cardsCopy.findIndex(
      (cardCopy) => currentCardIndex === cardCopy.index
    );

    cardsCopy.splice(foundIndexToRemove, 1, cardWithRemovedItem);
    setCards(cardsCopy);

    saveCardsToStorage(cardsCopy);
  }

  function removeCard(cardIndex: number) {
    const cardsCopy = cards.filter((card) => card.index !== cardIndex);
    saveCardsToStorage(cardsCopy);

    setTimeout(() => {
      loadCardsFromStorage();
    });
  }

  return (
    <Context.Provider
      value={{
        cards: cards,
        moveCardItem: moveCardItem,
        addItemToCard: addItemToCard,
        removeItemFromCard: removeItemFromCard,
        saveCardsToStorage: saveCardsToStorage,
        loadCardsFromStorage: loadCardsFromStorage,
      }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:ml-4 screen gap-4 my-4 flex-wrap">
        {cards.map((result) => (
          <Card
            key={"cardKey_" + result.index}
            card={result}
            onRemove={removeCard}
          ></Card>
        ))}
        <AddCardDialog onAddNewCard={addNewCard} cards={cards}></AddCardDialog>
      </div>
    </Context.Provider>
  );
}
