"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoriesOfExpanse, CategoryTable } from "@/drizzle/schema";

export function CategoryEditDialog({
  children,
  category,
  householdId,
}: {
  children: ReactNode;
  category: typeof CategoryTable.$inferSelect;
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
          type={category.categoryType as CategoriesOfExpanse}
        />
      </DialogContent>
    </Dialog>
  );
}
