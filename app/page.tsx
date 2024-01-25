"use client";

import Card, { ICard } from "@/components/card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <button
        onClick={() => addNewCard("New card " + cards.length)}
        className="bg-zinc-800  rounded-md w-10 h-10 hover:bg-zinc-700"
      >
        <FontAwesomeIcon className=" w-6 h-6 mt-1" icon={faPlus} />
      </button>
    </div>
  );
}
