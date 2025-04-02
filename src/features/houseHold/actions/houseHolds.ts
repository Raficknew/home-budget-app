"use server";
import { z } from "zod";
import { householdSchema } from "../schema/households";
import { redirect } from "next/navigation";
import { insertHousehold } from "../db/households";
import { auth } from "@/lib/auth";

export async function createHousehold(
  unsafeData: z.infer<typeof householdSchema>,
  locale: string
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

  redirect(`/${locale}/${houseHold.id}/edit`);
}
