import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { HouseholdTable } from "./household";
import { users } from "./user";

export const MembersTable = pgTable("members", {
  id,
  name: text(),
  userId: uuid().references(() => users.id, { onDelete: "cascade" }),
  householdId: uuid()
    .notNull()
    .references(() => HouseholdTable.id, { onDelete: "cascade" }),
  color: text().notNull(),
  createdAt,
  updatedAt,
});

export const MembersRelationships = relations(MembersTable, ({ one }) => ({
  user: one(users, {
    fields: [MembersTable.userId],
    references: [users.id],
  }),
  household: one(HouseholdTable, {
    fields: [MembersTable.householdId],
    references: [HouseholdTable.id],
  }),
}));
