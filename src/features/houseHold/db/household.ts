import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseholdTable,
  InviteTable,
  MembersTable,
  TransactionTable,
} from "@/drizzle/schema";
import { createUuid, generateRandomColor } from "@/global/functions";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { validate as validateUuid } from "uuid";

export async function insertHousehold(
  data: typeof HouseholdTable.$inferInsert,
  balance: number
) {
  const session = await auth();

  if (!session) throw new Error("failed while createing Household");

  const [newHousehold] = await db
    .insert(HouseholdTable)
    .values(data)
    .returning();

  if (newHousehold == null) throw new Error("failed to create household");

  const randomColor = generateRandomColor();

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      name: session.user.name,
      householdId: newHousehold.id,
      userId: newHousehold.ownerId,
      color: randomColor,
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

export async function updateLink(householdId: string) {
  if (!validateUuid(householdId)) {
    throw new Error("There was an error generateing new link");
  }

  const newLink = await createUuid();

  const [updatedLink] = await db
    .update(InviteTable)
    .set({ link: newLink })
    .where(eq(HouseholdTable.id, householdId))
    .from(HouseholdTable)
    .returning();

  if (updatedLink == null) throw new Error("Failed to generate link");

  return updatedLink;
}
