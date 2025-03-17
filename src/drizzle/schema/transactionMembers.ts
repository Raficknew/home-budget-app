import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { TransactionTable } from "./transactions";
import { relations } from "drizzle-orm";
import { MembersTable } from "./members";

export const TransactionMembersTable = pgTable(
  "transaction_members",
  {
    transactionId: uuid()
      .notNull()
      .references(() => TransactionTable.id, { onDelete: "cascade" }),
    memberId: uuid()
      .notNull()
      .references(() => MembersTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.transactionId, t.memberId] })]
);

export const TransactionMembersRelationships = relations(
  TransactionMembersTable,
  ({ one }) => ({
    transaction: one(TransactionTable, {
      fields: [TransactionMembersTable.transactionId],
      references: [TransactionTable.id],
    }),
    member: one(MembersTable, {
      fields: [TransactionMembersTable.memberId],
      references: [MembersTable.id],
    }),
  })
);
