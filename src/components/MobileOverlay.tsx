"use client";
"use client";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

export function MobileOverlay({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Button onClick={() => setOpen(true)}>Mobilny</Button>
      {open && (
        <div className="absolute w-full left-0 bottom-0 bg-[#1A1A1A] h-8/12 rounded-t-2xl py-2.5 px-8 ">
          <div
            onClick={() => setOpen(false)}
            className="h-[5px] bg-white w-[53px] m-auto rounded-full"
          />
          <div className="flex justify-center h-full items-center">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
