import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CategoryTable } from "./category";
import { MembersTable } from "./members";

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
  memberId: uuid()
    .notNull()
    .references(() => MembersTable.id, { onDelete: "cascade" }),
  price: doublePrecision().notNull(),
  date: timestamp().notNull(),
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
    member: one(MembersTable, {
      fields: [TransactionTable.memberId],
      references: [MembersTable.id],
    }),
  })
);
