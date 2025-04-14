import { env } from "@/data/env/server";
import { Member } from "@/features/members/components/Member";
import { MemberAdd } from "@/features/members/components/MemberAdd";
import { getHousehold } from "@/global/actions";
import { getMembers } from "@/global/functions";
import { auth } from "@/lib/auth";

import { notFound } from "next/navigation";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);
  let members = await getMembers(householdId);
  const session = await auth();

  members = members.filter(
    (member) =>
      member.user?.id !== session?.user.id &&
      member.user?.id !== household?.ownerId
  );

  if (household == null) notFound();

  const link = `${env.FRONTEND_URL}/${householdId}/${household?.invite?.link}`;

  return (
    <div className="p-2">
      {link}
      <div className="w-full">
        Członkowie:
        <MemberAdd householdId={householdId} />
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <Member key={member.id} member={member} householdId={householdId} />
          ))}
        </div>
      </div>
    </div>
  );
}
