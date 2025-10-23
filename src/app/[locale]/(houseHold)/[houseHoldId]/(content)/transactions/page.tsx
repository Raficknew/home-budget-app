import { getCategoriesWithTransactions, getHousehold } from "@/global/actions";
import { notFound } from "next/navigation";
import { TransactionTable } from "@/components/molecules/TransactionTable";
import { HugeiconsIcon } from "@hugeicons/react";
import { ScratchCardIcon } from "@hugeicons/core-free-icons";

export default async function HouseholdTransactionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ householdId: string }>;
  searchParams: Promise<{ date?: Date }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  if (household == null) notFound();

  const { date } = await searchParams;
  const currentDate = date ? date : new Date();

  const categories =
    (await getCategoriesWithTransactions(householdId, currentDate)) || [];

  const allTransactions = categories.flatMap((cat) =>
    cat.transactions.map((transaction) => ({
      ...transaction,
      categoryName: cat.name,
    }))
  );

  return (
    <div className="w-full bg-sidebar rounded-sm p-10">
      <div className="flex items-center gap-2">
        <HugeiconsIcon strokeWidth={2} icon={ScratchCardIcon} />
        <h1 className="sm:text-2xl text-xl font-light">Wszystkie Transakcje</h1>
      </div>
      <TransactionTable
        transactions={allTransactions}
        members={household.members}
        currency={household.currencyCode}
      />
    </div>
  );
}
