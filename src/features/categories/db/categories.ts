import { db } from "@/drizzle";
import { CategoryTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function deleteCategory(categoryId: string, householdId: string) {
  const [deletedCategory] = await db
    .delete(CategoryTable)
    .where(
      and(
        eq(CategoryTable.id, categoryId),
        eq(CategoryTable.householdId, householdId)
      )
    )
    .returning();

  if (deletedCategory == null) throw new Error("Failed to create Member");

  return deletedCategory;
}
