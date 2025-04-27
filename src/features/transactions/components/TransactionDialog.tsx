import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { TransactionForm } from "./TransactionsForm";
import { getMembers, getCategories } from "@/global/functions";

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
      <DialogTrigger className="md:block hidden">Dodaj</DialogTrigger>
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
