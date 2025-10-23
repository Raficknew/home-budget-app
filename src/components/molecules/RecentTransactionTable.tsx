import { LinkSquare01Icon, ScratchCardIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CategoryWithTransactions, Member } from "@/global/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { TransactionTable } from "./TransactionTable";

export function RecentTransactionTable({
  categories,
  members,
  currency,
  link,
}: {
  categories: CategoryWithTransactions;
  members: Member[];
  currency: string;
  link: string;
}) {
  const allTransactions = categories.flatMap((cat) =>
    cat.transactions.map((transaction) => ({
      ...transaction,
      categoryName: cat.name,
    }))
  );

  const sortedTransactions = allTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentTransactions = sortedTransactions.slice(0, 10);

  const t = useTranslations("TransactionTable");

  return (
    <div className="flex flex-col p-4 bg-sidebar rounded-lg h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HugeiconsIcon strokeWidth={2} icon={ScratchCardIcon} />
          <h1 className="sm:text-2xl text-xl font-light">{t("latest")}</h1>
        </div>
        <Link
          href={link}
          className="flex items-center justify-center gap-2 hover:underline cursor-pointer"
        >
          <span className="text-sm sm:block hidden font-extralight ">
            Zobacz więcej
          </span>
          <HugeiconsIcon strokeWidth={2} size={16} icon={LinkSquare01Icon} />
        </Link>
      </div>
      <TransactionTable
        transactions={recentTransactions}
        members={members}
        currency={currency}
      />
    </div>
  );
}
