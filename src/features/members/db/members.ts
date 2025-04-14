import { db } from "@/drizzle";
import { MembersTable } from "@/drizzle/schema";
import { generateRandomColor } from "@/global/functions";
import { and, eq } from "drizzle-orm";

export async function insertMember(
  householdId: string,
  { userId, name }: { userId?: string; name: string }
) {
  const randomColor = generateRandomColor();
  const [newMember] = await db
    .insert(MembersTable)
    .values({
      householdId,
      userId: userId ?? null,
      name,
      color: randomColor,
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create Member");

  return newMember;
}

export async function deleteMember(memberId: string, householdId: string) {
  const [newMember] = await db
    .delete(MembersTable)
    .where(
      and(
        eq(MembersTable.id, memberId),
        eq(MembersTable.householdId, householdId)
      )
    )
    .returning();

  if (newMember == null) throw new Error("Failed to create Member");

  return newMember;
}
