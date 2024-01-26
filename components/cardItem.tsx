"use client";

import {
  faBars,
  faChevronDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
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

export interface ICardItem {
  currentCard: ICard;
  index: number;
  desc: string;
}

export interface Prop {
  item: ICardItem;
  cards: ICard[];
}

interface ComboboxProp {
  cards: ICard[];
}

function ComboboxPrompt({ cards }: ComboboxProp) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? cards.find((cards) => cards.name === value)?.name
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button> */}
        <button>
          <FontAwesomeIcon
            className="flex text-left w-4 h-4 mr-3 mt-2 rounded-md text-zinc-400 hover:text-zinc-50"
            icon={faBars}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="bg-zinc-800 text-zinc-50">
          <CommandInput placeholder="Search card..." />
          <CommandEmpty>No card found.</CommandEmpty>
          <CommandGroup>
            {cards.map((cards) => (
              <CommandItem
                key={"comboboxCardKey_" + cards.index}
                className="hover:text-zinc-50 text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
                value={cards.name}
                // onClick={}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    " mr-2 h-4 w-4",
                    value === cards.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {cards.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function CardItem({ item, cards }: Prop) {
  const [accordionTrigger, setAccordionTrigger] = useState<boolean>(true);
  const { removeItemFromCard } = useContext(Context);

  const descriptionTrigger = useMemo(() => {
    if (accordionTrigger)
      return <p className="line-clamp-1 h-[1lh] mr-4">{item.desc}</p>;
    else return <></>;
  }, [accordionTrigger, item.desc]);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-3">
        <AccordionTrigger
          onClick={() => setAccordionTrigger(!accordionTrigger)}
          className="ml-4 flex gap-2 items-center text-zinc-400 hover:text-zinc-50"
        >
          <FontAwesomeIcon icon={faChevronDown} />
          {descriptionTrigger}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex w-full flex-col px-3">
            <p className="p-2">{item.desc}</p>

            <div className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>
                    <FontAwesomeIcon
                      className="flex text-left w-3 h-3 ml-3 mt-2 rounded-md text-zinc-400 hover:text-zinc-50"
                      icon={faMinus}
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
                      task &apos;{item.index}&apos; and remove it from card.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-900 hover:bg-zinc-800 border hover:text-zinc-50 border-zinc-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-zinc-300 text-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 border border-zinc-600"
                      onClick={() =>
                        removeItemFromCard(item.currentCard, item.index)
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <ComboboxPrompt cards={cards}></ComboboxPrompt>
            </div>

            <div className="mt-2 border-b border-zinc-600"></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
