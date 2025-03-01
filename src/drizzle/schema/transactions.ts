import { date, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { ExecutorTable } from "./executors";
import { relations } from "drizzle-orm";

export const transactionType = ["income", "expense"] as const;
export type TransactionType = (typeof transactionType)[number];
export const transactionTypeEnum = pgEnum("transaction_type", transactionType);

export const TransactionTable = pgTable("transactions", {
  id,
  name: text().notNull(),
  description: text(),
  type: transactionTypeEnum().notNull(),
  categoryId: text().references(() => CategoryTable.id, {
    onDelete: "cascade",
  }),
  priceInPln: text().notNull(),
  executorId: text().notNull().references(() => ExecutorTable.id, {onDelete: "cascade"}),
  date: date({ with}),
  createdAt,
  updatedAt,
});

export const TransactionRelationshoips = relations(TransactionTable, ({one}))
