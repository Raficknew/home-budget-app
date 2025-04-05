import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseHoldTable,
  InviteTable,
  MembersTable,
  TransactionTable,
} from "@/drizzle/schema";
import { createUuid } from "@/global/functions";

export async function insertHousehold(
  data: typeof HouseHoldTable.$inferInsert,
  balance: number
) {
  const [newHousehold] = await db
    .insert(HouseHoldTable)
    .values(data)
    .returning();

  if (newHousehold == null) throw new Error("failed to create household");

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      houseHoldId: newHousehold.id,
      userId: newHousehold.ownerId,
      color: `#${randomColor.padStart(6, "0")}`,
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create member for owner");

  const linkId = createUuid();

  const [newInviteLink] = await db
    .insert(InviteTable)
    .values({
      houseHoldId: newHousehold.id,
      link: linkId,
    })
    .returning();

  if (newInviteLink == null) throw new Error("Failed to create invite");

  const [newCategory] = await db
    .insert(CategoryTable)
    .values({
      name: "First Category",
      categoryType: "fixed",
      houseHoldId: newHousehold.id,
    })
    .returning();

  if (newCategory == null) throw new Error("Failed to create category");

  const [newTransaction] = await db
    .insert(TransactionTable)
    .values({
      categoryId: newCategory.id,
      date: new Date(),
      name: "First",
      price: balance,
      type: "income",
      description: "added your balance",
    })
    .returning();

  if (newTransaction == null) throw new Error("Failed to create balance");

  return newHousehold;
}
