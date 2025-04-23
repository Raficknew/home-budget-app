"use server";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { validate as validateUuid } from "uuid";
import {
  deleteCategory as deleteCategoryDB,
  insertCategory,
} from "../db/categories";
import { categorySchema } from "../schema/category";
import { z } from "zod";
import { CategoriesOfExpanse } from "@/drizzle/schema";
import { updateCategory as updateCategoryDB } from "../db/categories";

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
    categoryType: data.type as CategoriesOfExpanse,
  });

  revalidatePath(`/${householdId}/settings`);
}

export async function updateCategory(
  unsafeData: z.infer<typeof categorySchema>,
  categoryId: string,
  householdId: string
) {
  const { data, success } = categorySchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await updateCategoryDB({ ...data, id: categoryId, householdId });

  revalidatePath(`/${householdId}/settings`);
}

export async function deleteCategory(categoryId: string, householdId: string) {
  if (!validateUuid(householdId) || !validateUuid(categoryId)) {
    return { error: true, message: "Failed to delete member" };
  }

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await deleteCategoryDB(categoryId, householdId);

  revalidatePath(`/${householdId}/settings`);

  return { error: false, message: "Success" };
}
