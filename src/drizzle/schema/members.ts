import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { HouseHoldTable } from "./houseHold";
import { users } from "./user";

export const MembersTable = pgTable("members", {
  id,
  name: text(),
  userId: uuid().references(() => users.id, { onDelete: "cascade" }),
  houseHoldId: uuid()
    .notNull()
    .references(() => HouseHoldTable.id, { onDelete: "cascade" }),
  color: text().notNull(),
  createdAt,
  updatedAt,
});

export const MembersRelationships = relations(MembersTable, ({ one }) => ({
  user: one(users, {
    fields: [MembersTable.userId],
    references: [users.id],
  }),
  houseHold: one(HouseHoldTable, {
    fields: [MembersTable.houseHoldId],
    references: [HouseHoldTable.id],
  }),
}));
