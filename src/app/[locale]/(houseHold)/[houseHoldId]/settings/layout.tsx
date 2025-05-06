import { ActionButton } from "@/components/ActionButton";
import { SettingsNavigationBar } from "@/components/SettingsNavigationBar";
import { Sidebar } from "@/components/Sidebar";
import { env } from "@/data/env/server";
import { deleteHousehold } from "@/features/household/actions/household";
import { HouseholdLinkGenerate } from "@/features/household/components/HouseholdLinkGenerate";
import { getHousehold } from "@/global/actions";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function HouseholdSettingsLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ householdId: string }>;
}>) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  if (!household) notFound();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-screen gap-3 sm:pl-22 sm:pr-4 py-3 w-full">
        <TopBar householdId={householdId} link={household.invite?.link ?? ""} />
        <div className="sm:bg-sidebar w-full h-full rounded-xl p-5 flex flex-col items-center">
          <div className="w-full sm:w-3/4 pb-[80px] sm:pb-0">{children}</div>
        </div>
      </div>
    </>
  );
}

function TopBar({ householdId, link }: { householdId: string; link: string }) {
  return (
    <div className="bg-sidebar rounded-xl p-3 flex-col gap-5 hidden sm:flex">
      <div className="flex justify-between">
        <h1 className="text-2xl">Ustawienia</h1>
        <HouseholdLinkGenerate
          url={env.FRONTEND_URL}
          householdId={householdId}
          inviteId={link}
        />
      </div>
      <div className="flex justify-between">
        <SettingsNavigationBar householdId={householdId} />
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
          <p className="text-xs">Usuń Gospodarstwo</p>
        </ActionButton>
      </div>
    </div>
  );
}
