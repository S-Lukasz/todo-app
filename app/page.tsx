"use client";

import Card, { ICard } from "@/components/card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FormEvent, use, useEffect, useState } from "react";
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
import { stringify } from "querystring";

const CARDS: ICard[] = [
  {
    index: 0,
    name: "ToDo",
  },
  {
    index: 1,
    name: "In Progress",
  },
  {
    index: 2,
    name: "Done",
  },
];

interface Prop {
  onAddNewCard: (name: string) => void;
  cards: ICard[];
}

export function AddCardDialog({ onAddNewCard, cards }: Prop) {
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

  // useEffect(() => {
  //   setCardName();
  // }, []);

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

export default function Home() {
  useEffect(() => {
    setCards(CARDS);
  }, []);

  const [cards, setCards] = useState<ICard[]>([]);

  function addNewCard(name: string) {
    const newCard: ICard = {
      index: cards.length,
      name: name,
    };

    setCards([...cards, newCard]);
  }

  function removeItem(cardIndex: number) {
    setCards((card) => cards.filter((card) => card.index !== cardIndex));
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:ml-4 screen gap-4 my-4 flex-wrap">
      {cards.map((result, i) => (
        <Card
          key={"projectKey_" + i}
          index={result.index}
          name={result.name}
          onDelete={removeItem}
        ></Card>
      ))}
      <AddCardDialog onAddNewCard={addNewCard} cards={cards}></AddCardDialog>
    </div>
  );
}
