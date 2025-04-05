import { db } from "@/drizzle";
import { TransactionMembersTable, TransactionTable } from "@/drizzle/schema";

export async function insertTransaction(
  data: typeof TransactionTable.$inferInsert,
  memberId: string
) {
  const [newTransaction] = await db
    .insert(TransactionTable)
    .values(data)
    .returning();

  if (newTransaction == null) {
    throw new Error("Failed to create Transaction");
  }

  const [newTransactionMember] = await db
    .insert(TransactionMembersTable)
    .values({
      transactionId: newTransaction.id,
      memberId,
    })
    .returning();

  if (newTransactionMember == null) {
    throw new Error("Failed to create Transaction member");
  }

  return newTransaction;
}
