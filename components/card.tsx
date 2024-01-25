"use client";

import Image from "next/image";
import CardItem, { ICardItem } from "./cardItem";
import { faPlus, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { FormEvent, useEffect, useState } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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

interface CardItemProp {
  onAddNewCardItem: (desc: string) => void;
  cardItems: ICardItem[];
}

export function AddCardItemDialog({
  onAddNewCardItem,
  cardItems,
}: CardItemProp) {
  const [cardItemDesc, setCardItemDesc] = useState<string>(
    "Task (" + (cardItems.length + 1) + ")"
  );

  const onNameChange = (e?: FormEvent<HTMLTextAreaElement>) => {
    // console.log("cards, onNameChange: " + cardsItems.length);

    if (!e) {
      setCardItemDesc("Task (" + (cardItems.length + 1) + ")");
      return;
    }

    const target = e?.target as HTMLTextAreaElement;
    const nameToSet =
      target?.value === ""
        ? "Task (" + (cardItems.length + 1) + ")"
        : target?.value;

    setCardItemDesc(nameToSet);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center pl-4 pb-2 gap-2 border-zinc-800 hover:bg-zinc-800  bg-zinc-800 text-zinc-300 hover:text-slate-50"
          variant="outline"
        >
          <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
          <p className="">Add new task</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-600">
        <DialogHeader>
          <DialogTitle className="text-zinc-300">Create new task</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Set your task data here. Click add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid  py-4">
          <div className=" items-start flex flex-col gap-4 ">
            <Label htmlFor="name" className="">
              Description
            </Label>
            <Textarea
              id="name"
              onInput={(e) => onNameChange(e)}
              placeholder="Type your task description here."
              className="col-span-3 bg-zinc-950 border-zinc-600"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={() => {
                onNameChange();
                onAddNewCardItem(cardItemDesc);
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

export default function Card({ index, name, onDelete }: Prop) {
  // useEffect(() => {
  //   addNewItem("lorem ipsum, can be long, new item desc_" + cardItems.length);
  // }, []);

  const [cardItems, setCardItems] = useState<ICardItem[]>([]);

  function addNewItem(newDesc: string) {
    const newItem: ICardItem = {
      index: cardItems.length,
      desc: newDesc,
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
      <div className="flex w-full justify-between items-center  border-b-2 border-zinc-600">
        <button onClick={() => onDelete(index)}>
          <FontAwesomeIcon
            className=" w-4 h-4 ml-3 mt-2 rounded-md bg-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-50"
            icon={faTrash}
          />
        </button>
        <p className=" flex text-center font-medium text-xl text-zinc-200 ">
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

      <AddCardItemDialog
        onAddNewCardItem={addNewItem}
        cardItems={cardItems}
      ></AddCardItemDialog>

      {/* <Button
        onClick={() => addNewItem()}
        className="flex items-center pl-4 pb-2 gap-2 bg-zinc-800 text-zinc-300 hover:text-slate-50"
      >
        <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
        <p className="">Add new card</p>
      </Button> */}
    </div>
  );
}
