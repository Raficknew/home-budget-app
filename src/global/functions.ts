import { db } from "@/drizzle";
import { CategoryTable, CurrencyTable, MembersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidGenerate } from "uuid";

export const getCurrencies = () => {
  return db.selectDistinct().from(CurrencyTable);
};

export const getMembers = (id: string) => {
  return db.query.MembersTable.findMany({
    where: eq(MembersTable.householdId, id),
    columns: { id: true, name: true },
    with: { user: { columns: { id: true, name: true, image: true } } },
  });
};

export const getCategories = (id: string) => {
  return db.query.CategoryTable.findMany({
    where: eq(CategoryTable.householdId, id),
    columns: { id: true, name: true, categoryType: true, icon: true },
  });
};

export const createUuid = (): string => {
  return uuidGenerate();
};

export const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};
