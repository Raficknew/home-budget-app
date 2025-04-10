"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { insertHousehold } from "../db/household";
import { householdSchema } from "../schema/household";

export async function createHousehold(
  unsafeData: z.infer<typeof householdSchema>
) {
  const { success, data } = householdSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const household = await insertHousehold(
    {
      ...data,
      description: data.description != "" ? data.description : null,
      ownerId: session?.user.id,
    },
    data.balance
  );

  redirect(`/${household.id}/settings`);
}
