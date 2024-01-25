"use client";

import Image from "next/image";
import CardItem, { ICardItem } from "./cardItem";
import { faPlus, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

const CARDITEMS: ICardItem[] = [
  {
    index: 0,
    desc: "Lorem ipsum, long temporary description of card item.",
  },
  {
    index: 1,
    desc: "Lorem ipsum, long temporary description of card item.",
  },
  {
    index: 2,
    desc: "Lorem ipsum, long temporary description of card item.",
  },
];

export interface ICard {
  index: number;
  name: string;
  //cards: ICardItem[];
}

interface Prop extends ICard {
  index: number;
  name: string;
  onDelete: (index: number) => void;
}

export default function Card({ index, name, onDelete }: Prop) {
  useEffect(() => {
    addNewItem();
  }, []);

  const [cardItems, setCardItems] = useState<ICardItem[]>([]);

  function addNewItem() {
    const newItem: ICardItem = {
      index: cardItems.length,
      desc: "lorem ipsum, can be long, new item desc_" + cardItems.length,
    };
    setCardItems([...cardItems, newItem]);
  }

  function removeItem(itemIndex: number) {
    setCardItems((cardItems) =>
      cardItems.filter((cardItem) => cardItem.index !== itemIndex)
    );
  }

  return (
    <div className=" rounded-md items-start w-72 flex flex-col bg-zinc-800 h-min">
      <div className="flex w-full justify-between items-center">
        <button onClick={() => onDelete(index)}>
          <FontAwesomeIcon
            className=" w-4 h-4 ml-3 mt-2 rounded-md bg-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-50"
            icon={faTrash}
          />
        </button>
        <p className=" flex text-center font-semibold text-xl text-zinc-200 border-b-2 border-zinc-600 ">
          {name}
        </p>
        <button>
          <FontAwesomeIcon
            className="w-6 h-6 mt-2 mr-3 rounded-md  text-zinc-300 hover:text-zinc-50"
            icon={faEllipsis}
          />
        </button>
      </div>

      <div className="flex w-full flex-col gap-3 mt-2">
        {cardItems.map((result, i) => (
          <CardItem
            key={"projectKey_" + i}
            index={result.index}
            desc={result.desc}
            onDelete={removeItem}
          ></CardItem>
        ))}
      </div>

      <Button
        onClick={() => addNewItem()}
        className="flex items-center pl-4 pb-2 gap-2 bg-zinc-800 text-zinc-300 hover:text-slate-50"
      >
        <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
        <p className="">Add new card</p>
      </Button>
    </div>
  );
}
