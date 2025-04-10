"use server";

import { z } from "zod";
import { transactionsSchema } from "../schema/transactions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { insertTransaction } from "../db/transactions";
import { revalidatePath } from "next/cache";
import { TransactionType } from "@/drizzle/schema";

export async function createTransaction(
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await insertTransaction(
    {
      name: data.name,
      categoryId: data.categoryId,
      date: data.date,
      price: data.price,
      type: data.type as TransactionType,
    },
    data.membersIds
  );

  const locale = await getLocale();

  revalidatePath(`/${locale}/${householdId}`);
  redirect(`/${locale}/${householdId}`);
}
