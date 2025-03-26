import { db } from "@/drizzle";
import { HouseHoldTable, InviteTable, MembersTable } from "@/drizzle/schema";

export async function insertHouseHold(
  data: typeof HouseHoldTable.$inferInsert
) {
  const [newHouseHold] = await db
    .insert(HouseHoldTable)
    .values(data)
    .returning();

  if (newHouseHold == null) throw new Error("failed to create household");

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      houseHoldId: newHouseHold.id,
      userId: newHouseHold.ownerId,
      color: "#000000",
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create member for owner");

  const [newInviteLink] = await db
    .insert(InviteTable)
    .values({
      houseHoldId: newHouseHold.id,
    })
    .returning();

  if (newInviteLink == null) throw new Error("Failed to create invite");

  return newHouseHold;
}
