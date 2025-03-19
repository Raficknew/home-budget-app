import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CategoryTable } from "./category";
import { MembersTable } from "./members";
import { UserTable } from "./user";
import { CurrencyTable } from "./currency";

export const HouseHoldTable = pgTable("houseHolds", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  ownerId: uuid().references(() => UserTable.id, { onDelete: "cascade" }),
  currencyId: uuid().references(() => CurrencyTable.id),
  createdAt,
  updatedAt,
});

export const HouseHoldRelationships = relations(
  HouseHoldTable,
  ({ one, many }) => ({
    members: many(MembersTable),
    categories: many(CategoryTable),
    user: one(UserTable, {
      fields: [HouseHoldTable.ownerId],
      references: [UserTable.id],
    }),
    currency: one(CurrencyTable, {
      fields: [HouseHoldTable.currencyId],
      references: [CurrencyTable.id],
    }),
  })
);
