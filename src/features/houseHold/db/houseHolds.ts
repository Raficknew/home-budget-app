import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";

export async function insertHouseHold(
  data: typeof HouseHoldTable.$inferInsert
) {
  const [newHouseHold] = await db
    .insert(HouseHoldTable)
    .values(data)
    .returning();

  if (newHouseHold == null) throw new Error("failed to create household");

  // ! Ma tworzyć odrazu membera dla ownera
  return newHouseHold;
}
