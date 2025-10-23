"use client";
import { Member, Transaction } from "@/global/types";
import { TransactionTable } from "@/components/molecules/TransactionTable";
import { HugeiconsIcon } from "@hugeicons/react";
import { ScratchCardIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaginationTransactionTable({
  transactions,
  members,
  currencyCode,
}: {
  transactions: Transaction[];
  members: Member[];
  currencyCode: string;
}) {
  const [currentShowingTransactions, setCurrentShowingTransactions] = useState<
    Transaction[]
  >(transactions.slice(0, 15));
  const pages = Math.ceil(transactions.length / 15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCurrentShowingTransactions(
      transactions.slice((pageNumber - 1) * 15, pageNumber * 15)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <HugeiconsIcon strokeWidth={2} icon={ScratchCardIcon} />
          <h1 className="sm:text-2xl text-xl font-light">
            Wszystkie Transakcje
          </h1>
        </div>
        <div className="flex gap-2">
          {pages > 1 && (
            <Select
              value={String(currentPage)}
              onValueChange={(value: string) => handlePageChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder={String(currentPage)} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <TransactionTable
        transactions={currentShowingTransactions}
        members={members}
        currency={currencyCode}
      />
    </div>
  );
}
