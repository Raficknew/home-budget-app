"use server";
import { z } from "zod";
import { householdSchema } from "../schema/households";
import { redirect } from "next/navigation";
import { insertHousehold as insertHouseholdDB } from "../db/households";
import { auth } from "@/lib/auth";

export async function insertHousehold(
  unsafeData: z.infer<typeof householdSchema>,
  locale: string
) {
  const { success, data } = householdSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const houseHold = await insertHouseholdDB({
    ...data,
    description: data.description != "" ? data.description : null,
    ownerId: session?.user.id,
  });

  redirect(`/${locale}/${houseHold.id}`);
}
