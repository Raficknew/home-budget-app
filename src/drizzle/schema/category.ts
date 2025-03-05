import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { HouseHoldTable } from "./houseHold";
import { relations } from "drizzle-orm";
import { TransactionTable } from "./transactions";

export const categoriesOfExpanse = ["fixed", "fun", "future you"] as const;
export type CategoriesOfExpanse = (typeof categoriesOfExpanse)[number];
export const categoryOfExpanseEnum = pgEnum(
  "category_of_expanse",
  categoriesOfExpanse
);

export const CategoryTable = pgTable("categories", {
  id,
  name: text().notNull(),
  categoryType: categoryOfExpanseEnum().notNull(),
  houseHoldId: uuid()
    .notNull()
    .references(() => HouseHoldTable.id),
  createdAt,
  updatedAt,
});

export const CategoryRelationships = relations(
  CategoryTable,
  ({ one, many }) => ({
    houseHold: one(HouseHoldTable, {
      fields: [CategoryTable.houseHoldId],
      references: [HouseHoldTable.id],
    }),
    transactions: many(TransactionTable),
  })
);
