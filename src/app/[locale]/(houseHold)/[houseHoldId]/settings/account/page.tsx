import { LanguageSelect } from "@/components/LanguageSelect";
import { MobileTopHeader } from "@/components/MobileTopHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import {
  Camera01Icon,
  GlobalIcon,
  User02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function HouseholdAccountSettings() {
  const locale = await getLocale();
  return (
    <>
      <MobileTopHeader title="Ustawienia">
        <div className="w-10"></div>
      </MobileTopHeader>
      <div>
        <SectionHeader title="Konto" description="Ustaw szczegóły konta " />
        <div className="flex justify-between">
          <div>FORM</div>
          <Suspense fallback={<div className="bg-gray-600 size-5"></div>}>
            <div>
              <AvatarPicture />
            </div>
          </Suspense>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#A2A1A3] text-sm">Preferencje</p>
          <div className="grid grid-cols-2">
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

async function AvatarPicture() {
  const session = await auth();

  return (
    <div className="fixed cursor-pointer">
      <div className="absolute right-[-5px] bottom-[-5px] bg-[#161616] z-10 rounded-full p-2 ring ring-[#403F40]">
        <HugeiconsIcon color="white" size={20} icon={Camera01Icon} />
      </div>

      <Avatar className="size-20">
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
