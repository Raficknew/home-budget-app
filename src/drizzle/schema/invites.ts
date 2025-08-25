import { pgTable, uuid } from "drizzle-orm/pg-core";
import { HouseholdTable } from "./houseHold";
import { relations } from "drizzle-orm";

export const InviteTable = pgTable("invite_table", {
  link: uuid().primaryKey().defaultRandom(),
  householdId: uuid()
    .notNull()
    .references(() => HouseholdTable.id, { onDelete: "cascade" }),
});

export const InviteRelationships = relations(InviteTable, ({ one }) => ({
  household: one(HouseholdTable, {
    fields: [InviteTable.householdId],
    references: [HouseholdTable.id],
  }),
}));
