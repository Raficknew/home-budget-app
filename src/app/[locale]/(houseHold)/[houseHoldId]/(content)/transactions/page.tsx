import { getCategoriesWithTransactions, getHousehold } from "@/global/actions";
import { notFound } from "next/navigation";
import { PaginationTransactionTable } from "@/components/organisms/PaginationTransactionTable";

export default async function HouseholdTransactionsPage({
  params,
  searchParams,
}: {
  params: { householdId: string };
  searchParams: { date?: string };
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  if (household == null) notFound();

  const { date } = await searchParams;
  const currentDate = date ? new Date(date) : new Date();

  const categories =
    (await getCategoriesWithTransactions(householdId, currentDate)) || [];

  const allTransactions = categories.flatMap((cat) =>
    cat.transactions.map((transaction) => ({
      ...transaction,
      categoryName: cat.name,
    }))
  );

  const sortedTransactions = allTransactions.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="w-full bg-sidebar rounded-sm p-4">
      {sortedTransactions.length > 0 ? (
        <PaginationTransactionTable
          householdId={householdId}
          transactions={sortedTransactions}
          members={household.members}
          currencyCode={household.currencyCode}
        />
      ) : (
        <p>Nie masz jeszcze żadnych transakcji w tym miesiącu.</p>
      )}
    </div>
  );
}
