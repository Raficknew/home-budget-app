import { date, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, statusEnum, updatedAt } from "../schemaHelpers";
import { ExecutorTable } from "./executors";
import { relations } from "drizzle-orm";
import { CategoryTable } from "./category";

export const transactionType = ["income", "expense"] as const;
export type TransactionType = (typeof transactionType)[number];
export const transactionTypeEnum = pgEnum("transaction_type", transactionType);

export const TransactionTable = pgTable("transactions", {
  id,
  name: text().notNull(),
  description: text(),
  type: transactionTypeEnum().notNull(),
  status: statusEnum().notNull().default("public"),
  categoryId: text().references(() => CategoryTable.id, {
    onDelete: "cascade",
  }),
  price: integer().notNull(),
  executorIds: text()
    .array()
    .notNull()
    .references(() => ExecutorTable.id, { onDelete: "cascade" }),
  date: date().notNull(),
  createdAt,
  updatedAt,
});

export const TransactionRelationshoips = relations(
  TransactionTable,
  ({ one }) => ({
    category: one(CategoryTable, {
      fields: [TransactionTable.categoryId],
      references: [CategoryTable.id],
    }),
    executors: one(ExecutorTable, {
      fields: [TransactionTable.executorIds],
      references: [ExecutorTable.id],
    }),
  })
);
