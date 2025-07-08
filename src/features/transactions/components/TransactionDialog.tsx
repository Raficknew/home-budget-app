import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { TransactionForm } from "./TransactionsForm";
import { getMembers, getCategories } from "@/global/functions";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export async function TransactionDialog({
  defaultTransaction,
  householdId,
}: {
  defaultTransaction: string;
  householdId: string;
}) {
  const members = await getMembers(householdId);
  const categories = await getCategories(householdId);
  return (
    <Dialog>
      <DialogTrigger className="md:bg-[#7047EB] bg-[#0F0F0F] md:rounded-full rounded-r-xs px-5 py-2 text-xs flex items-center gap-1 cursor-pointer md:h-max h-full">
        <HugeiconsIcon
          className="md:size-5 size-10"
          icon={PlusSignIcon}
          strokeWidth={2}
        />
        <p className="md:block hidden">Dodaj</p>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <TransactionForm
          householdId={householdId}
          categories={categories}
          members={members}
          defaultTransaction={defaultTransaction}
        />
      </DialogContent>
    </Dialog>
  );
}
