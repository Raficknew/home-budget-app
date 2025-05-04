"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { MemberForm } from "./MemberForm";

export function MemberAddDialog({
  children,
  householdId,
}: {
  children: ReactNode;
  householdId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj fikcyjnego członka</DialogTitle>
        </DialogHeader>
        <MemberForm
          householdId={householdId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
