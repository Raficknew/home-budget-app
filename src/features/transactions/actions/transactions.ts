"use server";

import { z } from "zod";
import { transactionsSchema } from "@/features/transactions/schema/transactions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { insertTransaction } from "@/features/transactions/db/transactions";
import { revalidatePath } from "next/cache";
import { HouseholdTable, TransactionType } from "@/drizzle/schema";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { assertTransactionsRateLimit } from "@/global/ratelimit";

export async function createTransaction(
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await assertTransactionsRateLimit(session?.user.id);

  await assertHouseholdWriteAccess(householdId);

  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const household = await db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, householdId),
  });

  if (!household) {
    throw new Error("Household not found");
  }

  await insertTransaction({
    name: data.name,
    categoryId: data.categoryId,
    date: data.date,
    price: data.price,
    type: data.type as TransactionType,
    memberId: data.memberId,
  });

  const locale = await getLocale();

  revalidatePath(`/${locale}/${householdId}`);
  redirect(`/${locale}/${householdId}`);
}
