import { env } from "@/data/env/server";
import { MemberAdd } from "@/features/members/components/MemberAdd";
import { getHousehold } from "@/global/actions";
import { getMembers } from "@/global/functions";
import { notFound } from "next/navigation";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);
  const members = await getMembers(householdId);

  if (household == null) notFound();

  const link = `${env.FRONTEND_URL}/${householdId}/${household?.invite?.link}`;

  return (
    <div className="p-2">
      {link}
      <div className="w-full">
        Członkowie:
        <MemberAdd householdId={householdId} />
        {members.map((member) => (
          <div className="flex w-full justify-between" key={member.id}>
            {member.user?.name ?? member.name}
            <div>Edit</div>
            <div>Delete</div>
          </div>
        ))}
      </div>
    </div>
  );
}
