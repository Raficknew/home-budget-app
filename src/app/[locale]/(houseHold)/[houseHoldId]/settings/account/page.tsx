import { LanguageSelect } from "@/components/LanguageSelect";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserForm } from "@/features/users/components/UserForm";
import { auth } from "@/lib/auth";
import { GlobalIcon, User02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Session } from "next-auth";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function HouseholdAccountSettings() {
  const locale = await getLocale();
  const session = await auth();
  return (
    <>
      <MobileTopHeader title="USTAWIENIA">
        <div className="w-10"></div>
      </MobileTopHeader>
      <div className="flex flex-col gap-5">
        <SectionHeader title="Konto" description="Ustaw szczegóły konta " />
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-5">
          <UserForm user={session?.user} />
          <Suspense fallback={<div className="bg-gray-600 size-5"></div>}>
            <div>
              <AvatarPicture session={session} />
            </div>
          </Suspense>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#A2A1A3] text-sm">Preferencje</p>
          <div className="flex  justify-between items-center w-full">
            <div className="flex items-center gap-2 h-full">
              <HugeiconsIcon size={20} icon={GlobalIcon} />
              <p>Język</p>
            </div>
            <LanguageSelect currentLocale={locale} />
          </div>
        </div>
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
