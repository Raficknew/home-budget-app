import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { HouseHoldTable } from "./houseHold";
import { UserTable } from "./user";

export const MembersTable = pgTable("members", {
  id,
  name: text(),
  userId: uuid().references(() => UserTable.id, { onDelete: "cascade" }),
  houseHoldId: uuid()
    .notNull()
    .references(() => HouseHoldTable.id, { onDelete: "cascade" }),
  color: text().notNull(),
  createdAt,
  updatedAt,
});

export const MembersRelationships = relations(MembersTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [MembersTable.userId],
    references: [UserTable.id],
  }),
  houseHold: one(HouseHoldTable, {
    fields: [MembersTable.houseHoldId],
    references: [HouseHoldTable.id],
  }),
}));
