import { Wallet05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ExpenseProgressBar } from "./molecules/ExpenseProgressBar";

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

export function BalanceTracker({
  balance,
  currency,
  categories,
}: {
  balance: number;
  currency: string;
  categories: Category;
}) {
  return (
    <div className="flex flex-col gap-7 bg-card p-5 rounded-lg">
      <div className="flex gap-2 items-center">
        <HugeiconsIcon icon={Wallet05Icon} />
        <h4 className="text-xl">Saldo</h4>
      </div>
      <h2 className="font-semibold text-2xl">
        {balance} {currency}
      </h2>
      <ExpenseProgressBar balance={balance} categories={categories} />
    </div>
  );
}
