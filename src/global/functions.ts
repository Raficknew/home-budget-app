import { db } from "@/drizzle";
import { CurrencyTable } from "@/drizzle/schema";

export const getCurrencies = () => {
  return db.selectDistinct().from(CurrencyTable);
};
