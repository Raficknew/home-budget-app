import { CategoryWithTransactions } from "@/global/types";
import { TransactionDialog } from "@/features/transactions/components/TransactionDialog";
import { getMembers } from "@/global/functions";
import { TransactionBarChart } from "./TransactionBarChart";

export async function FinancialSummaryChart({
  maxValue,
  categories,
  defaultTransaction,
  title,
  householdId,
}: {
  maxValue: number;
  categories: CategoryWithTransactions;
  defaultTransaction: string;
  title: string;
  householdId: string;
}) {
  const members = await getMembers(householdId);
  return (
    <div className="flex bg-sidebar rounded-lg p-4 justify-between">
      <div>
        <p className="text-2xl font-light">{title}</p>
        <p className="text-xl font-medium">{maxValue} PLN</p>
      </div>
      <div>
        <TransactionBarChart
          categories={categories}
          maxValue={maxValue}
          members={members}
        />
      </div>
      <div>
        <TransactionDialog
          householdId={householdId}
          defaultTransaction={defaultTransaction}
        />
      </div>
    </div>
  );
}
