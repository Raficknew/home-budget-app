import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { HouseholdTable } from "./household";
import { TransactionTable } from "./transactions";

export const categoriesOfExpanse = [
  "fixed",
  "fun",
  "future you",
  "incomes",
] as const;
export type CategoriesOfExpanse = (typeof categoriesOfExpanse)[number];
export const categoryOfExpanseEnum = pgEnum(
  "categories_of_expanse",
  categoriesOfExpanse
);

export const CategoryTable = pgTable("categories", {
  id,
  name: text().notNull(),
  categoryType: categoryOfExpanseEnum().notNull(),
  householdId: uuid()
    .notNull()
    .references(() => HouseholdTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const CategoryRelationships = relations(
  CategoryTable,
  ({ one, many }) => ({
    household: one(HouseholdTable, {
      fields: [CategoryTable.householdId],
      references: [HouseholdTable.id],
    }),
    transactions: many(TransactionTable),
  })
);
