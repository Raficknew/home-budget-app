import { ActionButton } from "@/components/atoms/ActionButton";
import { MobileTopHeader } from "@/components/atoms/MobileTopHeader";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Spacer } from "@/components/atoms/Spacer";
import { DialogTrigger } from "@/components/ui/dialog";

import { Member } from "@/features/members/components/Member";
import { MemberAddDialog } from "@/features/members/components/MemberAddDialog";
import { MemberForm } from "@/features/members/components/MemberForm";
import { getHousehold } from "@/global/actions";
import { getCurrencies, getMembers } from "@/global/functions";
import { Delete02Icon, PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { assertHouseholdWriteAccess } from "@/features/houseHold/permissions/household";
import { deleteHousehold } from "@/features/houseHold/actions/household";
import { HouseholdForm } from "@/features/houseHold/components/HouseholdGeneralForm";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const { houseHoldId } = await params;
  const household = await getHousehold(houseHoldId);
  const currencies = await getCurrencies();
  const members = await getMembers(houseHoldId);
  const t = await getTranslations("Settings.household");

  if (household == null || (await assertHouseholdWriteAccess(houseHoldId)))
    notFound();

  return (
    <>
      <MobileTopHeader title={t("mobileTitle")}>
        <ActionButton
          variant="ghostDestructive"
          action={deleteHousehold.bind(null, houseHoldId)}
          requireAreYouSure
        >
          <HugeiconsIcon
            strokeWidth={2}
            width={10}
            height={10}
            icon={Delete02Icon}
          />
        </ActionButton>
      </MobileTopHeader>
      <div className="flex flex-col md:gap-4 gap-2">
        <div>
          <div className="sm:hidden mb-2">
            <SectionHeader title={t("informations")} />
          </div>
          <div className="bg-sidebar sm:p-0 p-5 rounded-xl">
            <HouseholdForm
              currencies={currencies}
              household={{
                id: household.id,
                currencyCode: household.currencyCode,
                description: household.description ?? "",
                name: household.name,
                balance: 0,
              }}
            />
          </div>
        </div>
        <Spacer />
        <div className="flex flex-col md:gap-5 gap-2">
          <SectionHeader
            title={t("members.title")}
            description={t("members.description")}
          />
          <div className="md:hidden">
            <MemberForm householdId={houseHoldId} />
          </div>
          <div className="grid md:grid-cols-4 xl:grid-cols-8 gap-2">
            {members.map((member) => (
              <Member
                key={member.id}
                member={member}
                householdId={houseHoldId}
              />
            ))}
            {members.length !== 8 && (
              <MemberAddDialog householdId={houseHoldId}>
                <DialogTrigger className="md:flex flex-col items-center justify-center h-[184px] hidden rounded-lg ring ring-accent cursor-pointer">
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
    </>
  );
}
