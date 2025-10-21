import { LinkSquare01Icon, ScratchCardIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryWithTransactions } from "@/global/types";
import { useFormattedDate } from "@/lib/formatters";
import { Member } from "@/features/members/components/Member";
import { UserAvatar } from "../atoms/UserAvatar";
import { useTranslations } from "next-intl";
import { Price } from "../atoms/Price";
import Link from "next/link";

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

  const { formatDate } = useFormattedDate();

  const t = useTranslations("TransactionTable");

  return (
    <div className="flex flex-col p-4 bg-sidebar rounded-lg h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HugeiconsIcon strokeWidth={2} icon={ScratchCardIcon} />
          <p className="sm:text-2xl text-xl font-light">{t("latest")}</p>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("name")}</TableHead>
            <TableHead>{t("date")}</TableHead>
            <TableHead>{t("member")}</TableHead>
            <TableHead>{t("category")}</TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead className="text-right">{t("price")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.name}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>
                {(() => {
                  const memberId = transaction.memberId;
                  const member = members.find((m) => m.id === memberId);
                  return member ? (
                    <div className="flex items-center gap-2">
                      <UserAvatar image={member.user?.image} />
                      {member.name}
                    </div>
                  ) : (
                    "Brak"
                  );
                })()}
              </TableCell>
              <TableCell>{transaction.categoryName}</TableCell>
              <TableCell>{t(transaction.type)}</TableCell>
              <TableCell className="text-right">
                {(() => {
                  const isIncome = transaction.type === "income";
                  const sign = isIncome ? "+" : "-";
                  const color = isIncome ? "text-green-400" : "text-red-400";

                  return (
                    <div className={color}>
                      <span className="inline-block">{sign}</span>
                      <Price
                        className="inline-block"
                        currency={currency}
                        price={transaction.price}
                      />
                    </div>
                  );
                })()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
