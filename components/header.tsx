"use client";

import { useContext } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./context";

export default function Header() {
  const { loadCardsFromStorage } = useContext(Context);

  function clearLocalData() {
    localStorage.clear();
    loadCardsFromStorage();
    location.reload();
  }

  return (
    <header className="sticky top-0 z-10 h-24 sm:h-12 flex bg-zinc-950 shadow-md items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="bg-zinc-800 flex items-center gap-2 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 rounded-md h-1/3 sm:h-1/2 px-2 sm:mt-1 sm:ml-4 mx-auto mt-8">
            <FontAwesomeIcon icon={faRotateRight} /> <p>Clear Data</p>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-300">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action cannot be undone. This will permanently clear all your
              cards data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-900 hover:bg-zinc-800 border hover:text-zinc-50 border-zinc-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-zinc-300 text-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 border border-zinc-600"
              onClick={() => clearLocalData()}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="text-center text-lg font-semibold text-white absolute w-full h-full pointer-events-none mt-5 ">
        Kanban Board - Łukasz Surma
      </p>
      <div className=" border-b border-zinc-700"> </div>
    </header>
  );
}
