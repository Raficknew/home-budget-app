import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function HouseholdJoinPage({
  params,
}: {
  params: Promise<{ householdId: string; link: string }>;
}) {
  const { householdId, link } = await params;
  const houseHoldLink = await getHouseHoldInviteLink(householdId);

  if (houseHoldLink == null || houseHoldLink.invite?.link !== link) notFound();

  return (
    <div className="flex h-screen justify-center items-center">
      <Button>Dołaczam</Button>
    </div>
  );
}

const getHouseHoldInviteLink = (id: string) => {
  return db.query.HouseHoldTable.findFirst({
    where: eq(HouseHoldTable.id, id),
    with: { invite: { columns: { link: true } } },
  });
};
