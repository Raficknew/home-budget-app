import { db } from "@/drizzle";
import { HouseholdTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { validate as validateUuid } from "uuid";

export const getHousehold = (id: string) => {
  if (!validateUuid(id)) {
    return null;
  }

  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      invite: { columns: { link: true } },
      currency: true,
      categories: {
        with: {
          transactions: { columns: { id: true, name: true, price: true } },
        },
      },
    },
  });
};
