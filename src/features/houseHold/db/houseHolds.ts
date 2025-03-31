import { db } from "@/drizzle";
import { HouseHoldTable, InviteTable, MembersTable } from "@/drizzle/schema";

export async function insertHousehold(
  data: typeof HouseHoldTable.$inferInsert,
  linkId: string
) {
  const [newHousehold] = await db
    .insert(HouseHoldTable)
    .values(data)
    .returning();

  if (newHousehold == null) throw new Error("failed to create household");

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      houseHoldId: newHousehold.id,
      userId: newHousehold.ownerId,
      color: "#000000",
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create member for owner");

  const [newInviteLink] = await db
    .insert(InviteTable)
    .values({
      houseHoldId: newHousehold.id,
      link: linkId,
    })
    .returning();

  if (newInviteLink == null) throw new Error("Failed to create invite");

  return newHousehold;
}
