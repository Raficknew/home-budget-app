"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormattedDate } from "@/lib/formatters";
import { useTranslations } from "next-intl";
import { Price } from "@/components/atoms/Price";
import { UserAvatar } from "@/components/atoms/UserAvatar";
import { Category, Member, Transaction } from "@/global/types";
import { Cancel01Icon, PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { TransactionDialog } from "@/features/transactions/components/TransactionDialog";
import { DialogTrigger } from "../ui/dialog";

export function TransactionTable({
  transactions,
  members,
  currency,
  householdId,
  categories,
}: {
  transactions: Transaction[];
  members: Member[];
  currency: string;
  householdId: string;
  categories: Category[];
}) {
  const t = useTranslations("TransactionTable");
  const { formatDate } = useFormattedDate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("actions")}</TableHead>
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("date")}</TableHead>
          <TableHead>{t("member")}</TableHead>
          <TableHead>{t("category")}</TableHead>
          <TableHead>{t("type")}</TableHead>
          <TableHead className="text-right">{t("price")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="flex gap-1 justify-center items-center h-full">
              <TransactionDialog
                householdId={householdId}
                transaction={transaction}
                defaultTransactionType={transaction.type}
                members={members}
                categories={categories}
              >
                <DialogTrigger>
                  <HugeiconsIcon
                    className="cursor-pointer"
                    icon={PencilEdit02Icon}
                  />
                </DialogTrigger>
              </TransactionDialog>
              <HugeiconsIcon
                className="cursor-pointer text-red-400"
                icon={Cancel01Icon}
              />
            </TableCell>
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
  );
}
