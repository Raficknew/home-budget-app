import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { HouseHoldTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function JoinToHouseHoldPage({
  params,
}: {
  params: Promise<{ houseHoldId: string; link: string }>;
}) {
  const { houseHoldId, link } = await params;

  return (
    <div className="flex h-screen justify-center items-center">
      <Button>Dołaczam</Button>
    </div>
  );
}

function getHouseHoldInviteLink(id: string) {
  return db.query.HouseHoldTable.findFirst({
    where: eq(HouseHoldTable.id, id),
    with: { invite: { columns: { link: true } } },
  });
}
