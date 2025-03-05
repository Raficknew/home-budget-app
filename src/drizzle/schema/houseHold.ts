import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { ExecutorTable } from "./executors";
import { CategoryTable } from "./category";

export const HouseHoldTable = pgTable("house_holds", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});

export const HouseHoldRelationships = relations(HouseHoldTable, ({ many }) => ({
  executors: many(ExecutorTable),
  categories: many(CategoryTable),
}));
