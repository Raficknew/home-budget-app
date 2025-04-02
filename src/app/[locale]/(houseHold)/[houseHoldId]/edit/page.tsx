import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { validate } from "uuid";

export default async function EditHouseHoldPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const { houseHoldId } = await params;
  const household = await getHouseHold(houseHoldId);
  const link = `localhost:3000/en/${houseHoldId}/${household?.invite?.link}`;
  return <div>{link}</div>;
}

const getHouseHold = (id: string) => {
  if (!validate(id)) {
    return null;
  }

  return db.query.HouseHoldTable.findFirst({
    where: eq(HouseHoldTable.id, id),
    with: {
      invite: { columns: { link: true } },
      currency: { columns: { code: true } },
      categories: {
        with: {
          transactions: { columns: { id: true, name: true, price: true } },
        },
      },
    },
  });
};
