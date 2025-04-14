import { db } from "@/drizzle";
import { MembersTable } from "@/drizzle/schema";
import { generateRandomColor } from "@/global/functions";

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
