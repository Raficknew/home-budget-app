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
  checkIfUserCanCreateNewMember,
} from "@/features/members/permissions/members";
import { getTranslations } from "next-intl/server";

export async function createMember(
  unsafeData: z.infer<typeof membersSchema>,
  householdId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  await assertMemberWriteAccess(householdId);

  if (!(await checkIfUserCanCreateNewMember(householdId)))
    return { error: true, message: t("Limits.memberLimitReached") };

  const { data, success } = membersSchema.safeParse(unsafeData);

  if (!success) return { error: true, message: t("Members.createError") };

  await insertMember(data, householdId);

  revalidateTag(`/${householdId}/members`);
  return { error: false, message: t("Members.createSuccess") };
}

export async function deleteMember(memberId: string, householdId: string) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  if (
    !validateUuid(householdId) ||
    !validateUuid(memberId) ||
    (await assertMemberWriteAccess(householdId))
  ) {
    return { error: true, message: t("Members.deleteError") };
  }

  await deleteMemberDB(memberId, householdId);

  revalidatePath(`/${householdId}/settings`);

  return { error: false, message: t("Members.deleteSuccess") };
}

export async function updateMember(
  unsafeData: z.infer<typeof membersSchema>,
  memberId: string,
  householdId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  const { data, success } = membersSchema.safeParse(unsafeData);

  if (!success) return { error: true, message: t("Members.updateError") };

  await assertMemberWriteAccess(householdId);

  await updateMemberDB({ memberId, name: data.name }, householdId);

  revalidateTag(`/${householdId}/members`);
  return { error: false, message: t("Members.updateSuccess") };
}
