import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseholdTable,
  InviteTable,
  MembersTable,
  TransactionTable,
} from "@/drizzle/schema";
import { createUuid } from "@/global/functions";

export async function insertHousehold(
  data: typeof HouseholdTable.$inferInsert,
  balance: number
) {
  const [newHousehold] = await db
    .insert(HouseholdTable)
    .values(data)
    .returning();

  if (newHousehold == null) throw new Error("failed to create household");

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      householdId: newHousehold.id,
      userId: newHousehold.ownerId,
      color: `#${randomColor.padStart(6, "0")}`,
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create member for owner");

  const linkId = createUuid();

  const [newInviteLink] = await db
    .insert(InviteTable)
    .values({
      householdId: newHousehold.id,
      link: linkId,
    })
    .returning();

  if (newInviteLink == null) throw new Error("Failed to create invite");

  const [newCategory] = await db
    .insert(CategoryTable)
    .values({
      name: "First Category",
      categoryType: "fixed",
      householdId: newHousehold.id,
    })
    .returning();

  if (newCategory == null) throw new Error("Failed to create category");

  if (balance > 0) {
    const [newTransaction] = await db
      .insert(TransactionTable)
      .values({
        categoryId: newCategory.id,
        date: new Date(),
        name: "First",
        price: balance,
        type: "income",
      })
      .returning();

    if (newTransaction == null) throw new Error("Failed to create balance");
  }

  return newHousehold;
}
