"use server";
import { z } from "zod";
import { membersSchema } from "../schema/members";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertMember } from "../db/members";
import { validate as validateUuid } from "uuid";
import { deleteMember as deleteMemberDB } from "../db/members";

export async function createMember(
  unsafeData: z.infer<typeof membersSchema>,
  householdId: string
) {
  const { data, success } = membersSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await insertMember(householdId, data);

  revalidatePath(`/${householdId}/settings`);
  redirect(`/${householdId}/settings`);
}

export async function deleteMember(memberId: string, householdId: string) {
  if (!validateUuid(householdId) || !validateUuid(memberId)) {
    return { error: true, message: "Failed to delete member" };
  }

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await deleteMemberDB(memberId, householdId);

  revalidatePath(`/${householdId}/settings`);

  return { error: false, message: "Success" };
}
