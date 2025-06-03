import { Wallet05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ExpenseProgressBar } from "./molecules/ExpenseProgressBar";
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

export function BalanceTracker({
  balance,
  currency,
  categories,
}: {
  balance: number;
  currency: string;
  categories: Category;
}) {
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
        balance={balance}
        categories={categories}
        currency={currency}
      />
    </div>
  );
}
