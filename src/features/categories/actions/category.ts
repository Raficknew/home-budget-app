"use server";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { validate as validateUuid } from "uuid";
import {
  deleteCategory as deleteCategoryDB,
  insertCategory,
} from "@/features/categories/db/categories";
import { categorySchema } from "@/features/categories/schema/category";
import { z } from "zod";
import { CategoriesOfExpanse } from "@/drizzle/schema";
import { updateCategory as updateCategoryDB } from "@/features/categories/db/categories";

export async function createCategory(
  unsafeData: z.infer<typeof categorySchema>,
  householdId: string
) {
  const { data, success } = categorySchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await insertCategory({
    ...data,
    householdId,
    categoryType: data.categoryType as CategoriesOfExpanse,
  });

  revalidatePath(`/${householdId}/settings`);
}

export async function updateCategory(
  unsafeData: z.infer<typeof categorySchema>,
  categoryId: string,
  householdId: string,
  type: CategoriesOfExpanse
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const { data, success } = categorySchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  await updateCategoryDB({
    ...data,
    id: categoryId,
    householdId,
    categoryType: type,
  });

  revalidateTag(`/${householdId}/settings`);
}

export async function deleteCategory(categoryId: string, householdId: string) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  if (!validateUuid(householdId) || !validateUuid(categoryId)) {
    return { error: true, message: "Failed to delete member" };
  }

  await deleteCategoryDB(categoryId, householdId);

  revalidateTag(`/${householdId}/settings`);

  return { error: false, message: "Success" };
}
