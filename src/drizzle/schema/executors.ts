import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { HouseHoldTable } from "./houseHold";
import { UserTable } from "./user";
import { TransactionTable } from "./transactions";

export const executorRole = ["admin", "moderator", "member"] as const;
export type ExecutorRole = (typeof executorRole)[number];
export const executorRoleEnum = pgEnum("executor_role", executorRole);

export const ExecutorTable = pgTable("executors", {
  id,
  name: text(),
  userId: text().references(() => UserTable.id, { onDelete: "cascade" }),
  houseHoldId: text()
    .notNull()
    .references(() => HouseHoldTable.id, { onDelete: "cascade" }),
  role: executorRoleEnum().notNull().default("member"),
  createdAt,
  updatedAt,
});

export const ExecutorRelationships = relations(
  ExecutorTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [ExecutorTable.userId],
      references: [UserTable.id],
    }),
    houseHold: one(HouseHoldTable, {
      fields: [ExecutorTable.houseHoldId],
      references: [HouseHoldTable.id],
    }),
    transactions: many(TransactionTable),
  })
);
