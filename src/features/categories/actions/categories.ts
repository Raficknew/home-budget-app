"use server";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { validate as validateUuid } from "uuid";
import { deleteCategory as deleteCategoryDB } from "../db/categories";

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
