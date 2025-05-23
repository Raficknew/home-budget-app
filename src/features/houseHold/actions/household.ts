"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  deleteHousehold as deleteHouseholdDB,
  insertHousehold,
  updateLink,
} from "../db/household";
import { HouseholdSchema, householdSchema } from "../schema/household";
import { insertMember } from "@/features/members/db/members";
import { revalidatePath } from "next/cache";
import { updateHousehold as updateHouseholdDB } from "../db/household";

export async function createHousehold(
  unsafeData: z.infer<typeof householdSchema>
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const { success, data } = householdSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  const household = await insertHousehold({
    ...data,
    description: data.description != "" ? data.description : null,
    ownerId: session?.user.id,
  });

  redirect(`/${household.id}/settings/household`);
}

export async function updateHousehold(
  unsafeData: HouseholdSchema,
  householdId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const { success, data } = householdSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Household");

  await updateHouseholdDB(data, householdId);

  revalidatePath(`/${householdId}/settings/household`);
}

export async function deleteHousehold(householdId: string) {
  const session = await auth();

  if (session?.user.id == null)
    return { error: true, message: "Failed to delete Household" };

  await deleteHouseholdDB(householdId);

  redirect(`/`);
}

export async function joinHousehold(householdId: string, userId: string) {
  const session = await auth();

  if (session?.user.id == null || session.user.name == null) {
    throw new Error("User not found");
  }

  await insertMember({ userId, name: session.user.name }, householdId);

  redirect(`/${householdId}`);
}

export async function generateLinkForHousehold(
  householdId: string,
  link: string
) {
  const session = await auth();

  if (session?.user.id == null) {
    return { error: true, message: "User not found" };
  }

  await updateLink(householdId, link);

  revalidatePath(`/${householdId}/settings/household`);
  return { error: false, message: "Success" };
}
