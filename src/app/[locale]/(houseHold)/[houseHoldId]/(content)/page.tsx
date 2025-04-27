import { db } from "@/drizzle";
import { HouseholdTable } from "@/drizzle/schema";
import { TransactionDialog } from "@/features/transactions/components/TransactionDialog";
import { TransactionMobileDialog } from "@/features/transactions/components/TransactionMobileDialog";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate as validateUuid } from "uuid";

export default async function HouseholdPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  if (household == null) {
    notFound();
  }

  return (
    <div>
      <p>Balance: {household.balance}</p>
      <div>
        <TransactionDialog
          defaultTransaction="expense"
          householdId={householdId}
        />
        <TransactionMobileDialog
          defaultTransaction="expense"
          householdId={householdId}
        />
      </div>
      {household.categories.map((category) => (
        <div key={category.id}>
          {category.name}
          <div>
            {category.transactions.map((t) => (
              <div key={t.id}>
                {t.name} {t.price}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getHousehold(id: string) {
  if (!validateUuid(id)) {
    return null;
  }

  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      currency: { columns: { code: true } },
      categories: {
        with: {
          transactions: { columns: { id: true, name: true, price: true } },
        },
      },
    },
  });
}
