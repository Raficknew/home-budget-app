import { Wallet05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ExpenseProgressBar } from "./ExpenseProgressBar";
import { useFormatPrice } from "@/lib/formatters";
import { useTranslations } from "next-intl";

type Category = {
  name: string;
  id: string;
  icon: string;
  categoryType: "fixed" | "fun" | "future you" | "incomes";
  createdAt: Date;
  updatedAt: Date;
  householdId: string;
  transactions: {
    name: string;
    id: string;
    type: "income" | "expense";
    price: number;
  }[];
}[];

const countPricesOfTransactionsRelatedToTheirTypes = (categories: Category) => {
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

  return { fixed, fun, future_you, incomes };
};

export function BalanceTracker({
  currency,
  categories,
}: {
  currency: string;
  categories: Category;
}) {
  const prices = countPricesOfTransactionsRelatedToTheirTypes(categories);
  const balance =
    prices.incomes - (prices.fixed + prices.fun + prices.future_you);
  const totalInTransactions =
    prices.fixed + prices.fun + prices.future_you + prices.incomes;
  const formattedPrice = useFormatPrice(balance, currency);
  const t = useTranslations("Dashboard.ExpenseTracker");
  return (
    <div className="flex flex-col w-full gap-7 bg-card p-5 rounded-lg">
      <div className="flex gap-2 items-center">
        <HugeiconsIcon icon={Wallet05Icon} />
        <h4 className="text-xl">{t("balance")}</h4>
      </div>
      <h2 className="font-semibold text-2xl">{formattedPrice}</h2>
      <ExpenseProgressBar
        totalInTransactions={totalInTransactions}
        categoriesCounted={prices}
        currency={currency}
      />
    </div>
  );
}
