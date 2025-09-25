import { db } from "@/drizzle";
import { HouseholdTable } from "@/drizzle/schema";
import { HouseholdJoinButton } from "@/features/houseHold/components/HouseholdJoinButton";

import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate as validateUuid } from "uuid";

export default async function HouseholdJoinPage({
  params,
}: {
  params: Promise<{ houseHoldId: string; link: string }>;
}) {
  const { houseHoldId, link } = await params;
  const householdLink = await getHouseholdInviteLink(houseHoldId);
  const session = await auth();


  if (
    householdLink == null ||
    householdLink.invite?.link !== link ||
    !session?.user.id ||
    householdLink.members.find((u) => u.userId === session.user.id)
  ) {
    notFound();
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <HouseholdJoinButton householdId={houseHoldId} userId={session.user.id} />
    </div>
  );
}

const getHouseholdInviteLink = (id: string) => {
  if (!validateUuid(id)) {
    return null;
  }
  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      invite: { columns: { link: true } },
      members: { columns: { userId: true } },
    },
  });
};
