import { DialogTrigger } from "@/components/ui/dialog";
import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { Member } from "@/features/members/components/Member";
import { MemberAddDialog } from "@/features/members/components/MemberAddDialog";
import { MemberForm } from "@/features/members/components/MemberForm";
import { getHousehold } from "@/global/actions";
import { getCurrencies, getMembers } from "@/global/functions";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { notFound } from "next/navigation";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  const currencies = await getCurrencies();
  const members = await getMembers(householdId);

  if (household == null || (await assertHouseholdWriteAccess(householdId)))
    notFound();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionHeader title="Informacje" />
        <HouseholdForm
          currencies={currencies}
          household={{
            id: household.id,
            currencyCode: household.currencyCode,
            description: household.description ?? "",
            name: household.name,
            balance: 0,
          }}
          inputBgColor="sm:bg-[#161616]"
        />
      </div>
      <SectionSpacer />
      <div className="flex flex-col sm:gap-5 gap-2">
        <SectionHeader
          title="Członkowie"
          description="Dodawaj, usuwaj i edytuj członków gospodarstwa"
        />
        <div className="sm:hidden">
          <MemberForm householdId={householdId} />
        </div>
        <div className="grid sm:grid-cols-4 gap-2">
          {members.map((member) => (
            <Member key={member.id} member={member} householdId={householdId} />
          ))}
          {members.length !== 8 && (
            <MemberAddDialog householdId={householdId}>
              <DialogTrigger className="sm:flex flex-col items-center justify-center h-[184px] hidden rounded-lg ring ring-accent cursor-pointer">
                <HugeiconsIcon
                  className="size-12 text-accent"
                  icon={PlusSignCircleIcon}
                />
              </DialogTrigger>
            </MemberAddDialog>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionSpacer() {
  return <div className="bg-[#616062] sm:w-full sm:h-px h-0 w-0"></div>;
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="sm:text-xl text-xs text-[#A2A1A3] sm:text-white font-medium">
        {title}
      </h2>
      <h4 className="hidden md:block text-xs text-[#828183]">{description}</h4>
    </div>
  );
}
