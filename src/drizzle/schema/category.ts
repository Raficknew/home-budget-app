import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, statusEnum, updatedAt } from "../schemaHelpers";
import { HouseHoldTable } from "./houseHold";
import { relations } from "drizzle-orm";
import { TransactionTable } from "./transactions";

export const categoriesOfExpanse = ["fixed", "fun", "future_you"] as const;
export type CategoriesOfExpanse = (typeof categoriesOfExpanse)[number];
export const categoryOfExpanseEnum = pgEnum(
  "category_of_expanse",
  categoriesOfExpanse
);

export const CategoryTable = pgTable("categories", {
  id,
  name: text().notNull(),
  categoryType: categoryOfExpanseEnum().notNull(),
  status: statusEnum().notNull().default("public"),
  houseHoldId: text()
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
    tranzactions: many(TransactionTable),
  })
);
