"use server";
import { auth } from "@/lib/auth";
import { usersSchema } from "../schema/users";
import { z } from "zod";
import { updateUser as updateUserDB } from "../db/users";
import { validate as validateUuid } from "uuid";

export async function updateUser(
  unsafeData: z.infer<typeof usersSchema>,
  userId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const { data, success } = usersSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to update User");

  if (!validateUuid(userId) || userId == "")
    throw new Error("Failed to update User");

  await updateUserDB(data, userId);
}
