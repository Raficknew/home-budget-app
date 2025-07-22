import { BalanceTracker } from "@/components/molecules/BalanceTracker";
import { RecentTransactionTable } from "@/components/molecules/RecentTransactionTable";
import { ExpensesLineChart } from "@/components/organisms/ExpensesLineChart";
import { FinancialSummaryChart } from "@/components/organisms/FinancialSummaryChart";
import { db } from "@/drizzle";
import {
  CategoryTable,
  HouseholdTable,
  MembersTable,
  TransactionTable,
} from "@/drizzle/schema";
import { countPricesOfTransactionsRelatedToTheirTypes } from "@/global/functions";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("Dashboard.charts");

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
            maxValue={prices.totalInExpenses}
            date={parsedDate}
            categories={household.categories}
            title={t("expenses")}
          />
        </Suspense>
      </div>
      <div className="flex flex-col gap-2 2xl:flex-row">
        <FinancialSummaryChart
          title={t("incomes")}
          householdId={household.id}
          defaultTransaction="income"
          maxValue={prices.incomes}
          categories={household.categories.filter(
            (c) => c.categoryType == "incomes"
          )}
          gradient="radial-gradient(ellipse at bottom, #00C48C30 0%, #21212266 100%)"
        />
        <FinancialSummaryChart
          title={t("expenses")}
          householdId={household.id}
          defaultTransaction="expense"
          maxValue={prices.totalInExpenses}
          categories={household.categories.filter(
            (c) => c.categoryType != "incomes"
          )}
          gradient="radial-gradient(ellipse at bottom, #F83B3B4D 0%, #21212266 100%)"
        />
      </div>
      <RecentTransactionTable
        categories={household.categories}
        members={household.members}
        currency={household.currencyCode}
      />
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
            with: { members: { columns: { memberId: true } } },
          },
        },
      },
      members: {
        where: eq(MembersTable.householdId, id),
        with: { user: true },
      },
    },
  });
}
