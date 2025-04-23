"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoriesOfExpanse } from "@/drizzle/schema";

export function CategoryEditDialog({
  children,
  category,
  householdId,
}: {
  children: ReactNode;
  category: { id: string; name: string; icon: string; type: string };
  householdId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zmień {category.name}</DialogTitle>
        </DialogHeader>
        <CategoryForm
          householdId={householdId}
          category={category}
          onSuccess={() => setIsOpen(false)}
          type={category.type as CategoriesOfExpanse}
        />
      </DialogContent>
    </Dialog>
  );
}
