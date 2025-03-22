import { pgTable, uuid } from "drizzle-orm/pg-core";
import { HouseHoldTable } from "./houseHold";
import { relations } from "drizzle-orm";

export const InviteTable = pgTable("invite_table", {
  link: uuid().primaryKey().defaultRandom(),
  houseHoldId: uuid()
    .notNull()
    .references(() => HouseHoldTable.id, { onDelete: "cascade" }),
});

export const InviteRelationships = relations(InviteTable, ({ one }) => ({
  houseHold: one(HouseHoldTable, {
    fields: [InviteTable.houseHoldId],
    references: [HouseHoldTable.id],
  }),
}));
