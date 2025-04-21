"use client";
import { ActionButton } from "@/components/ActionButton";
import { Trash2Icon } from "lucide-react";
import { deleteCategory } from "../actions/categories";
import { CategoriesOfExpanse } from "@/drizzle/schema";

export function Category({
  category,
  householdId,
}: {
  category: { id: string; name: string; categoryType: CategoriesOfExpanse };
  householdId: string;
}) {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-2">
        {category.name} {category.categoryType}
      </div>
      <div className="flex items-center gap-6">
        x{" "}
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
