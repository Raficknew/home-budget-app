import { BalanceTracker } from "@/components/molecules/BalanceTracker";
import { ExpensesLineChart } from "@/components/organisms/ExpensesLineChart";
import { FinancialSummaryChart } from "@/components/organisms/FinancialSummaryChart";
import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseholdTable,
  TransactionTable,
} from "@/drizzle/schema";
import { countPricesOfTransactionsRelatedToTheirTypes } from "@/global/functions";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { validate as validateUuid } from "uuid";

export default async function HouseholdPage({
  params,
  searchParams,
}: {
  params: Promise<{ householdId: string }>;
  searchParams: Promise<{ date: string }>;
}) {
  const { householdId } = await params;
  const { date } = await searchParams;
  const parsedDate = date ? new Date(date) : new Date();
  const household = await getHousehold(householdId, parsedDate);

  if (household == null) notFound();

  const prices = await countPricesOfTransactionsRelatedToTheirTypes(
    household?.categories
  );

  if (household == null) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 2xl:flex-row">
        <BalanceTracker currency={household.currencyCode} prices={prices} />
        <Suspense>
          <ExpensesLineChart
            maxValue={prices.totalInTransactions}
            date={parsedDate}
            categories={household.categories}
          />
        </Suspense>
      </div>
      <div className="flex flex-col 2xl:flex-row gap-2">
        <FinancialSummaryChart
          title="Przychód"
          householdId={household.id}
          defaultTransaction="income"
          maxValue={prices.incomes}
          categories={household.categories}
        />
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
            columns: {
              id: true,
              name: true,
              price: true,
              type: true,
              date: true,
            },
          },
        },
      },
    },
  });
}
