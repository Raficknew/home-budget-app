"use server";
import { z } from "zod";
import { membersSchema } from "@/features/members/schema/members";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  insertMember,
  updateMember as updateMemberDB,
} from "@/features/members/db/members";
import { validate as validateUuid } from "uuid";
import { deleteMember as deleteMemberDB } from "@/features/members/db/members";
import {
  assertMemberWriteAccess,
  canCreateNewMember,
} from "@/features/members/permissions/members";

export async function createMember(
  unsafeData: z.infer<typeof membersSchema>,
  householdId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await assertMemberWriteAccess(householdId);

  if (!(await canCreateNewMember(householdId)))
    throw new Error("Limit reached");

  const { data, success } = membersSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  await insertMember(data, householdId);

  revalidateTag(`/${householdId}/members`);
}

export async function deleteMember(memberId: string, householdId: string) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  if (
    !validateUuid(householdId) ||
    !validateUuid(memberId) ||
    (await assertMemberWriteAccess(householdId))
  ) {
    return { error: true, message: "Failed to delete member" };
  }

  await deleteMemberDB(memberId, householdId);

  revalidatePath(`/${householdId}/settings`);

  return { error: false, message: "Success" };
}

export async function updateMember(
  unsafeData: z.infer<typeof membersSchema>,
  memberId: string,
  householdId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const { data, success } = membersSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  await assertMemberWriteAccess(householdId);

  await updateMemberDB({ memberId, name: data.name }, householdId);

  revalidateTag(`/${householdId}/members`);
}
