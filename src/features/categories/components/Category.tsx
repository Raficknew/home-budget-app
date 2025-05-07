"use client";
import { ActionButton } from "@/components/ActionButton";
import { Cancel01Icon, PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { deleteCategory } from "../actions/category";
import { CategoriesOfExpanse } from "@/drizzle/schema";
import { CategoryIcon, CategoryIconKeys } from "./CategoryIcon";
import { DialogTrigger } from "@/components/ui/dialog";
import { CategoryEditDialog } from "./CategoryEditDialog";
import { HugeiconsIcon } from "@hugeicons/react";

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
        <p>{category.name}</p>
      </div>
      <div className="flex items-center gap-6">
        <CategoryEditDialog
          householdId={householdId}
          category={{
            ...category,
            categoryType: category.categoryType as CategoriesOfExpanse,
          }}
        >
          <DialogTrigger className="cursor-pointer">
            <HugeiconsIcon size={20} icon={PencilEdit02Icon} />
          </DialogTrigger>
        </CategoryEditDialog>

        <ActionButton
          action={() => deleteCategory(category.id, householdId)}
          requireAreYouSure
          variant="destructive"
        >
          <HugeiconsIcon size={20} icon={Cancel01Icon} />
        </ActionButton>
      </div>
    </div>
  );
}
