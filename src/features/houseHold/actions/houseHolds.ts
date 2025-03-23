"use server";
import { z } from "zod";
import { houseHoldSchema } from "../schema/houseHolds";
import { redirect } from "next/navigation";
import { insertHouseHold as insertHouseHoldDB } from "../db/houseHolds";
import { getCurrentUser } from "@/services/clerk";

export async function insertHouseHold(
  unsafeData: z.infer<typeof houseHoldSchema>
) {
  const { success, data } = houseHoldSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const { userId } = await getCurrentUser();

  if (userId == null) throw new Error("User not found");

  const houseHold = await insertHouseHoldDB({
    ...data,
    ownerId: userId,
  });

  redirect(`/en/${houseHold.id}`);
}
