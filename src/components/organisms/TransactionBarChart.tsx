import { Member } from "@/features/members/components/Member";
import { CategoryWithTransactions } from "@/global/types";

function assignTransactionPricesToMembers(
  members: Member[],
  categories: CategoryWithTransactions
) {
  const labels = members;
  const data = categories;
  return { labels, data };
}

export function TransactionBarChart({
  maxValue,
  members,
  categories,
}: {
  maxValue: number;
  members: Member[];
  categories: CategoryWithTransactions;
}) {
  const { labels, data } = assignTransactionPricesToMembers(
    members,
    categories
  );
  return <div>{maxValue}</div>;
}
