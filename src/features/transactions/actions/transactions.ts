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
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { updateHouseholdBalance } from "@/features/household/db/household";

export async function createTransaction(
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const session = await auth();

  if (session?.user.id == null) throw new Error("User not found");

  await assertHouseholdWriteAccess(householdId);

  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) throw new Error("Failed to create Transaction");

  const household = await db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, householdId),
    columns: { balance: true },
  });

  if (!household) {
    throw new Error("Household not found");
  }

  const balanceAfterTransaction =
    data.type == "income"
      ? household.balance + data.price
      : household.balance - data.price;

  await updateHouseholdBalance(householdId, balanceAfterTransaction);
  await insertTransaction(
    {
      name: data.name,
      categoryId: data.categoryId,
      date: data.date,
      price: data.price,
      type: data.type as TransactionType,
      balanceAfterTransaction,
    },
    data.membersIds
  );

  const locale = await getLocale();

  revalidatePath(`/${locale}/${householdId}`);
  redirect(`/${locale}/${householdId}`);
}
