import { CategoryWithTransactions } from "@/global/types";
import { TransactionDialog } from "@/features/transactions/components/TransactionDialog";
import { getMembers } from "@/global/functions";
import { TransactionBarChart } from "@/components/molecules/TransactionBarChart";
import { Price } from "@/components/atoms/Price";

export async function FinancialSummaryChart({
  maxValue,
  categories,
  defaultTransaction,
  title,
  householdId,
  gradient,
  currency,
}: {
  maxValue: number;
  categories: CategoryWithTransactions;
  defaultTransaction: string;
  title: string;
  householdId: string;
  gradient: string;
  currency: string;
}) {
  const members = await getMembers(householdId);
  return (
    <div className="flex relative bg-card rounded-lg md:p-4 gap-10 justify-between 2xl:w-1/2 w-full md:h-[300px] h-[150px]">
      <div className="w-full z-10 ml-4 mt-4 md:m-0">
        <p className="text-2xl font-light">{title}</p>
        <Price
          className="text-3xl font-medium"
          price={maxValue}
          currency={currency}
        />
      </div>
      <div className="z-10 hidden md:block">
        <TransactionBarChart
          title={title}
          categories={categories}
          maxValue={maxValue}
          members={members}
        />
      </div>
      <div className="flex items-start w-full justify-end z-10">
        <TransactionDialog
          householdId={householdId}
          defaultTransaction={defaultTransaction}
        />
      </div>
      <div
        className="absolute inset-0 z-1 w-full h-full"
        style={{
          background: gradient,
          opacity: 1,
        }}
      />
    </div>
  );
}
