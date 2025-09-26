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

export function MemberAddDialog({
  children,
  householdId,
}: {
  children: ReactNode;
  householdId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Settings.household.members");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add")}</DialogTitle>
        </DialogHeader>
        <MemberForm
          householdId={householdId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
