"use client";

import {
  faChevronDown,
  faMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Image from "next/image";
import { useMemo, useState } from "react";

export interface ICardItem {
  index: number;
  desc: string;
}

export interface Prop {
  index: number;
  desc: string;
  onDelete: (index: number) => void;
}

export default function CardItem({ index, desc, onDelete }: Prop) {
  const [accordionTrigger, setAccordionTrigger] = useState<boolean>(true);

  const descriptionTrigger = useMemo(() => {
    if (accordionTrigger)
      return <p className="line-clamp-1 h-[1lh] mr-4">{desc}</p>;
    else return <></>;
  }, [accordionTrigger, desc]);

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
            <p className="p-2">{desc}</p>
            <button onClick={() => onDelete(index)}>
              <FontAwesomeIcon
                className="flex text-left w-3 h-3 ml-3 mt-2 rounded-md text-zinc-400 hover:text-zinc-50"
                icon={faMinus}
              />
            </button>
            <div className="mt-2 border-b border-zinc-600"></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
