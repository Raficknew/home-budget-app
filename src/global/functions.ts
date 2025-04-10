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
    with: { user: { columns: { id: true, name: true } } },
  });
};

export const getCategoriesIdsAndNames = (id: string) => {
  return db.query.CategoryTable.findMany({
    where: eq(CategoryTable.householdId, id),
    columns: { id: true, name: true },
  });
};

export const createUuid = (): string => {
  return uuidGenerate();
};
