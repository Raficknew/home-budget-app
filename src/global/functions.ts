import { db } from "@/drizzle";
import { CategoryTable, CurrencyTable, MembersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidGenerate } from "uuid";
import { CategoryWithTransactions } from "./types";

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

export const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

export const countPricesOfTransactionsRelatedToTheirTypes = (
  categories: CategoryWithTransactions
) => {
  let fixed = 0;
  let fun = 0;
  let future_you = 0;
  let incomes = 0;

  categories.map((category) => {
    switch (category.categoryType) {
      case "fixed":
        category.transactions.map((t) => {
          fixed += t.price;
        });
        break;
      case "fun":
        category.transactions.map((t) => {
          fun += t.price;
        });
        break;
      case "future you":
        category.transactions.map((t) => {
          future_you += t.price;
        });
        break;
      case "incomes":
        category.transactions.map((t) => {
          incomes += t.price;
        });
        break;
    }
  });

  const balance = incomes - (fixed + fun + future_you);
  const totalInTransactions = fixed + fun + future_you + incomes;

  return { fixed, fun, future_you, incomes, balance, totalInTransactions };
};
