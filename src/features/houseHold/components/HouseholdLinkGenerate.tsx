"use client";
import { generateLinkForHousehold } from "@/features/household/actions/household";
import { ActionButton } from "@/components/atoms/ActionButton";
import {
  AddTeamIcon,
  ArrowReloadHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

export function HouseholdLinkGenerate({
  householdId,
  url,
  inviteId,
}: {
  householdId: string;
  url: string;
  inviteId: string;
}) {
  const link = `${url}/${householdId}/${inviteId}`;
  const t = useTranslations("Settings.linkPopover");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success(t("copied"));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <HugeiconsIcon strokeWidth={2} icon={AddTeamIcon} />
      </PopoverTrigger>
      <PopoverContent>
        <div
          onClick={handleCopyToClipboard}
          className="cursor-pointer text-xs hover:underline  h-full flex flex-col w-full p-2 rounded-lg max-w-[250px] overflow-hidden "
        >
          <span className="text-[10px] font-semibold text-[#828183]">
            {t("copy")}
          </span>
          <p className="font-medium truncate">{link}</p>
        </div>
        <ActionButton
          variant="submit"
          className="size-9"
          action={() => generateLinkForHousehold(householdId, inviteId)}
        >
          <HugeiconsIcon
            strokeWidth={3}
            width={20}
            height={20}
            icon={ArrowReloadHorizontalIcon}
          />
        </ActionButton>
      </PopoverContent>
    </Popover>
  );
}
