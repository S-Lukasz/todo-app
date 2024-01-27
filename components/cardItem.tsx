"use client";

import {
  faBars,
  faChevronDown,
  faEllipsis,
  faMinus,
  faPenSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
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
import { useContext, useMemo, useState } from "react";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICard } from "./card";
import { Context } from "@/app/page";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export interface ICardItem {
  currentCard: ICard;
  index: number;
  name: string;
  desc: string;
}

interface Prop {
  item: ICardItem;
}

interface EditItemProp {
  currentName: string;
  currentDesc: string;
  onItemEdit: (name: string, desc: string) => void;
}

function EditItemData({ onItemEdit, currentName, currentDesc }: EditItemProp) {
  const [cardName, setCardName] = useState<string>(currentName);
  const [cardDesc, setCardDesc] = useState<string>(currentDesc);

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
        <button>
          <FontAwesomeIcon
            className="w-4 h-4 mr-3 rounded-md text-zinc-300 hover:text-zinc-50"
            icon={faPenSquare}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-600">
        <DialogHeader>
          <DialogTitle className="text-zinc-300">Edit task</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Edit your task data here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-col">
          <div className="flex flex-col grid-cols-4 items-start gap-4 ">
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
          <div className=" flex items-start flex-col grid-cols-4 gap-4 ">
            <Label htmlFor="name" className="">
              Description
            </Label>
            <Textarea
              id="desc"
              onInput={(e) => onCardDescChange(e)}
              defaultValue={cardDesc}
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
                onCardDescChange();
                onItemEdit(cardName, cardDesc);
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

function ComboboxPrompt({ item }: Prop) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { cards, moveCardItem } = useContext(Context);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          <FontAwesomeIcon
            className="flex text-left w-4 h-4 mr-3 rounded-md text-zinc-400 hover:text-zinc-50"
            icon={faBars}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="bg-zinc-800 text-zinc-50 ">
          <CommandInput placeholder="Search card..." />
          <CommandEmpty>No card found.</CommandEmpty>
          <CommandGroup>
            {cards.map((card) => (
              <CommandItem
                key={"comboboxCardKey_" + card.index}
                className={
                  item.currentCard.index == card.index
                    ? " hidden "
                    : " hover:text-zinc-50 text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
                }
                value={card.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  moveCardItem(item.currentCard.index, card.index, item);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    " mr-2 h-4 w-4",
                    value === card.name ? "opacity-100" : "opacity-0"
                  )}
                />

                {card.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function CardItem({ item }: Prop) {
  const [accordionTrigger, setAccordionTrigger] = useState<boolean>(true);
  const [cardDesc, setCardDesc] = useState<string>(item.desc);
  const [cardName, setCardName] = useState<string>(item.name);
  const { cards, removeItemFromCard } = useContext(Context);

  const nameTrigger = useMemo(() => {
    if (accordionTrigger)
      return (
        <p className="line-clamp-1 h-[1lh] mr-4 break-words break-all flex ">
          <span>{cardName}</span>
          <span>...</span>
        </p>
      );
    else return <></>;
  }, [accordionTrigger, cardName]);

  function editCardItemData(newName: string, newDesc: string) {
    setCardName(newName);
    setCardDesc(newDesc);
  }

  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-3">
        <AccordionTrigger
          onClick={() => setAccordionTrigger(!accordionTrigger)}
          className={
            (accordionTrigger ? " pl-2 p-1" : " p-2 ") +
            " bg-zinc-700 rounded-md mr-4 ml-4 flex gap-2 items-center text-zinc-300 hover:text-zinc-50"
          }
        >
          <FontAwesomeIcon icon={faChevronDown} />
          {nameTrigger}
        </AccordionTrigger>
        <AccordionContent className="border border-zinc-800 rounded-md m-4 bg-zinc-700">
          <div className="flex w-full flex-col px-3">
            <div className="flex justify-between items-center pt-2">
              <p className="px-2 flex text-zinc-300 flex-wrap text-wrap break-words break-all font-semibold text-lg">
                {cardName}
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>
                    <FontAwesomeIcon
                      className="flex w-5 h-5 ml-auto mr-2 text-zinc-400 hover:text-zinc-50"
                      icon={faXmark}
                    ></FontAwesomeIcon>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 ">
                  {/* border border-zinc-600 */}
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-zinc-300">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      This action cannot be undone. This will permanently delete
                      task &apos;{item.index}&apos; and remove it from card.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-900 hover:bg-zinc-800 border hover:text-zinc-50 border-zinc-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-zinc-300 text-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 border border-zinc-600"
                      onClick={() => {
                        removeItemFromCard(item.currentCard.index, item.index);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="border-b border-zinc-400"></div>
            <p className="p-2 flex flex-wrap text-wrap break-words break-all">
              {cardDesc}
            </p>

            <div className="flex items-center mb-2">
              <EditItemData
                currentDesc={cardDesc}
                currentName={cardName}
                onItemEdit={editCardItemData}
              ></EditItemData>
              <ComboboxPrompt item={item}></ComboboxPrompt>
            </div>

            {/* <div className="mt-2 border-b border-zinc-600"></div> */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
