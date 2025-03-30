import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate } from "uuid";

export default async function HouseHoldPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const { houseHoldId } = await params;
  const houseHold = await getHouseHold(houseHoldId);

  if (houseHold == null) {
    notFound();
  }

  return (
    <div className=" mx-6">
      <p>{houseHold.invite?.link}</p>
    </div>
  );
}

function getHouseHold(id: string) {
  if (!validate(id)) {
    return null;
  }

  return db.query.HouseHoldTable.findFirst({
    where: eq(HouseHoldTable.id, id),
    with: { invite: { columns: { link: true } } },
  });
}
