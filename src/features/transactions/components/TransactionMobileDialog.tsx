import { MobileOverlay } from "@/components/MobileOverlay";
import { TransactionForm } from "./TransactionsForm";
import { getCategoriesIdsAndNames, getMembers } from "@/global/functions";

export async function TransactionMobileDialog({
  defaultTransaction,
  householdId,
}: {
  defaultTransaction: string;
  householdId: string;
}) {
  const members = await getMembers(householdId);
  const categories = await getCategoriesIdsAndNames(householdId);
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
