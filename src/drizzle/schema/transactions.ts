import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CategoryTable } from "./category";
import { TransactionMembersTable } from "./transactionMembers";

export const transactionType = ["income", "expense"] as const;
export type TransactionType = (typeof transactionType)[number];
export const transactionTypeEnum = pgEnum("transaction_type", transactionType);

export const TransactionTable = pgTable("transactions", {
  id,
  name: text().notNull(),
  type: transactionTypeEnum().notNull(),
  categoryId: uuid()
    .notNull()
    .references(() => CategoryTable.id, { onDelete: "cascade" }),
  price: integer().notNull(),
  date: timestamp().notNull(),
  balanceAfterTransaction: integer().notNull(),
  createdAt,
  updatedAt,
});

export const TransactionRelationshoips = relations(
  TransactionTable,
  ({ one, many }) => ({
    category: one(CategoryTable, {
      fields: [TransactionTable.categoryId],
      references: [CategoryTable.id],
    }),
    members: many(TransactionMembersTable),
  })
);
