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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Settings.categories");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("edit")} {category.name}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          householdId={householdId}
          category={category}
          onSuccess={() => setIsOpen(false)}
          categoryType={category.categoryType as CategoriesOfExpanse}
        />
      </DialogContent>
    </Dialog>
  );
}
