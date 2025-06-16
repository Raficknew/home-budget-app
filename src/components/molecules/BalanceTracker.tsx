import { Wallet05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ExpenseProgressBar } from "./ExpenseProgressBar";
import { useFormatPrice } from "@/lib/formatters";
import { useTranslations } from "next-intl";
import { Prices } from "@/global/types";

export function BalanceTracker({
  currency,
  prices,
}: {
  currency: string;
  prices: Prices;
}) {
  const formattedPrice = useFormatPrice(prices.balance, currency);
  const t = useTranslations("Dashboard.ExpenseTracker");
  return (
    <div className="flex flex-col 2xl:w-1/6 w-full gap-7 bg-card p-5 rounded-lg h-full">
      <div className="flex gap-2 items-center">
        <HugeiconsIcon icon={Wallet05Icon} />
        <h4 className="text-xl">{t("balance")}</h4>
      </div>
      <h2 className="font-semibold text-2xl">{formattedPrice}</h2>
      <ExpenseProgressBar
        totalInTransactions={prices.totalInTransactions}
        categoriesCounted={prices}
        currency={currency}
      />
    </div>
  );
}
