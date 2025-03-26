"use server";
import { z } from "zod";
import { houseHoldSchema } from "../schema/houseHolds";
import { redirect } from "next/navigation";
import { insertHouseHold as insertHouseHoldDB } from "../db/houseHolds";
import { auth } from "@/lib/auth";

export async function insertHouseHold(
  unsafeData: z.infer<typeof houseHoldSchema>,
  locale: string
) {
  const { success, data } = houseHoldSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const houseHold = await insertHouseHoldDB({
    ...data,
    ownerId: session?.user.id,
  });

  redirect(`/${locale}/${houseHold.id}`);
}
