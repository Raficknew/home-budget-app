import { db } from "@/drizzle";
import { CurrencyTable } from "@/drizzle/schema";
import { v4 as uuidGenerate } from "uuid";

export const getCurrencies = () => {
  return db.selectDistinct().from(CurrencyTable);
};

export const createUuid = () => {
  return uuidGenerate();
};
