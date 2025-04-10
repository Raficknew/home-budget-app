"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { insertHousehold } from "../db/household";
import { householdSchema } from "../schema/household";
import { insertMember } from "@/features/members/db/members";

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

export async function joinHousehold(householdId: string, userId: string) {
  const session = await auth();

  if (session?.user.id == null || session.user.name == null) {
    throw new Error("User not found");
  }

  await insertMember(householdId, { userId, name: session.user.name });

  redirect(`/${householdId}`);
}
