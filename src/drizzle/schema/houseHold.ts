import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CategoryTable } from "./category";
import { MembersTable } from "./members";
import { CurrencyTable } from "./currency";
import { InviteTable } from "./invites";
import { users } from "./user";

export const HouseholdTable = pgTable("households", {
  id,
  name: text().notNull(),
  description: text(),
  ownerId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  currencyCode: text()
    .references(() => CurrencyTable.code, { onDelete: "no action" })
    .notNull(),
  createdAt,
  updatedAt,
});

export const HouseholdRelationships = relations(
  HouseholdTable,
  ({ one, many }) => ({
    members: many(MembersTable),
    categories: many(CategoryTable),
    user: one(users, {
      fields: [HouseholdTable.ownerId],
      references: [users.id],
    }),
    currency: one(CurrencyTable, {
      fields: [HouseholdTable.currencyCode],
      references: [CurrencyTable.code],
    }),
    invite: one(InviteTable),
  })
);
