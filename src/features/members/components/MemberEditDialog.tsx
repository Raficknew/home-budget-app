"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { MemberForm } from "./MemberForm";

export function MemberEditDialog({
  children,
  member,
  householdId,
}: {
  children: ReactNode;
  member: {
    id: string;
    name: string;
    user: {
      id: string;
      image: string | null;
    } | null;
  };
  householdId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zmień {member.name}</DialogTitle>
        </DialogHeader>
        <MemberForm
          householdId={householdId}
          member={member}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
