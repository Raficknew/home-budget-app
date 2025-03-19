import { pgTable, text } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";

export const CurrencyTable = pgTable("currency", {
  id,
  name: text().notNull(),
});
