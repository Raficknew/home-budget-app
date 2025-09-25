import { ActionButton } from "@/components/atoms/ActionButton";
import { SettingsNavigationBar } from "@/components/organisms/SettingsNavigationBar";
import { Sidebar } from "@/components/organisms/Sidebar";
import { env } from "@/data/env/server";
import { deleteHousehold } from "@/features/houseHold/actions/household";
import { HouseholdLinkGenerate } from "@/features/houseHold/components/HouseholdLinkGenerate";
import { canAccessHouseholdSettings } from "@/features/houseHold/permissions/household";
import { getHousehold } from "@/global/actions";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function HouseholdSettingsLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ houseHoldId: string }>;
}>) {
  const { houseHoldId } = await params;
  const household = await getHousehold(houseHoldId);

  if (!household) notFound();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-screen gap-3 sm:pl-22 sm:pr-4 py-3 w-full">
        <TopBar householdId={houseHoldId} link={household.invite?.link ?? ""} />
        <div className="sm:bg-sidebar w-full h-full rounded-xl p-5 flex flex-col items-center ">
          <div className="w-full sm:w-3/4 pb-[80px] sm:pb-0">{children}</div>
        </div>
      </div>
    </>
  );
}

async function TopBar({
  householdId,
  link,
}: {
  householdId: string;
  link: string;
}) {
  const t = await getTranslations("Settings");
  return (
    <div className="bg-sidebar rounded-xl p-3 flex-col gap-5 hidden sm:flex">
      <div className="flex justify-between">
        <h1 className="text-2xl">{t("title")}</h1>
        <HouseholdLinkGenerate
          url={env.FRONTEND_URL}
          householdId={householdId}
          inviteId={link}
        />
      </div>
      <div className="flex justify-between">
        <SettingsNavigationBar
          canAccessHouseholdSettings={await canAccessHouseholdSettings(
            householdId
          )}
          householdId={householdId}
        />
        <ActionButton
          variant="ghostDestructive"
          action={deleteHousehold.bind(null, householdId)}
          requireAreYouSure
        >
          <HugeiconsIcon
            strokeWidth={2}
            width={10}
            height={10}
            icon={Delete02Icon}
          />
          <p className="text-xs">{t("household.delete")}</p>
        </ActionButton>
      </div>
    </div>
  );
}
