"use client";

import CardItem, { ICardItem } from "./cardItem";
import { faPlus, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
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
import { Context } from "./context";

export interface ICard {
  index: number;
  name: string;
  items: ICardItem[];
}

interface Prop {
  card: ICard;
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

  const maxNameLength = 16;
  const isCardNameToLong = useMemo(() => {
    return cardName.length > maxNameLength;
  }, [cardName]);

  const isCardNameEmpty = useMemo(() => {
    return !cardName;
  }, [cardName]);

  const onNameChange = (e?: FormEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    const target = e?.target as HTMLInputElement;
    const nameToSet = target?.value;

    setCardName(nameToSet);
  };

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
          <DialogTitle className="text-zinc-300">Edit card</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Set your card data here. Click save when you&apos;re done.
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
        {nameToLongAlert}
        {nameEmptyAlert}
        <DialogFooter>
          <DialogClose disabled={isCardNameToLong || isCardNameEmpty}>
            <Button
              disabled={isCardNameToLong || isCardNameEmpty}
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
  const [cardName, setCardName] = useState<string>("Task Name");
  const [cardDesc, setCardDesc] = useState<string>("Description");

  const maxNameLength = 16;

  const isCardNameToLong = useMemo(() => {
    return cardName.length > maxNameLength;
  }, [cardName]);

  const isCardDescEmpty = useMemo(() => {
    return !cardDesc;
  }, [cardDesc]);

  const isCardNameEmpty = useMemo(() => {
    return !cardName;
  }, [cardName]);

  const onCardDescChange = (e?: React.FormEvent<HTMLTextAreaElement>) => {
    if (!e) {
      return;
    }

    const target = e?.target as HTMLTextAreaElement;
    const descToSet = target?.value;

    setCardDesc(descToSet);
  };

  const onCardNameChange = (e?: React.FormEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    const target = e?.target as HTMLInputElement;
    const nameToSet = target?.value;

    setCardName(nameToSet);
  };

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
    if (isCardNameEmpty || isCardDescEmpty)
      return (
        <p className="w-full text-right text-red-600 font-medium">
          Title or description can&apos;t be empty!
        </p>
      );
    else return <></>;
  }, [isCardNameEmpty, isCardDescEmpty]);

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
        <div className="grid py-4 gap-4">
          <div className="flex flex-col grid-cols-4 items-start gap-2 ">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              onInput={(e) => onCardNameChange(e)}
              defaultValue={cardName}
              className="col-span-3 bg-zinc-950 border-zinc-600"
            />
          </div>
          <div className=" flex items-start flex-col grid-cols-4 gap-2 ">
            <Label htmlFor="name" className="">
              Description
            </Label>
            <Textarea
              id="desc"
              onInput={(e) => onCardDescChange(e)}
              placeholder="Type your task description here."
              className="col-span-3 bg-zinc-950 border-zinc-600"
            />
          </div>
        </div>
        {nameToLongAlert}
        {nameEmptyAlert}
        <DialogFooter>
          <DialogClose
            disabled={isCardNameToLong || isCardDescEmpty || isCardNameEmpty}
          >
            <Button
              disabled={isCardNameToLong || isCardDescEmpty || isCardNameEmpty}
              onClick={() => {
                console.log("add item to card: " + card.items.length);
                // onNameChange();
                addItemToCard(card.index, cardName, cardDesc);
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

export default function Card({ card, onRemove }: Prop) {
  const [cardName, setcardName] = useState<string>(card.name);

  const cardItems = useMemo(() => {
    return (
      <div className="flex w-full flex-col gap-3 mt-3">
        {card?.items.map((result, i) => (
          <CardItem
            key={"cardItemKey_" + result.index + "_" + card.index}
            item={result}
          ></CardItem>
        ))}
      </div>
    );
  }, [card]);

  if (!card) return <></>;

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

        <p className=" flex text-center font-medium text-xl text-zinc-200">
          {cardName}
        </p>
        <EditCardDialog
          onCardEdit={editCardName}
          currentName={cardName}
        ></EditCardDialog>
      </div>

      {cardItems}

      <AddCardItemDialog card={card}></AddCardItemDialog>
    </div>
  );
}
