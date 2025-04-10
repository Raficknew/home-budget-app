import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

export function MobileOverlay({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden block">Open</SheetTrigger>
      <SheetContent side="bottom" className="md:hidden block">
        <SheetHeader>
          <SheetTitle className="hidden"></SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
