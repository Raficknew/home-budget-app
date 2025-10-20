"use server";
import { auth } from "@/lib/auth";
import { usersSchema } from "@/features/users/schema/users";
import { z } from "zod";
import { updateUser as updateUserDB } from "@/features/users/db/users";
import { validate as validateUuid } from "uuid";
import { getTranslations } from "next-intl/server";

export async function updateUser(
  unsafeData: z.infer<typeof usersSchema>,
  userId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  const { data, success } = usersSchema.safeParse(unsafeData);

  if (!success) return { error: true, message: t("User.updateError") };

  if (!validateUuid(userId))
    return { error: true, message: t("User.invalidId") };

  await updateUserDB(data, userId);

  return { error: false, message: t("User.updateSuccess") };
}
