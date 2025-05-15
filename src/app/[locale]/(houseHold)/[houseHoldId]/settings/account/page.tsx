import { LanguageSelect } from "@/components/LanguageSelect";
import { LinkSheet } from "@/components/LinkSheet";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SettingsNavigationBar } from "@/components/SettingsNavigationBar";
import { SignOutButtonStretched } from "@/components/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/data/env/server";
import { assertHouseholdReadAccess } from "@/features/household/permissions/household";
import { UserForm } from "@/features/users/components/UserForm";
import { getHousehold } from "@/global/actions";
import { auth } from "@/lib/auth";
import { GlobalIcon, User02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Session } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function HouseholdAccountSettings({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const locale = await getLocale();
  const session = await auth();
  const { householdId } = await params;
  const household = await getHousehold(householdId);
  const t = await getTranslations("Settings.account");

  if (!household) notFound();

  return (
    <>
      <MobileTopHeader title={t("title")}>
        <LinkSheet
          url={env.FRONTEND_URL}
          householdId={householdId}
          link={household.invite?.link ?? ""}
        />
      </MobileTopHeader>
      <div className="flex flex-col gap-10 sm:gap-5">
        <div className="hidden sm:flex">
          <SectionHeader title={t("title")} description={t("description")} />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-5">
          <div className="md:bg-transparent bg-[#212122] p-2.5 rounded-lg w-full">
            <UserForm user={session?.user} />
          </div>
          <Suspense fallback={<div className="bg-gray-600 size-5"></div>}>
            <div>
              <AvatarPicture session={session} />
            </div>
          </Suspense>
        </div>
        <div className="flex flex-col gap-2 sm:hidden">
          <SectionHeader title={t("contain")} />
          <div className="bg-[#212122] p-2.5 rounded-lg">
            <SettingsNavigationBar
              canAccessHouseholdSettings={await assertHouseholdReadAccess(
                householdId
              )}
              householdId={householdId}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SectionHeader title={t("preferences")} />
          <div className="flex justify-between items-center w-full md:bg-transparent bg-[#212122] px-2 py-1 rounded-lg">
            <div className="flex items-center gap-2 h-full">
              <HugeiconsIcon size={20} icon={GlobalIcon} />
              <p>{t("language")}</p>
            </div>
            <LanguageSelect currentLocale={locale} />
          </div>
        </div>
        <SignOutButtonStretched />
      </div>
    </>
  );
}

async function AvatarPicture({ session }: { session: Session | null }) {
  return (
    <div className="cursor-pointer flex justify-center">
      <Avatar className="size-20">
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
