import { db } from "@/drizzle";
import { TransactionTable } from "@/drizzle/schema";

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
