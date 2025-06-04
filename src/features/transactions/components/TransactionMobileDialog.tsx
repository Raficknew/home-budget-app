import { MobileOverlay } from "@/components/atoms/MobileOverlay";
import { TransactionForm } from "./TransactionsForm";
import { getCategories, getMembers } from "@/global/functions";

export async function TransactionMobileDialog({
  defaultTransaction,
  householdId,
}: {
  defaultTransaction: string;
  householdId: string;
}) {
  const members = await getMembers(householdId);
  const categories = await getCategories(householdId);
  return (
    <MobileOverlay>
      <TransactionForm
        householdId={householdId}
        categories={categories}
        members={members}
        defaultTransaction={defaultTransaction}
      />
    </MobileOverlay>
  );
}
