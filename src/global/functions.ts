import { db } from "@/drizzle";
import { HouseholdTable,
  TransactionTable,CategoryTable, CurrencyTable, MembersTable } from "@/drizzle/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { v4 as uuidGenerate } from "uuid";
import { validate as validateUuid } from "uuid";
import { CategoryWithTransactions } from "./types";
import { endOfMonth, startOfMonth } from "date-fns";

export function getHousehold(id: string) {
  if (!validateUuid(id)) {
    return null;
  }

  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      currency: { columns: { code: true } },
      members: {
        where: eq(MembersTable.householdId, id),
        with: { user: true },
      },
    },
  });
}

export function getCategoriesWithTransactions(householdId: string, date: Date) {
  if (!validateUuid(householdId) && date == null) {
    return null;
  }

  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  return db.query.CategoryTable.findMany({
    where: eq(CategoryTable.householdId, householdId),
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
              memberId: true,
            },
          },
        },
}) 
}


export const getCurrencies = () => {
  return db.selectDistinct().from(CurrencyTable);
};

export const getMembers = (id: string) => {
  return db.query.MembersTable.findMany({
    where: eq(MembersTable.householdId, id),
    columns: { id: true, name: true },
    with: { user: { columns: { id: true, image: true } } },
  });
};

export const getCategories = (id: string) => {
  return db.query.CategoryTable.findMany({
    where: eq(CategoryTable.householdId, id),
    columns: { id: true, name: true, categoryType: true, icon: true },
  });
};

export const createUuid = (): string => {
  return uuidGenerate();
};

export const countPricesOfTransactionsRelatedToTheirTypes = (
  categories: CategoryWithTransactions
) => {
  const sums = {
    fixed: 0,
    fun: 0,
    future_you: 0,
    incomes: 0,
  };

  categories.forEach((category) => {
    const typeKey =
      category.categoryType === "future you"
        ? "future_you"
        : category.categoryType;
    if (sums.hasOwnProperty(typeKey)) {
      category.transactions.forEach((t) => {
        sums[typeKey] += t.price;
      });
    }
  });

  const balance = sums.incomes - (sums.fixed + sums.fun + sums.future_you);
  const totalInTransactions =
    sums.fixed + sums.fun + sums.future_you + sums.incomes;
  const totalInExpenses = sums.fixed + sums.fun + sums.future_you;

  return {
    ...sums,
    balance,
    totalInTransactions,
    totalInExpenses,
  };
};
