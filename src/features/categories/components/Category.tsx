"use client";
import { ActionButton } from "@/components/ActionButton";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { deleteCategory } from "../actions/category";
import { CategoriesOfExpanse } from "@/drizzle/schema";
import { CategoryIcon, CategoryIconKeys } from "./CategoryIcon";
import { DialogTrigger } from "@/components/ui/dialog";
import { CategoryEditDialog } from "./CategoryEditDialog";

export function Category({
  category,
  householdId,
}: {
  category: {
    id: string;
    name: string;
    icon: CategoryIconKeys;
    categoryType: CategoriesOfExpanse;
  };
  householdId: string;
}) {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-2">
        <CategoryIcon categoryIconName={category.icon} />
        {category.name} {category.categoryType}
      </div>
      <div className="flex items-center gap-6">
        <CategoryEditDialog
          householdId={householdId}
          category={{
            ...category,
            type: category.categoryType as CategoriesOfExpanse,
          }}
        >
          <DialogTrigger>
            <Edit2Icon className="cursor-pointer" size={16} />
          </DialogTrigger>
        </CategoryEditDialog>

        <ActionButton
          action={() => deleteCategory(category.id, householdId)}
          requireAreYouSure
          variant="destructive"
        >
          <Trash2Icon size={20} />
        </ActionButton>
      </div>
    </div>
  );
}
