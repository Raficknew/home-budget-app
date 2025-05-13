import { LanguageSelect } from "@/components/LanguageSelect";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SettingsNavigationBar } from "@/components/SettingsNavigationBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/features/users/components/UserForm";
import { auth } from "@/lib/auth";
import { GlobalIcon, User02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Session } from "next-auth";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function HouseholdAccountSettings({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const locale = await getLocale();
  const session = await auth();
  const { householdId } = await params;

  return (
    <>
      <MobileTopHeader title="USTAWIENIA">
        <div className="w-10"></div>
      </MobileTopHeader>
      <div className="flex flex-col gap-5">
        <SectionHeader title="Konto" description="Ustaw szczegóły konta " />
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
          <SectionHeader title="Zawartość" />
          <div className="bg-[#212122] p-2.5 rounded-lg">
            <SettingsNavigationBar householdId={householdId} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SectionHeader title="Preferencje" />
          <div className="flex justify-between items-center w-full md:bg-transparent bg-[#212122] px-2 py-1 rounded-lg">
            <div className="flex items-center gap-2 h-full">
              <HugeiconsIcon size={20} icon={GlobalIcon} />
              <p>Język</p>
            </div>
            <LanguageSelect currentLocale={locale} />
          </div>
        </div>
        <Button variant="ghostDestructive" className="ring mt-18">
          Logout
        </Button>
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
