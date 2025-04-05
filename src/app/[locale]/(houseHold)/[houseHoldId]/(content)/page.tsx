import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate as validateUuid } from "uuid";

export default async function HouseholdPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const houseHold = await getHouseHold(householdId);

  if (houseHold == null) {
    notFound();
  }

  return (
    <div className=" mx-6">
      <p>{houseHold.currency.code}</p>
      {houseHold.categories.map((category) => (
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

function getHouseHold(id: string) {
  if (!validateUuid(id)) {
    return null;
  }

  return db.query.HouseHoldTable.findFirst({
    where: eq(HouseHoldTable.id, id),
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
