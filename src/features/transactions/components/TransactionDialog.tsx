import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { TransactionForm } from "./TransactionsForm";
import { getMembers, getCategoriesIdsAndNames } from "@/global/functions";

export async function TransactionDialog({
  defaultTransaction,
  householdId,
}: {
  defaultTransaction: string;
  householdId: string;
}) {
  const members = await getMembers(householdId);
  const categories = await getCategoriesIdsAndNames(householdId);
  return (
    <Dialog defaultOpen>
      <DialogTrigger>Dodaj</DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <TransactionForm
          categories={categories}
          members={members}
          defaultTransaction={defaultTransaction}
        />
      </DialogContent>
    </Dialog>
  );
}
