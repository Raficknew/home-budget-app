"use server";

import { z } from "zod";
import { transactionsSchema } from "@/features/transactions/schema/transactions";
import { auth } from "@/lib/auth";
import { getLocale, getTranslations } from "next-intl/server";
import {
  insertTransaction,
  updateTransaction as updateTransactionDB,
  deleteTransaction as deleteTransactionDB,
} from "@/features/transactions/db/transactions";
import { revalidatePath } from "next/cache";
import { HouseholdTable, TransactionType } from "@/drizzle/schema";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { assertTransactionsRateLimit } from "@/global/ratelimit";
import { validate as validateUuid } from "uuid";

export async function createTransaction(
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  await assertTransactionsRateLimit(session?.user.id);

  await assertHouseholdWriteAccess(householdId);

  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) return { error: true, message: t("Transactions.createError") };

  const household = await db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, householdId),
  });

  if (!household) {
    return { error: true, message: t("Household.notFound") };
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
  revalidatePath(`/${locale}/${householdId}/transactions`);

  return { error: false, message: t("Transactions.createSuccess") };
}

export async function updateTransaction(
  transactionId: string,
  unsafeData: z.infer<typeof transactionsSchema>,
  householdId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  await assertHouseholdWriteAccess(householdId);

  const { success, data } = transactionsSchema.safeParse(unsafeData);

  if (!success) return { error: true, message: t("Transactions.updateError") };

  const household = await db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, householdId),
  });

  if (!household) {
    return { error: true, message: t("Household.notFound") };
  }

  await updateTransactionDB({
    id: transactionId,
    name: data.name,
    categoryId: data.categoryId,
    date: data.date,
    price: data.price,
    type: data.type as TransactionType,
    memberId: data.memberId,
  });

  const locale = await getLocale();

  revalidatePath(`/${locale}/${householdId}`);
  revalidatePath(`/${locale}/${householdId}/transactions`);

  return { error: false, message: t("Transactions.updateSucccess") };
}

export async function deleteTransaction(
  transactionId: string,
  householdId: string
) {
  const session = await auth();
  const t = await getTranslations("ReturnMessages");

  if (session?.user.id == null)
    return { error: true, message: t("User.invalidId") };

  if (!validateUuid(transactionId)) {
    return { error: true, message: t("Transactions.deleteError") };
  }

  await deleteTransactionDB(transactionId);

  revalidatePath(`/${householdId}`);
  revalidatePath(`/${householdId}/transactions`);

  return { error: false, message: t("Transactions.deleteSuccess") };
}
