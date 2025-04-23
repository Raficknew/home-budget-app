"use server";

import { z } from "zod";
import { transactionsSchema } from "../schema/transactions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { insertTransaction } from "../db/transactions";
import { revalidatePath } from "next/cache";
import { HouseholdTable, TransactionType } from "@/drizzle/schema";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";

export async function createTransaction(
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  const currentBalance = await db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, householdId),
    columns: { balance: true },
  });

  await insertTransaction(
    {
      name: data.name,
      categoryId: data.categoryId,
      date: data.date,
      price: data.price,
      type: data.type as TransactionType,
      currentBalance: currentBalance?.balance ?? 0,
    },
    data.membersIds
  );

  const locale = await getLocale();

  revalidatePath(`/${locale}/${householdId}`);
  redirect(`/${locale}/${householdId}`);
}
