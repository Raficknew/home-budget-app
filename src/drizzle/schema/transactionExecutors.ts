import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { ExecutorTable } from "./executors";
import { TransactionTable } from "./transactions";
import { relations } from "drizzle-orm";

export const TranscationExecutorsTable = pgTable(
  "transaction_executors",
  {
    transactionId: text()
      .notNull()
      .references(() => TransactionTable.id, { onDelete: "cascade" }),
    executorId: text()
      .notNull()
      .references(() => ExecutorTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.transactionId, t.executorId] })]
);

export const TransactionExecutorsRelationships = relations(
  TranscationExecutorsTable,
  ({ one }) => ({
    transaction: one(TransactionTable, {
      fields: [TranscationExecutorsTable.transactionId],
      references: [TransactionTable.id],
    }),
    executor: one(ExecutorTable, {
      fields: [TranscationExecutorsTable.executorId],
      references: [ExecutorTable.id],
    }),
  })
);
