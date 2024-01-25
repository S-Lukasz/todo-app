"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-12 flex flex-col bg-zinc-950 shadow-md">
      <p className="text-center text-lg font-semibold text-white absolute w-full h-full pointer-events-none mt-3 ">
        ToDo List - Łukasz Surma
      </p>
      <div className=" border-b border-zinc-700"> </div>
    </header>
  );
}
