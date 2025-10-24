import { db } from "@/drizzle";
import { TransactionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function insertTransaction(
  data: typeof TransactionTable.$inferInsert
) {
  const [newTransaction] = await db
    .insert(TransactionTable)
    .values(data)
    .returning();

  if (newTransaction == null) {
    throw new Error("Failed to create Transaction");
  }

  return newTransaction;
}

export async function updateTransaction(
  data: typeof TransactionTable.$inferInsert
) {
  const [updatedTransaciton] = await db
    .update(TransactionTable)
    .set(data)
    .where(eq(TransactionTable.id, data.id!))
    .returning();

  if (updatedTransaciton == null) {
    throw new Error("Failed to update Transaction");
  }

  return updatedTransaciton;
}
