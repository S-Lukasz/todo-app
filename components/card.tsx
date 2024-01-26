"use client";

import CardItem, { ICardItem } from "./cardItem";
import { faPlus, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { FormEvent, useContext, useEffect, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Context } from "@/app/page";

export interface ICard {
  index: number;
  name: string;
  items: ICardItem[];
}

interface Prop {
  card: ICard;
  cards: ICard[];
  onRemove: (index: number) => void;
}

interface AddCardItemProp {
  card: ICard;
}

interface EditCardProp {
  currentName: string;
  onCardEdit: (name: string) => void;
}

function EditCardDialog({ onCardEdit, currentName }: EditCardProp) {
  const [cardName, setCardName] = useState<string>(currentName);
  const onNameChange = (e?: FormEvent<HTMLInputElement>) => {
    if (!e) {
      setCardName(currentName);
      return;
    }

    const target = e?.target as HTMLInputElement;
    const nameToSet = target?.value === "" ? currentName : target?.value;

    setCardName(nameToSet);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <FontAwesomeIcon
            className="w-6 h-6 mt-2 mr-3 rounded-md  text-zinc-300 hover:text-zinc-50"
            icon={faEllipsis}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-600">
        <DialogHeader>
          <DialogTitle className="text-zinc-300">Add card</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Edit your card data here. Click save when you&apos;re done.
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
              defaultValue={currentName}
              className="col-span-3 bg-zinc-950 border-zinc-600"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={() => {
                onNameChange();
                onCardEdit(cardName);
              }}
              className="bg-zinc-800 hover:bg-zinc-900 border border-zinc-600"
              type="submit"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddCardItemDialog({ card }: AddCardItemProp) {
  const { addItemToCard } = useContext(Context);
  const [cardItemDesc, setCardItemDesc] = useState<string>(
    "Task (" + (card.items.length + 1) + ")"
  );

  const onNameChange = (e?: FormEvent<HTMLTextAreaElement>) => {
    // console.log("cards, onNameChange: " + cardsItems.length);

    if (!e) {
      setCardItemDesc("Task (" + (card.items.length + 1) + ")");
      return;
    }

    const target = e?.target as HTMLTextAreaElement;
    const nameToSet =
      target?.value === ""
        ? "Task (" + (card.items.length + 1) + ")"
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
                addItemToCard(card, cardItemDesc);
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

export default function Card({ card, cards, onRemove }: Prop) {
  const [cardName, setcardName] = useState<string>(card.name);

  function editCardName(newName: string) {
    setcardName(newName);
  }

  return (
    <div className=" rounded-md items-start w-72 flex flex-col bg-zinc-800 h-min">
      <div className="flex w-full justify-between items-center border-b-2 border-zinc-600">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>
              <FontAwesomeIcon
                className=" w-4 h-4 ml-3 mt-2 rounded-md bg-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-50"
                icon={faTrash}
              />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-zinc-900 border border-zinc-600">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-300">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This action cannot be undone. This will permanently delete
                &apos;{card.name}&apos; card and remove all your tasks attached
                to it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-900 hover:bg-zinc-800 border hover:text-zinc-50 border-zinc-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-zinc-300 text-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 border border-zinc-600"
                onClick={() => onRemove(card.index)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <p className=" flex text-center font-medium text-xl text-zinc-200 ">
          {cardName}
        </p>
        <EditCardDialog
          onCardEdit={editCardName}
          currentName={card.name}
        ></EditCardDialog>
      </div>

      <div className="flex w-full flex-col gap-3 mt-2">
        {card.items.map((result, i) => (
          <CardItem
            key={"projectKey_" + i}
            item={result}
            cards={cards}
          ></CardItem>
        ))}
      </div>

      <AddCardItemDialog card={card}></AddCardItemDialog>

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
