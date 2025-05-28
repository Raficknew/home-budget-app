import { BalanceTracker } from "@/components/BalanceTracker";
import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseholdTable,
  TransactionTable,
} from "@/drizzle/schema";
import { TransactionDialog } from "@/features/transactions/components/TransactionDialog";
import { TransactionMobileDialog } from "@/features/transactions/components/TransactionMobileDialog";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate as validateUuid } from "uuid";

export default async function HouseholdPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId, new Date());

  if (household == null) {
    notFound();
  }

  return (
    <div className="p-5">
      <div className="flex w-full">
        <BalanceTracker
          balance={household.balance}
          currency={household.currencyCode}
          categories={household.categories}
        />
        <TransactionDialog
          defaultTransaction="income"
          householdId={householdId}
        />
        <TransactionMobileDialog
          defaultTransaction="income"
          householdId={householdId}
        />
        {household.categories.map((c) => (
          <div key={c.id}>
            {c.transactions.map((t) => (
              <div key={t.id}>
                {t.name} {t.price}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getHousehold(id: string, date: Date) {
  if (!validateUuid(id) && date == null) {
    return null;
  }

  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      currency: { columns: { code: true } },
      categories: {
        where: eq(CategoryTable.householdId, id),
        with: {
          transactions: {
            where: and(
              gte(TransactionTable.date, firstDayOfMonth),
              lte(TransactionTable.date, lastDayOfMonth)
            ),
            columns: { id: true, name: true, price: true, type: true },
          },
        },
      },
    },
  });
}
