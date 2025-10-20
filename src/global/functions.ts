import { v4 as uuidGenerate } from "uuid";
import { CategoryWithTransactions } from "@/global/types";

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

export const performFormSubmit = () => {};
