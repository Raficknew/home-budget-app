import { db } from ".";
import { CurrencyTable } from "./schema";
import { count } from "drizzle-orm";

const main = async () => {
  const rows = await db.select({ count: count() }).from(CurrencyTable);

  if ((rows[0]?.count ?? 0) > 0) {
    return;
  }

  const data: (typeof CurrencyTable.$inferInsert)[] = [
    {
      name: "PLN",
    },
    {
      name: "EUR",
    },
    { name: "USD" },
    {
      name: "CHF",
    },
  ];

  console.log("Seed start");
  await db.insert(CurrencyTable).values(data);
  console.log("Seed done");
};

main();
