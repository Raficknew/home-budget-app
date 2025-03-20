import { db } from ".";
import { CurrencyTable } from "./schema";
import { count } from "drizzle-orm";

const main = async () => {
  const rows: { count: number }[] = await db
    .select({ count: count() })
    .from(CurrencyTable);

  if ((rows[0]?.count ?? 0) > 0) {
    throw new Error("Currencies already seeded");
  }

  const data: (typeof CurrencyTable.$inferInsert)[] = [
    {
      code: "PLN",
    },
    {
      code: "EUR",
    },
    { code: "USD" },
    {
      code: "CHF",
    },
  ];

  console.log("Seed start");
  await db.insert(CurrencyTable).values(data);
  console.log("Seed done");
};

main();
