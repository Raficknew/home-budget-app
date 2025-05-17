"use client";
import { AddTeamIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HouseholdLinkGenerate } from "@/features/household/components/HouseholdLinkGenerate";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function LinkSheet({
  householdId,
  link,
  url,
}: {
  householdId: string;
  link: string;
  url: string;
}) {
  const t = useTranslations("Settings.linkSheet");
  const handleCopy = () => {
    navigator.clipboard.writeText(`${url}/${householdId}/${link}`);
  };

  return (
    <Sheet>
      <SheetTrigger className="w-10">
        <HugeiconsIcon strokeWidth={2} icon={AddTeamIcon} />
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <HouseholdLinkGenerate
            url={url}
            householdId={householdId}
            inviteId={link}
          />
          <Button onClick={handleCopy} variant="submit">
            {t("copy")}
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
