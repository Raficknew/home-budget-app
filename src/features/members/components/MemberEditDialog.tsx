"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { MemberForm } from "@/features/members/components/MemberForm";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Settings.household.members");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("edit")} {member.name}
          </DialogTitle>
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
