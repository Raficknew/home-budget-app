import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { HouseholdTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function HouseholdJoinPage({
  params,
}: {
  params: Promise<{ householdId: string; link: string }>;
}) {
  const { householdId, link } = await params;
  const householdLink = await getHouseholdInviteLink(householdId);

  if (householdLink == null || householdLink.invite?.link !== link) notFound();

  return (
    <div className="flex h-screen justify-center items-center">
      <Button>Dołaczam</Button>
    </div>
  );
}

const getHouseholdInviteLink = (id: string) => {
  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: { invite: { columns: { link: true } } },
  });
};
