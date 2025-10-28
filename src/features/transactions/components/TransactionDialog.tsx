"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { TransactionForm } from "@/features/transactions/components/TransactionsForm";
import { Category, Member, Transaction } from "@/global/types";
import { useState } from "react";

export function TransactionDialog({
  defaultTransactionType,
  householdId,
  children,
  transaction,
  categories,
  members,
}: {
  defaultTransactionType: string;
  householdId: string;
  children: React.ReactNode;
  transaction?: Transaction;
  categories: Category[];
  members: Member[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <TransactionForm
          householdId={householdId}
          categories={categories}
          members={members}
          transaction={transaction}
          defaultTransactionType={defaultTransactionType}
          onUpdateSuccess={transaction && (() => setIsOpen(false))}
        />
      </DialogContent>
    </Dialog>
  );
}
