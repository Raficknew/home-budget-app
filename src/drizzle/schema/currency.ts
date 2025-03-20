import { pgTable, text } from "drizzle-orm/pg-core";

export const CurrencyTable = pgTable("currency", {
  code: text().primaryKey(),
});
