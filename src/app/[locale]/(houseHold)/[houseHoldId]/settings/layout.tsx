import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { env } from "@/data/env/server";
import { HouseholdLinkGenerate } from "@/features/household/components/HouseholdLinkGenerate";
import { getHousehold } from "@/global/actions";
import { Home01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
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
      <div className="sm:pl-22 pr-4 pt-3 w-full">
        <div className="bg-sidebar rounded-xl p-3 flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-2xl">Ustawienia</h1>
            <HouseholdLinkGenerate
              url={env.FRONTEND_URL}
              householdId={householdId}
              inviteId={household.invite?.link ?? ""}
            />
          </div>
          <div className="flex gap-2">
            <TopBarNavigationButton
              link={`/${householdId}/settings/account`}
              title="Konto"
              icon={UserIcon}
            />
            <TopBarNavigationButton
              link={`/${householdId}/settings/household`}
              title="Gospodarstwo"
              icon={Home01Icon}
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

function TopBarNavigationButton({
  link,
  title,
  icon,
}: {
  link: string;
  title: string;
  icon: typeof UserIcon;
}) {
  return (
    <Button variant="submit" className="rounded-full " asChild>
      <Link href={link}>
        <HugeiconsIcon strokeWidth={3} width={20} height={20} icon={icon} />
        <p className="text-sm font-medium">{title}</p>
      </Link>
    </Button>
  );
}
