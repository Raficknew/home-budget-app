"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { insertHousehold } from "../db/houseHolds";
import { householdSchema } from "../schema/houseHolds";
import { getLocale } from "next-intl/server";

export async function createHousehold(
  unsafeData: z.infer<typeof householdSchema>
) {
  const { success, data } = householdSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const houseHold = await insertHousehold(
    {
      ...data,
      description: data.description != "" ? data.description : null,
      ownerId: session?.user.id,
    },
    data.balance
  );

  const locale = getLocale();

  redirect(`/${locale}/${houseHold.id}/edit`);
}
